'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {X,ArrowUpRight,HelpCircle,Move,VolumeX,Sparkles,RotateCcw,Check,Hand,Search} from 'lucide-react';
import AuriCharacter from './components/auri/AuriCharacter';
import {guideFor,placeGuide,type AuriMood,type Rect} from '@/lib/auri-guides';

type HelpEvent={message:string;target?:string;mood?:AuriMood};
export function helpAuri(message:string,target?:string,mood:AuriMood='explaining'){
 window.dispatchEvent(new CustomEvent<HelpEvent>('auri-help',{detail:{message,target,mood}}));
}
const storage={get:(key:string)=>{try{return sessionStorage.getItem(key)}catch{return null}},set:(key:string,value:string)=>{try{sessionStorage.setItem(key,value)}catch{}}};
const faq=[
 {q:'Find a tool',a:'Filter the catalogue by platform and category. Concept previews are ideas in progress; released tools have real version and download details.',href:'/products'},
 {q:'Join the team',a:'The application has three steps. Tell us about yourself, your skills, and your approach. Contributions are voluntary and unpaid.',href:'/join'},
 {q:'Support the mission',a:'You can contribute your skills or explore the Support page. When a payment provider is available, you confirm the amount and terms there.',href:'/support'},
 {q:'Talk to the team',a:'Send an idea, problem, or question through Contact. A reference appears only after your message is saved successfully.',href:'/contact'},
];
export default function Auri({guides={},admin=false}:{guides?:Record<string,string>;admin?:boolean}){
 const [open,setOpen]=useState(false),[hidden,setHidden]=useState(false),[enabled,setEnabled]=useState(true),[motion,setMotion]=useState(true),[welcome,setWelcome]=useState(false),[query,setQuery]=useState('');
 const [help,setHelp]=useState<HelpEvent>({message:'I’m Auri. A little guidance, whenever you need it.'}),[target,setTarget]=useState<HTMLElement|null>(null),[anchor,setAnchor]=useState<Rect|null>(null),[slot,setSlot]=useState<HTMLElement|null>(null),[offset,setOffset]=useState({x:0,y:0});
 const dialog=useRef<HTMLDialogElement>(null),launcher=useRef<HTMLButtonElement>(null),drag=useRef<{x:number;y:number;ox:number;oy:number;moved:boolean}|null>(null),skipClick=useRef(false),overTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const clear=useCallback(()=>{setTarget(null);setSlot(null);setAnchor(null)},[]);
 useEffect(()=>{setHidden(storage.get('auri-hidden')==='yes');setEnabled(storage.get('auri-hints')!=='off');setMotion(storage.get('auri-motion')!=='off');if(!admin&&!storage.get('auri-welcomed')){setWelcome(true);storage.set('auri-welcomed','yes')}},[admin]);
 useEffect(()=>{if(!welcome)return;const t=setTimeout(()=>setWelcome(false),6500);return()=>clearTimeout(t)},[welcome]);
 useEffect(()=>{const onHelp=(e:Event)=>{const d=(e as CustomEvent<HelpEvent|string>).detail;const h=typeof d==='string'?{message:d}:d;if(h.target&&h.message===guideFor(h.target))h.message=guideFor(h.target,guides);setHelp(h);setHidden(false);storage.set('auri-hidden','no');setWelcome(false);const el=h.target?document.getElementById(h.target):null;setTarget(el);if(!el){clear();setWelcome(true)}};window.addEventListener('auri-help',onHelp);return()=>window.removeEventListener('auri-help',onHelp)},[clear,guides]);
 useEffect(()=>{
  if(!enabled||hidden){clear();return;}
  const show=(el:HTMLElement)=>{if(el.closest('[data-auri-ui]')||el instanceof HTMLInputElement&&el.type==='password')return;const id=el.dataset.auri;const text=id?guideFor(id,guides):el.dataset.help;if(text&&!el.hasAttribute('title'))el.title=text;if(!text)return;setWelcome(false);setHelp({message:text,mood:el.getAttribute('aria-invalid')==='true'?'error':'explaining'});setTarget(el)};
  const focus=(e:Event)=>{const el=(e.target as HTMLElement).closest<HTMLElement>('[data-auri],[data-help]');if(el)show(el)};
  const over=(e:Event)=>{if(!(e instanceof PointerEvent)||e.pointerType!=='mouse')return;const el=(e.target as HTMLElement).closest<HTMLElement>('[data-help]');if(overTimer.current)clearTimeout(overTimer.current);if(el)overTimer.current=setTimeout(()=>show(el),550)};
  const out=()=>{if(overTimer.current)clearTimeout(overTimer.current)};
  document.addEventListener('focusin',focus);document.addEventListener('pointerover',over);document.addEventListener('pointerout',out);
  return()=>{document.removeEventListener('focusin',focus);document.removeEventListener('pointerover',over);document.removeEventListener('pointerout',out);out()};
 },[enabled,hidden,guides,clear]);
 useEffect(()=>{
  if(!target){setSlot(null);setAnchor(null);return;}
  let frame=0;
  const measure=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   if(!target.isConnected){clear();return;}
   const container=target.closest<HTMLElement>('.field,.consent-field'),s=container?.querySelector<HTMLElement>('[data-auri-slot]')||null;
   const r=(container||target).getBoundingClientRect(),v=window.visualViewport;
   const obstacles=[...document.querySelectorAll<HTMLElement>('input:not([type=hidden]),textarea,select,button,a,summary,[data-auri-obstacle]')].filter(el=>!el.closest('[data-auri-ui]')&&el.getClientRects().length).map(el=>el.getBoundingClientRect());
   const p=placeGuide(r,{width:244,height:220},{width:v?.width||innerWidth,height:v?.height||innerHeight,top:v?.offsetTop||0},obstacles);
   setAnchor(p);setSlot(p?null:s);
  })};
  measure();const observer=new ResizeObserver(measure);observer.observe(target);if(target.parentElement)observer.observe(target.parentElement);
  window.addEventListener('scroll',measure,true);window.addEventListener('resize',measure);window.visualViewport?.addEventListener('resize',measure);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',measure,true);window.removeEventListener('resize',measure);window.visualViewport?.removeEventListener('resize',measure)};
 },[target,help.message,clear]);
 useEffect(()=>{if(!open)return;dialog.current?.showModal();clear();setWelcome(false);return()=>dialog.current?.close()},[open,clear]);
 useEffect(()=>{const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){clear();setWelcome(false)}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape)},[clear]);
 useEffect(()=>{const resize=()=>setOffset({x:0,y:0});window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize)},[]);
 const close=()=>{setOpen(false);launcher.current?.focus()};
 const tuck=()=>{setHidden(true);setWelcome(false);storage.set('auri-hidden','yes');clear();close()};
 const hint=<div className={`auri-context ${help.mood==='error'?'has-error':''}`} data-auri-ui><AuriCharacter small mood={help.mood}/><div><span className="auri-context-label">{help.mood==='error'?'LET’S FIX THIS':'A LITTLE HELP FROM AURI'}</span><p role="status">{help.message}</p></div><button type="button" aria-label="Dismiss this hint" onClick={clear}><X size={13}/></button></div>;
 return <div data-auri-ui className={motion?'auri-system':'auri-system still'}>
  {!hidden&&!open&&anchor&&<div className="auri-anchor" style={{left:anchor.left,top:anchor.top,width:anchor.width}}>{hint}</div>}
  {!hidden&&!open&&slot&&createPortal(hint,slot)}
  <div className={"auri-dock "+(target&&(anchor||slot)?"context-active":"")} style={{transform:`translate(${offset.x}px,${offset.y}px)`}}>
   {!hidden&&welcome&&!target&&<div className="auri-welcome" role="status">{help.mood==='success'?<Check size={14}/>:<Sparkles size={14}/>}<span>{help.message}</span><button aria-label="Dismiss Auri welcome" onClick={()=>setWelcome(false)}><X size={12}/></button></div>}
   <button type="button" ref={launcher} className={'auri-launcher '+(hidden?'minimal':'')} aria-label={hidden?'Restore Auri guide':'Open Auri guide'} aria-haspopup="dialog" onPointerDown={e=>{if(hidden)return;drag.current={x:e.clientX,y:e.clientY,ox:offset.x,oy:offset.y,moved:false};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{const d=drag.current;if(!d)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;if(Math.abs(dx)+Math.abs(dy)>8)d.moved=true;if(d.moved)setOffset({x:Math.max(-innerWidth+110,Math.min(0,d.ox+dx)),y:Math.max(-innerHeight+140,Math.min(0,d.oy+dy))})}} onPointerUp={()=>{skipClick.current=!!drag.current?.moved;drag.current=null}} onPointerCancel={()=>{drag.current=null;skipClick.current=false}} onClick={()=>{if(skipClick.current){skipClick.current=false;return;}setHidden(false);storage.set('auri-hidden','no');setOpen(true)}}>
    {hidden?<HelpCircle size={21}/>:<><AuriCharacter mood={help.mood||'idle'} motion={motion}/><span>Ask Auri <ArrowUpRight size={11}/></span></>}
   </button>
  </div>
  {open&&<dialog className="auri-dialog" ref={dialog} onCancel={e=>{e.preventDefault();close()}} onClick={e=>{if(e.target===e.currentTarget)close()}} aria-labelledby="auri-title">
   <div className="auri-dialog-heading"><div><span className="eyebrow"><span className="green-dot"/> YOUR GUIDE TO THE LAB</span><h2 id="auri-title">A little clarity.</h2></div><button autoFocus type="button" className="icon-button" aria-label="Close Auri guide" onClick={close}><X size={20}/></button></div>
   <div className="auri-intro"><AuriCharacter mood="observing" motion={motion}/><p>{admin?'I can explain the studio’s controls. Save confirms an update; Published controls what visitors can see.':'I’m Auri. I can help you find your way and explain each field as you go.'}<small>Website guidance · no messages are sent to an AI service.</small></p></div>
   <label className="search-box"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find some guidance…" aria-label="Search Auri help"/></label>
   <div className="auri-faq">{faq.filter(f=>(f.q+f.a).toLowerCase().includes(query.toLowerCase())).map(f=><details key={f.q}><summary>{f.q}<ArrowUpRight size={14}/></summary><p>{f.a}</p><a className="text-link" href={f.href}>Go there <ArrowUpRight size={14}/></a></details>)}{!faq.some(f=>(f.q+f.a).toLowerCase().includes(query.toLowerCase()))&&<p>No matching guide. <a href="/contact">Ask the team.</a></p>}</div>
   <div className="auri-preferences"><label><span><Hand size={15}/> Contextual field & button hints</span><input type="checkbox" checked={enabled} onChange={e=>{setEnabled(e.target.checked);storage.set('auri-hints',e.target.checked?'on':'off')}}/></label><label><span><Sparkles size={15}/> Character animation</span><input type="checkbox" checked={motion} onChange={e=>{setMotion(e.target.checked);storage.set('auri-motion',e.target.checked?'on':'off')}}/></label></div>
   <div className="auri-dialog-footer"><button onClick={()=>setOffset({x:0,y:0})}><RotateCcw size={13}/> Reset position</button><button onClick={tuck}><VolumeX size={13}/> Minimize</button></div><p className="auri-access-note"><Move size={11}/> Drag the character to move it. Reduced-motion preferences are respected.</p>
  </dialog>}
 </div>;
}
