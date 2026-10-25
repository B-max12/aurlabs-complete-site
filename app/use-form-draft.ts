'use client';
import {useEffect,useRef,useState} from 'react';
import {getVisitor,subscribe} from './visitor-session';
export type FormValues=Record<string,string|boolean>;
const TTL=24*60*60*1000;
export function useFormDraft(kind:'join'|'contact',defaults:FormValues){
 const key='aur-draft-v2-'+kind;
 const [values,setValues]=useState<FormValues>(defaults),[step,setStep]=useState(0),[ready,setReady]=useState(false),[keep,setKeep]=useState(true),[restored,setRestored]=useState(false),[available,setAvailable]=useState(true),[finished,setFinished]=useState(false);
 const id=useRef('');
 // Fill in name and email from a signed-in visitor, without overwriting anything they typed.
 useEffect(()=>{if(!ready)return;const fill=()=>{const v=getVisitor();if(v)setValues(c=>({...c,name:typeof c.name==='string'&&c.name?c.name:v.name,email:typeof c.email==='string'&&c.email?c.email:v.email}))};fill();return subscribe(fill)},[ready]);
 useEffect(()=>{try{const raw=sessionStorage.getItem(key);if(raw){const d=JSON.parse(raw);if(d.version===2&&Date.now()-d.savedAt<TTL&&d.values&&typeof d.values==='object'){
  const safe=Object.fromEntries(Object.entries(d.values).filter(([k,v])=>!['__proto__','constructor','prototype','consent','volunteer','website'].includes(k)&&(typeof v==='string'||typeof v==='boolean')));
  setValues({...defaults,...safe,consent:false,volunteer:false,website:''});setStep(kind==='join'&&Number.isInteger(d.step)?Math.max(0,Math.min(2,d.step)):0);if(typeof d.id==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(d.id))id.current=d.id;setRestored(true);
 }else sessionStorage.removeItem(key)}}catch{setAvailable(false)}setReady(true)},[key]);
 useEffect(()=>{if(!ready||finished)return;try{if(!keep){sessionStorage.removeItem(key);return;}const {consent,volunteer,website,...safe}=values;sessionStorage.setItem(key,JSON.stringify({version:2,savedAt:Date.now(),values:safe,step,id:id.current}))}catch{setAvailable(false)}},[key,values,step,ready,keep,finished]);
 const clear=(complete=false)=>{try{sessionStorage.removeItem(key)}catch{}setRestored(false);if(complete){setFinished(true);return;}setValues(defaults);setStep(0);id.current=''};
 const ensureId=()=>{if(!id.current)id.current=crypto.randomUUID();if(keep)try{const raw=sessionStorage.getItem(key);if(raw){const d=JSON.parse(raw);sessionStorage.setItem(key,JSON.stringify({...d,id:id.current}))}}catch{}return id.current};
 return {values,setValues,step,setStep,id,ensureId,keep,setKeep,restored,available,clear};
}

export async function submitForm(data:unknown){
 const response=await fetch('/api/submissions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(20000)});
 const result=await response.json() as {reference?:string;error?:string};
 if(!response.ok||!result.reference)throw new Error(result.error||'The server could not confirm your submission. Please retry.');
 return result.reference;
}
