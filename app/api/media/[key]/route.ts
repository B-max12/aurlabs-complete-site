import {sql} from "@/lib/db";
export const runtime="nodejs";
export async function GET(req:Request,{params}:{params:Promise<{key:string}>}){
  const {key}=await params;if(!/^[a-f0-9-]+\.(png|jpg|webp|gif)$/.test(key))return new Response("Not found",{status:404});
  try{
    const rows=await sql()`SELECT m.mime AS mime, b.data AS data FROM media m JOIN media_blobs b ON b.id=m.id WHERE m.id=${key}`;
    if(!rows.length)return new Response("Not found",{status:404});
    const row=rows[0] as unknown as {mime:string;data:Uint8Array};
    return new Response(new Uint8Array(row.data),{headers:{"Content-Type":row.mime||"application/octet-stream","Cache-Control":"public, max-age=31536000, immutable","X-Content-Type-Options":"nosniff","Content-Security-Policy":"default-src 'none'"}});
  }catch{return new Response("Image storage is unavailable.",{status:503});}
}
