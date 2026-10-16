'use client';
import {useEffect,useRef,useState} from 'react';
import type {AuriMood} from '@/lib/auri-guides';
export default function AuriCharacter({mood='idle',small=false,motion=true}:{mood?:AuriMood;small?:boolean;motion?:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null),state=useRef({mood,motion}),[ready,setReady]=useState(false);state.current={mood,motion};
 useEffect(()=>{if(small||!canvas.current||!('WebGL2RenderingContext' in window)||(navigator as Navigator&{connection?:{saveData:boolean}}).connection?.saveData)return;let cancel=false,dispose:(()=>void)|undefined;const element=canvas.current;
  const timer=setTimeout(()=>{import('./AuriScene').then(({mountAuri})=>{if(cancel)return;try{dispose=mountAuri(element,{motion:()=>state.current.motion,mood:()=>state.current.mood});setReady(true)}catch{setReady(false)}}).catch(()=>setReady(false))},750);
  return()=>{cancel=true;clearTimeout(timer);dispose?.()};
 },[small]);
 return <span className={`auri-character mood-${mood} ${small?'small':''} ${ready?'webgl-ready':''}`} aria-hidden="true"><span className="auri-shadow"/><span className="auri-antenna"><i/></span><span className="auri-ear left"/><span className="auri-ear right"/><span className="auri-head"><span className="auri-visor"><i/><i/><b/></span><span className="auri-cheek"/></span><span className="auri-body"><i>a</i></span><span className="auri-hand left"/><span className="auri-hand right"/>{!small&&<canvas ref={canvas} className="auri-canvas" width={88} height={105}/>}</span>;
}
