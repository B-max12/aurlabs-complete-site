import {database,json,parseBody,sameOrigin,clientIp,getAdmin,authorized,rateLimit,passwordHash,constantTime,issueUnlock,audit,readContent,sha} from "@/lib/server";
import {revalidatePath} from "next/cache";
const refreshSite=()=>{try{revalidatePath("/","layout");revalidatePath("/sitemap.xml")}catch{/* the cached copy refreshes itself within a minute anyway */}};
import {productSchema,articleSchema,teamSchema,settingsSchema} from "@/lib/validation";
export const dynamic="force-dynamic";
export async function GET(req:Request){try{
  const admin=await getAdmin();
  const status={signedIn:true,configured:!!admin,canSetup:(process.env.AUR_ADMIN_SETUP_TOKEN?.length||0)>=32,isOwner:!!admin};
  if(new URL(req.url).searchParams.get("view")==="status")return json(status);
  if(!(await authorized(req)))return json({error:"Sign in to continue.",...status},401);
  const content=await readContent(true);
  const inbox=await database().prepare("SELECT * FROM submissions ORDER BY created_at DESC LIMIT 500").all();
  const assets=await database().prepare("SELECT * FROM media ORDER BY created_at DESC LIMIT 200").all();
  const events=await database().prepare("SELECT action,target,created_at FROM audit_log ORDER BY created_at DESC LIMIT 50").all();
  return json({content,inbox:inbox.results,assets:assets.results,events:events.results,username:admin?.username});
}catch{return json({error:"Admin storage is temporarily unavailable."},503);}}

export async function POST(req:Request){
  if(!sameOrigin(req))return json({error:"This action must come from the website."},403);
  try{
    const b=await parseBody(req);
    if(b.action==="setup"||b.action==="unlock"){
      if(!(await rateLimit("admin:"+clientIp(req),10,900000))||!(await rateLimit("admin:all",60,900000)))return json({error:"Too many attempts. Please wait 15 minutes."},429);
      const admin=await getAdmin();
      if(b.action==="setup"){
        const key=process.env.AUR_ADMIN_SETUP_TOKEN;
        if(admin)return json({error:"An administrator is already configured."},409);
        if(!key||key.length<32||typeof b.setupToken!=="string"||!constantTime(key,b.setupToken))return json({error:"The setup token is missing or incorrect. Configure AUR_ADMIN_SETUP_TOKEN in the hosting environment first."},403);
        if(typeof b.username!=="string"||!/^[a-zA-Z0-9_.-]{3,40}$/.test(b.username))return json({error:"Use 3–40 letters, numbers, dots, hyphens, or underscores for your username."},400);
        if(typeof b.password!=="string"||b.password.length<12||b.password.length>128)return json({error:"Choose a password of 12–128 characters."},400);
        const salt=crypto.randomUUID();
        await database().prepare("INSERT INTO administrators (id,user_id,username,password_hash,salt,created_at) VALUES ('owner',?,?,?,?,?)").bind("owner",b.username,await passwordHash(b.password,salt),salt,Date.now()).run();
        await audit("owner","admin.setup","owner");return json({ok:true,...await issueUnlock("owner")});
      }
      if(!admin||typeof b.username!=="string"||typeof b.password!=="string"||b.password.length>128||b.username!==admin.username||!constantTime(await passwordHash(b.password,admin.salt),admin.password_hash))return json({error:"The username or password doesn’t match."},403);
      await audit(admin.user_id,"admin.unlock","owner");return json({ok:true,...await issueUnlock(admin.user_id)});
    }
    if(!(await authorized(req)))return json({error:"Your admin session has ended. Sign in again to continue.",signedIn:true},401);
    const user=(await getAdmin())!.user_id;
    if(b.action==="lock"){
      await database().prepare("DELETE FROM admin_unlocks WHERE token_hash = ?").bind(await sha(req.headers.get("x-aur-unlock")||"")).run();return json({ok:true});
    }
    if(b.action==="password"){
      const admin=await getAdmin();if(typeof b.currentPassword!=="string"||!admin||!constantTime(await passwordHash(b.currentPassword,admin.salt),admin.password_hash))return json({error:"Your current password is incorrect."},403);
      if(typeof b.password!=="string"||b.password.length<12||b.password.length>128)return json({error:"Choose a password of 12–128 characters."},400);
      const salt=crypto.randomUUID();await database().batch([database().prepare("UPDATE administrators SET password_hash=?, salt=? WHERE id='owner'").bind(await passwordHash(b.password,salt),salt),database().prepare("DELETE FROM admin_unlocks")]);await audit(user,"admin.password","owner");return json({ok:true,...await issueUnlock(user)});
    }
    if(b.action==="save"){
      const schemas={products:productSchema,journal:articleSchema,research:articleSchema,team:teamSchema,settings:settingsSchema};
      const schema=schemas[b.kind as keyof typeof schemas];if(!schema)return json({error:"Unknown content type."},400);
      const r=schema.safeParse(b.data);if(!r.success)return json({error:r.error.issues.map(i=>i.path.join(".")+": "+i.message).join(" · ")},400);
      const d=r.data as any,id=b.kind==="settings"?"site-settings":d.id;
      const current=await database().prepare("SELECT kind FROM content WHERE id=?").bind(id).first<{kind:string}>();
      if(current&&current.kind!==b.kind)return json({error:"This ID belongs to another content type."},409);
      if(d.slug){const all=await readContent(true);const duplicate=(all[b.kind as "products"|"journal"|"research"] as any[]).some(x=>x.slug===d.slug&&x.id!==id);if(duplicate)return json({error:"That URL slug is already in use."},409);}
      await database().prepare("INSERT INTO content (id,kind,data,published,deleted,updated_at) VALUES (?,?,?,?,0,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,published=excluded.published,deleted=0,updated_at=excluded.updated_at").bind(id,b.kind,JSON.stringify(d),b.kind==="settings"?1:Number(d.published),Date.now()).run();await audit(user,"content.save",b.kind+":"+id);refreshSite();return json({ok:true});
    }
    if(b.action==="delete"){
      if(!["products","journal","research","team"].includes(b.kind)||typeof b.id!=="string"||!/^[a-z0-9-]{1,100}$/.test(b.id))return json({error:"Invalid content selection."},400);
      await database().prepare("INSERT INTO content (id,kind,data,published,deleted,updated_at) VALUES (?,?,'{}',0,1,?) ON CONFLICT(id) DO UPDATE SET deleted=1,published=0,updated_at=excluded.updated_at").bind(b.id,b.kind,Date.now()).run();await audit(user,"content.delete",b.kind+":"+b.id);refreshSite();return json({ok:true});
    }
    if(b.action==="submission"){
      if(typeof b.id!=="string"||!["new","reviewing","replied","archived","delete"].includes(b.status))return json({error:"Invalid inbox action."},400);
      if(b.status==="delete")await database().prepare("DELETE FROM submissions WHERE id=?").bind(b.id).run();else await database().prepare("UPDATE submissions SET status=? WHERE id=?").bind(b.status,b.id).run();await audit(user,"inbox."+b.status,b.id);return json({ok:true});
    }
    return json({error:"Unknown action."},400);
  }catch(error){console.error("Admin operation failed",error instanceof Error?error.message:"unknown");return json({error:"The change wasn’t saved. Check the fields and try again."},500);}
}

