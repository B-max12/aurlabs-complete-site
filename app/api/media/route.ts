import {env} from "cloudflare:workers";
import {authorized,sameOrigin,json,database,identity,audit,readBytes} from "@/lib/server";
export async function POST(req:Request){
  if(!sameOrigin(req)||!(await authorized(req)))return json({error:"Unlock the admin area to upload images."},403);
  if(!env.BUCKET)return json({error:"Image storage is unavailable."},503);
  if(Number(req.headers.get("content-length")||0)>5.2*1024*1024)return json({error:"Images must be smaller than 5 MB."},413);
  try{
    const bytesIn=await readBytes(req,Math.floor(5.2*1024*1024));
    const form=await new Response(bytesIn,{headers:{"Content-Type":req.headers.get("content-type")||""}}).formData(),file=form.get("file");
    if(!(file instanceof File)||file.size>5*1024*1024||file.size<12)return json({error:"Choose an image under 5 MB."},400);
    const bytes=await file.arrayBuffer(),b=new Uint8Array(bytes);let ext="",mime="";
    if(b[0]===137&&b[1]===80&&b[2]===78&&b[3]===71){ext="png";mime="image/png";}
    else if(b[0]===255&&b[1]===216&&b[2]===255){ext="jpg";mime="image/jpeg";}
    else if(String.fromCharCode(...b.slice(0,4))==="RIFF"&&String.fromCharCode(...b.slice(8,12))==="WEBP"){ext="webp";mime="image/webp";}
    else if(["GIF87a","GIF89a"].includes(String.fromCharCode(...b.slice(0,6)))){ext="gif";mime="image/gif";}
    else return json({error:"Use a PNG, JPEG, WebP, or GIF image."},400);
    const id=crypto.randomUUID()+"."+ext;
    await env.BUCKET.put(id,bytes,{httpMetadata:{contentType:mime}});
    await database().prepare("INSERT INTO media (id,name,mime,size,created_at) VALUES (?,?,?,?,?)").bind(id,file.name.slice(0,200),mime,file.size,Date.now()).run();await audit(identity(req)!,"media.upload",id);
    return json({ok:true,url:"/api/media/"+id,id,name:file.name},201);
  }catch{return json({error:"The upload failed. Please try again."},500);}
}
