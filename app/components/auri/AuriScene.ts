import * as THREE from 'three';
import type {AuriMood} from '@/lib/auri-guides';
/** Luxury Pearl (#EDE8E4) & Brushed Bronze (#8D6613) procedural 3D companion. */
export function mountAuri(canvas:HTMLCanvasElement,options:{motion:()=>boolean;mood:()=>AuriMood}){
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));renderer.setSize(88,105,false);renderer.setClearColor(0,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1.55,1.55,1.85,-1.85,.1,20);camera.position.set(0,.1,6);camera.lookAt(0,.1,0);
 // Warm Pearl sky light + rich Bronze ground bounce + champagne-gold rim lighting
 scene.add(new THREE.HemisphereLight(0xfffaf2,0x6b4d0e,3.1));
 const key=new THREE.DirectionalLight(0xffffff,3.8);key.position.set(-3,5,4);scene.add(key);
 const rim=new THREE.DirectionalLight(0xf3cf82,2.7);rim.position.set(3,1.5,-2);scene.add(rim);
 const pearl=new THREE.MeshStandardMaterial({color:0xede8e4,metalness:.2,roughness:.22});
 const bronze=new THREE.MeshStandardMaterial({color:0x8d6613,metalness:.62,roughness:.26});
 const burnished=new THREE.MeshStandardMaterial({color:0xc89628,metalness:.74,roughness:.22});
 const visor=new THREE.MeshStandardMaterial({color:0x191306,metalness:.36,roughness:.12});
 const eye=new THREE.MeshStandardMaterial({color:0xfbe3a4,emissive:0xd49b27,emissiveIntensity:1.35,roughness:.32});
 const model=new THREE.Group();scene.add(model);model.rotation.y=-.14;
 const sphere=new THREE.SphereGeometry(1,28,20),rod=new THREE.CylinderGeometry(.032,.038,.36,12),ring=new THREE.TorusGeometry(.52,.055,12,32);
 const part=(material:THREE.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number)=>{const mesh=new THREE.Mesh(sphere,material);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);model.add(mesh);return mesh};
 // Pearlescent head & obsidian-bronze glass visor
 part(pearl,0,.48,0,1,.73,.57);part(visor,0,.45,.48,.78,.39,.22);
 // Luminous champagne-gold eyes & smile
 const eyes=[part(eye,-.29,.48,.69,.092,.145,.035),part(eye,.29,.48,.69,.092,.145,.035)];
 part(eye,0,.23,.7,.11,.024,.02);
 // Brushed bronze ear pods with pearl outer caps
 part(bronze,-1.0,.44,0,.13,.30,.26);part(bronze,1.0,.44,0,.13,.30,.26);
 part(burnished,-1.08,.44,0,.05,.18,.18);part(burnished,1.08,.44,0,.05,.18,.18);
 // Polished bronze collar ring
 const collar=new THREE.Mesh(ring,burnished);collar.position.set(0,-.12,0);collar.rotation.x=Math.PI/2;model.add(collar);
 // Metallic bronze torso with pearl chest core
 part(bronze,0,-.54,0,.67,.46,.47);part(pearl,0,-.49,.45,.19,.15,.04);part(burnished,0,-.49,.48,.08,.08,.02);
 // Pearl hands & bronze-tipped feet
 part(pearl,-.87,-.49,.03,.16,.30,.20);const hand=part(pearl,.88,-.47,.02,.16,.30,.20);hand.rotation.z=-.4;
 const antenna=new THREE.Mesh(rod,burnished);antenna.position.set(.08,1.32,0);model.add(antenna);
 const orb=part(eye,.08,1.52,0,.12,.12,.12);
 part(pearl,-.30,-.96,.02,.23,.13,.29);part(pearl,.30,-.96,.02,.23,.13,.29);
 let disposed=false,last=0,visible=true,lastMood='',lastMotion:boolean|undefined;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const draw=(t:number)=>{if(disposed||!visible||document.hidden||t-last<32)return;last=t;const animate=options.motion()&&!reduced.matches,mood=options.mood();if(!animate&&lastMood===mood&&lastMotion===false)return;lastMood=mood;lastMotion=animate;
  model.position.y=animate?Math.sin(t*.0018)*.07:0;model.rotation.y=animate?-.14+Math.sin(t*.0008)*.09:-.14;model.rotation.z=mood==='error'?-.07:0;
  hand.rotation.z=animate&&mood==='explaining'?-.55-Math.sin(t*.004)*.35:-.4;
  const blink=animate&&t%4800>4600?.16:1;eyes.forEach(e=>e.scale.y=(mood==='success'?.085:.145)*blink);
  const pulse=animate?1+.08*Math.sin(t*.003):1;orb.scale.set(.12*pulse,.12*pulse,.12*pulse);
  eye.color.setHex(mood==='success'?0x6ee7b7:mood==='error'?0xfda4af:0xfbe3a4);
  eye.emissive.setHex(mood==='success'?0x10b981:mood==='error'?0xf43f5e:0xd49b27);
  renderer.render(scene,camera);
 };
 const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true});observer.observe(canvas);
 renderer.setAnimationLoop(draw);draw(100);
 const lost=(event:Event)=>{event.preventDefault();canvas.style.opacity='0';canvas.parentElement?.classList.remove('webgl-ready')};canvas.addEventListener('webglcontextlost',lost);
 return ()=>{disposed=true;observer.disconnect();canvas.removeEventListener('webglcontextlost',lost);renderer.setAnimationLoop(null);sphere.dispose();rod.dispose();ring.dispose();[pearl,bronze,burnished,visor,eye].forEach(m=>m.dispose());renderer.dispose();renderer.forceContextLoss()};
}
