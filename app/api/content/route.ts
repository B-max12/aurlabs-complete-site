import {readContent,json} from "@/lib/server";
export const dynamic="force-dynamic";
export async function GET(){try{return json(await readContent());}catch{return json({error:"We couldn’t load the latest content. Please try again."},503);}}
