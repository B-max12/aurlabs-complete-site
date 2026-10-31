import { db } from "./db";
import { defaultContent, type SiteContent, type ContentKind } from "./content";

export function database(){return db;}
export async function readContent(includeDrafts=false):Promise<SiteContent>{
  const rows=await database().prepare("SELECT id, kind, data, published, deleted FROM content").all<{id:string;kind:ContentKind;data:string;published:number;deleted:number}>();
  const data=structuredClone(defaultContent);
  for(const row of rows.results){
    if(row.kind==="settings"){if(!row.deleted)data.settings={...data.settings,...JSON.parse(row.data)};continue;}
    const list=data[row.kind];if(!Array.isArray(list))continue;
    const i=list.findIndex(x=>x.id===row.id);if(i>=0)list.splice(i,1);
    if(!row.deleted&&(includeDrafts||row.published))list.push({...JSON.parse(row.data),published:!!row.published});
  }
  for(const k of ["products","journal","research","team"] as const){
    if(!includeDrafts)(data[k] as unknown[])=data[k].filter(x=>x.published);
  }
  data.journal.sort((a,b)=>b.date.localeCompare(a.date));data.research.sort((a,b)=>b.date.localeCompare(a.date));
  return data;
}
export function json(data:unknown,status=200,headers:Record<string,string>={}){return Response.json(data,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff",...headers}});}
export function sameOrigin(req:Request){const origin=req.headers.get("origin");return !!origin&&origin===new URL(req.url).origin;}
export async function readBytes(req:Request,max:number){
  if(Number(req.headers.get("content-length")||0)>max)throw new Error("This request is too large.");
  const reader=req.body?.getReader();if(!reader)return new Uint8Array();
  const chunks:Uint8Array[]=[];let length=0;
  while(true){const {done,value}=await reader.read();if(done)break;length+=value.byteLength;if(length>max){await reader.cancel();throw new Error("This request is too large.");}chunks.push(value);}
  const bytes=new Uint8Array(length);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.byteLength;}return bytes;
}
export async function parseBody(req:Request,max=160000){
  if(!req.headers.get("content-type")?.includes("application/json"))throw new Error("Send JSON content.");
  return JSON.parse(new TextDecoder().decode(await readBytes(req,max)));
}
export async function sha(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value)))).map(x=>x.toString(16).padStart(2,"0")).join("");}
export function constantTime(a:string,b:string){let d=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)d|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return d===0;}
export async function passwordHash(password:string,salt:string){
  const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveBits"]);
  const bits=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:new TextEncoder().encode(salt),iterations:100000},key,256);
  return Array.from(new Uint8Array(bits)).map(x=>x.toString(16).padStart(2,"0")).join("");
}
export type Admin={id:string;user_id:string;username:string;password_hash:string;salt:string};
export const getAdmin=()=>database().prepare("SELECT * FROM administrators WHERE id = 'owner'").first<Admin>();
export function clientIp(req:Request){return (req.headers.get("x-forwarded-for")||"").split(",")[0].trim()||req.headers.get("x-real-ip")||"unknown"}
// Access to the admin area requires a valid unlock token, which is only issued after the admin username and password are verified.
export async function authorized(req:Request){
  const admin=await getAdmin();if(!admin)return false;
  const token=req.headers.get("x-aur-unlock");if(!token||token.length>200)return false;
  const row=await database().prepare("SELECT user_id, expires_at FROM admin_unlocks WHERE token_hash = ?").bind(await sha(token)).first<{user_id:string;expires_at:number}>();
  return !!row&&row.user_id===admin.user_id&&row.expires_at>Date.now();
}
export async function rateLimit(key:string,limit:number,windowMs:number){
  const now=Date.now(),bucket=Math.floor(now/windowMs),id=await sha(key+":"+bucket);
  const row=await database().prepare("INSERT INTO rate_limits (id, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(id) DO UPDATE SET count = rate_limits.count + 1 RETURNING count").bind(id,now+windowMs).first<{count:number}>();
  await database().prepare("DELETE FROM rate_limits WHERE expires_at < ?").bind(now-windowMs).run();
  return !!row&&row.count<=limit;
}
export async function audit(actor:string,action:string,target:string){await database().prepare("INSERT INTO audit_log (id,actor,action,target,created_at) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(),actor,action,target,Date.now()).run();}
export async function issueUnlock(user:string){
  const token=crypto.randomUUID()+crypto.randomUUID(),expires=Date.now()+30*60*1000;
  await database().batch([database().prepare("DELETE FROM admin_unlocks WHERE expires_at < ?").bind(Date.now()),database().prepare("INSERT INTO admin_unlocks (token_hash,user_id,expires_at) VALUES (?,?,?)").bind(await sha(token),user,expires)]);
  return {unlockToken:token,expiresAt:expires};
}

