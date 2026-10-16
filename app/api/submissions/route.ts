import {database,json,parseBody,rateLimit,sameOrigin,readContent} from "@/lib/server";
import {submissionSchema} from "@/lib/validation";
export async function POST(req:Request){
  if(!sameOrigin(req))return json({error:"Please submit this form from our website."},403);
  try{
    const input=await parseBody(req,20000);const result=submissionSchema.safeParse(input);
    if(!result.success)return json({error:result.error.issues[0].message,fields:result.error.flatten().fieldErrors},400);
    const data=result.data;
    if(data.kind==="join"&&!(await readContent()).settings.hiring)return json({error:"Volunteer applications are currently closed. Please contact the team instead."},403);
    const prior=await database().prepare("SELECT id FROM submissions WHERE id = ?").bind(data.idempotencyKey).first();
    if(prior)return json({ok:true,reference:data.idempotencyKey.slice(0,8)});
    const ip=req.headers.get("cf-connecting-ip")||req.headers.get("oai-authenticated-user-id")||"anonymous";
    if(!(await rateLimit("submit:"+ip,8,3600000))||!(await rateLimit("email:"+data.email.toLowerCase(),5,3600000)))return json({error:"You’ve sent several messages recently. Please try again in an hour or email us."},429);
    const {website:_,idempotencyKey,...details}=data;
    await database().prepare("INSERT OR IGNORE INTO submissions (id,kind,name,email,data,status,created_at) VALUES (?,?,?,?,?,'new',?)").bind(idempotencyKey,data.kind,data.name,data.email.toLowerCase(),JSON.stringify(details),Date.now()).run();
    return json({ok:true,reference:idempotencyKey.slice(0,8)},201);
  }catch(error){console.error("Submission failed",error instanceof Error?error.message:"unknown");return json({error:"Your message wasn’t saved. Please try again or email the team directly."},503);}
}
