'use client';
import {useState} from 'react';
import {ArrowUpRight,Command,Monitor,Smartphone,Terminal} from 'lucide-react';
import type {Product} from '@/lib/content';
import {statusLabel} from '@/lib/content';
import {ProductVisual} from './visuals';
export default function LabWorkbench({products}:{products:Product[]}){
 const [index,setIndex]=useState(0);const list=products.slice(0,3),product=list[Math.min(index,list.length-1)];
 if(!product)return <div className="lab-workbench"><span className="eyebrow">INSIDE AUR LABS</span><h2>Room for the next good idea.</h2><a href="/contact" className="button orange">Share an idea <ArrowUpRight size={16}/></a></div>;
 return <div className="lab-workbench" data-auri-obstacle><div className="workbench-toolbar"><span><Command size={15}/> AUR / WORKSPACE</span><span><i className="green-dot"/> OPEN POSSIBILITIES</span></div><div className="workbench-tabs" role="group" aria-label="Explore featured product concepts">{list.map((p,i)=>{const Icon=p.category==='cli'?Terminal:p.category==='app'?Smartphone:Monitor;return <button key={p.id} aria-pressed={i===index} className={i===index?'selected':''} onClick={()=>setIndex(i)}><Icon size={14}/>{p.name}</button>})}</div><div className="workbench-preview" key={product.id}><ProductVisual product={product} priority/></div><div className="workbench-summary"><div><span className="eyebrow">{statusLabel(product.status)}</span><h2>{product.tagline}</h2></div><a href={'/products/'+product.slug} aria-label={'Explore '+product.name}><ArrowUpRight size={22}/></a></div><div className="workbench-foot"><span>Thoughtful by design.</span><span>Free by purpose. ↗</span></div><span className="workbench-caption">A SMALL LOOK AT WHAT’S NEXT</span></div>;
}

