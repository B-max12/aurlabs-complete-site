import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {readContent} from "@/lib/server";
import {defaultContent} from "@/lib/content";
import Site from "./site";
import {SITE,productTitle,productDescription,productJsonLd,organizationJsonLd,jsonLdScript,clip} from "@/lib/seo";
export function generateStaticParams(){return [[],["products"],["about"],["journal"],["research"],["join"],["support"],["contact"],["privacy"],["terms"],["admin"]].map(slug=>({slug}))}
type Props={params:Promise<{slug?:string[]}>};
const descriptions:Record<string,string>={products:"Free software, apps and command-line tools from Aur Labs, an independent non-profit lab. Browse what we are building and download released tools.",about:"Aur Labs is a small independent, non-profit team building useful free software. Read our story, values and how we work.",journal:"Notes from the lab: how Aur Labs designs and builds free software, and what we are learning along the way.",research:"Questions and explorations behind Aur Labs tools: the research directions that shape what we build next.",join:"Join Aur Labs as a volunteer. Bring your craft, curiosity or a problem worth solving to an independent non-profit software lab.",support:"Support Aur Labs and help keep useful software free. Learn how donations keep the lab moving forward.",contact:"Contact Aur Labs. Share a problem, a bug, a partnership idea or a question with our small team.",privacy:"How Aur Labs handles your information, in plain language.",terms:"The terms for using the Aur Labs website and software.",admin:"Admin studio"};
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug=[]}=await params;
  const titles:Record<string,string>={products:"The collection",about:"Our story",journal:"Inside the lab",research:"Research & explorations",join:"Build with us",support:"Support the mission",contact:"Start a conversation",privacy:"Privacy notice",terms:"Terms of use",admin:"Admin studio"};
  const canonical="/"+slug.join("/");
  let title=(titles[slug[0]]||"Good software. For everyone.")+" — Aur Labs";
  let description=descriptions[slug[0]]||"An independent, non-profit software lab building useful free tools for people everywhere. Explore our work, join the team, or share a problem worth solving.";
  let image:string|undefined;let type:"website"|"article"="website";
  if(slug[1]&&["products","journal","research"].includes(slug[0])){
    try{
      const d=await readContent();
      if(slug[0]==="products"){const p=d.products.find(x=>x.slug===slug[1]);if(p){title=productTitle(p);description=productDescription(p);image=p.screenshots[0]}}
      else{const a=d[slug[0] as "journal"|"research"].find(x=>x.slug===slug[1]);if(a){title=a.title+" — Aur Labs";description=clip(a.summary,155);image=a.cover||undefined;type="article"}}
    }catch{}
  }
  const images=image?[{url:image.startsWith("/")?SITE+image:image}]:undefined;
  return {title,description,robots:slug[0]==="admin"?{index:false,follow:false}:undefined,alternates:{canonical},openGraph:{title,description,url:SITE+(canonical==="/"?"":canonical),siteName:"Aur Labs",type,...(images?{images}:{})},twitter:{card:"summary_large_image",title,description,...(images?{images:images.map(i=>i.url)}:{})}};
}
export default async function Page({params}:Props){const {slug=[]}=await params;const allowed=["products","about","journal","research","join","support","contact","privacy","terms","admin"];if(slug.length>2||slug[0]&&!allowed.includes(slug[0])||slug[1]&&!["products","journal","research"].includes(slug[0]))notFound();let content=defaultContent,storageError=false;try{content=await readContent()}catch{storageError=true;}if(slug[1]&&![...content.products,...content.journal,...content.research].some(p=>p.slug===slug[1]))notFound();if(slug[1]&&!content[slug[0] as "products"|"journal"|"research"].some(p=>p.slug===slug[1]))notFound();const product=slug[0]==="products"&&slug[1]?content.products.find(p=>p.slug===slug[1]):undefined;
  const ld=product?productJsonLd(product):slug.length===0?organizationJsonLd():null;
  return <>{ld&&<script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(ld)}/>}<Site content={content} path={"/"+slug.join("/")} storageError={storageError}/></>;}

