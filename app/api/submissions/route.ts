import {database,json,parseBody,rateLimit,sameOrigin,readContent} from "@/lib/server";
import {submissionSchema} from "@/lib/validation";
import {notifySubmission} from "@/lib/mail";
import {after} from "next/server";
export async function POST(req:Request){
  if(!sameOrigin(req))return json({error:"Please submit this form from our website."},403);
  try{
    const input=await parseBody(req,20000);
    if(typeof (input as {elapsedMs?:unknown})?.elapsedMs==="number"&&(input as {elapsedMs:number}).elapsedMs<1200)return json({error:"Please take a moment to review your message before sending."},400);
    const result=submissionSchema.safeParse(input);
    if(!result.success)return json({error:result.error.issues[0].message,fields:result.error.flatten().fieldErrors},400);
    const data=result.data;
    if(data.kind==="join"&&!(await readContent()).settings.hiring)return json({error:"Volunteer applications are currently closed. Please contact the team instead."},403);
    const prior=await database().prepare("SELECT id FROM submissions WHERE id = ?").bind(data.idempotencyKey).first();
    if(prior)return json({ok:true,reference:data.idempotencyKey.slice(0,8)});
    const ip=(req.headers.get("x-forwarded-for")||"").split(",")[0].trim()||req.headers.get("x-real-ip")||"anonymous";
    if(!(await rateLimit("submit:"+ip,8,3600000))||!(await rateLimit("email:"+data.email.toLowerCase(),5,3600000)))return json({error:"You’ve sent several messages recently. Please try again in an hour or email us."},429);
    const {website:_,idempotencyKey,...details}=data;
    const senderName=data.kind==="notify"?`Release alert (${data.product})`:data.name;
    await database().prepare("INSERT OR IGNORE INTO submissions (id,kind,name,email,data,status,created_at) VALUES (?,?,?,?,?,'new',?)").bind(idempotencyKey,data.kind,senderName,data.email.toLowerCase(),JSON.stringify(details),Date.now()).run();
    after(()=>notifySubmission(data.kind,senderName,data.email.toLowerCase(),details as Record<string,unknown>,idempotencyKey.slice(0,8)));
    return json({ok:true,reference:idempotencyKey.slice(0,8)},201);
  }catch(error){console.error("Submission failed",error instanceof Error?error.message:"unknown");return json({error:"Your message wasn’t saved. Please try again or email the team directly."},503);}
}
