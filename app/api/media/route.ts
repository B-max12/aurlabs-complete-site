import {authSession,authorized,sameOrigin,json,database,audit,readBytes} from "@/lib/server";
import {sql} from "@/lib/db";
export const runtime="nodejs";
const MAX=4*1024*1024; // Vercel functions accept request bodies up to about 4.5 MB
export async function POST(req:Request){
  if(!sameOrigin(req)||!(await authorized(req)))return json({error:"Unlock the admin area to upload media."},403);
  if(Number(req.headers.get("content-length")||0)>MAX+200*1024)return json({error:"Files must be smaller than 4 MB."},413);
  try{
    const bytesIn=await readBytes(req,MAX+200*1024);
    const form=await new Response(bytesIn,{headers:{"Content-Type":req.headers.get("content-type")||""}}).formData(),file=form.get("file");
    if(!(file instanceof File)||file.size>MAX||file.size<12)return json({error:"Choose an image or video under 4 MB."},400);
    const bytes=await file.arrayBuffer(),b=new Uint8Array(bytes);let ext="",mime="";
    if(b[0]===137&&b[1]===80&&b[2]===78&&b[3]===71){ext="png";mime="image/png";}
    else if(b[0]===255&&b[1]===216&&b[2]===255){ext="jpg";mime="image/jpeg";}
    else if(String.fromCharCode(...b.slice(0,4))==="RIFF"&&String.fromCharCode(...b.slice(8,12))==="WEBP"){ext="webp";mime="image/webp";}
    else if(["GIF87a","GIF89a"].includes(String.fromCharCode(...b.slice(0,6)))){ext="gif";mime="image/gif";}
    else if(b.length>=8&&b[4]===0x66&&b[5]===0x74&&b[6]===0x79&&b[7]===0x70){ext="mp4";mime="video/mp4";}
    else if(b.length>=4&&b[0]===0x1a&&b[1]===0x45&&b[2]===0xdf&&b[3]===0xa3){ext="webm";mime="video/webm";}
    else return json({error:"Use a PNG, JPEG, WebP, GIF image or an MP4/WebM video under 4 MB."},400);
    const id=crypto.randomUUID()+"."+ext;
    await database().prepare("INSERT INTO media (id,name,mime,size,created_at) VALUES (?,?,?,?,?)").bind(id,file.name.slice(0,200),mime,file.size,Date.now()).run();
    await sql()`INSERT INTO media_blobs (id,data) VALUES (${id},${Buffer.from(bytes)})`;
    await audit((await authSession(req))?.userId||"owner","media.upload",id);
    return json({ok:true,url:"/api/media/"+id,id,name:file.name},201);
  }catch{return json({error:"The upload failed. Please try again."},500);}
}
