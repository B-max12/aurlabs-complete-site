import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { registerHooks } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
registerHooks({
  resolve(specifier,context,next){
    if(specifier==='cloudflare:workers')return {url:'aur-test:env',shortCircuit:true};
    if(specifier.startsWith('@/'))specifier=pathToFileURL(resolve(root,specifier.slice(2))).href;
    try{return next(specifier,context)}catch(error){
      if(specifier.startsWith('.')||specifier.startsWith('file:')){
        const base=new URL(specifier,context.parentURL).href;
        for(const ext of ['.ts','.tsx']){const url=base+ext;if(existsSync(fileURLToPath(url)))return {url,shortCircuit:true};}
      }
      throw error;
    }
  },
  load(url,context,next){
    if(url==='aur-test:env')return {format:'module',source:'export const env=globalThis.__aurTestEnv;',shortCircuit:true};
    if(/\.tsx?$/.test(url))return {format:'module',source:ts.transpileModule(readFileSync(fileURLToPath(url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,shortCircuit:true};
    return next(url,context);
  }
});
const sqlite=new DatabaseSync(':memory:');
sqlite.exec(readFileSync(resolve(root,'drizzle/0000_huge_azazel.sql'),'utf8'));
class Statement{
 constructor(sql,args=[]){this.sql=sql;this.args=args;}
 bind(...args){return new Statement(this.sql,args)}
 async first(){return sqlite.prepare(this.sql).get(...this.args)||null}
 async all(){return {results:sqlite.prepare(this.sql).all(...this.args)}}
 async run(){const r=sqlite.prepare(this.sql).run(...this.args);return {success:true,meta:{changes:Number(r.changes)}}}
}
const objects=new Map();
globalThis.__aurTestEnv={DB:{prepare:sql=>new Statement(sql),batch:async stmts=>{sqlite.exec('BEGIN');try{const result=[];for(const stmt of stmts)result.push(await stmt.run());sqlite.exec('COMMIT');return result}catch(e){sqlite.exec('ROLLBACK');throw e}}},BUCKET:{put:async(key,body,meta)=>objects.set(key,{body,...meta}),get:async key=>objects.get(key)||null}};
const admin=await import('../app/api/admin/route.ts');
const submissions=await import('../app/api/submissions/route.ts');
const upload=await import('../app/api/media/route.ts');
const mediaGet=await import('../app/api/media/[key]/route.ts');
const {readContent}=await import('../lib/server.ts');
const {defaultContent}=await import('../lib/content.ts');
const {productSchema,joinSchema,contactSchema,safeURL}=await import('../lib/validation.ts');
let checks=0;
const ok=(value,message)=>{assert.ok(value,message);checks++};
const eq=(a,b,message)=>{assert.equal(a,b,message);checks++};
const request=(body,{user='test-owner',token='',origin='https://aur.test',method='POST',path='/api/admin'}={})=>new Request('https://aur.test'+path,{method,headers:{...(origin?{origin}:{}),...(user?{'oai-authenticated-user-id':user,'oai-authenticated-user-email':user+'@example.invalid'}:{}),'content-type':'application/json',...(token?{'x-aur-unlock':token}:{})},...(method==='GET'?{}:{body:JSON.stringify(body)})});
const call=async(body,opts)=>{const r=await admin.POST(request(body,opts));return {status:r.status,data:await r.json()}};
const secret='test-only-setup-secret-never-deployed-001';
for(const p of defaultContent.products)ok(productSchema.safeParse(p).success,'Default product validates');
ok(!safeURL.safeParse('javascript:alert(1)').success,'Script links rejected');
ok(!safeURL.safeParse('http://example.com').success,'Insecure links rejected');
eq((await call({action:'setup',username:'owner',password:'test-only-password-2026',setupToken:secret})).status,403,'Setup disabled without host token');
eq((await call({action:'setup'},{origin:''})).status,403,'Missing origin rejected');
eq((await call({action:'setup'},{user:''})).status,401,'Anonymous admin rejected');
globalThis.__aurTestEnv.AUR_ADMIN_SETUP_TOKEN=secret;
eq((await call({action:'setup',username:'owner',password:'short',setupToken:secret})).status,400,'Short password rejected');
const created=await call({action:'setup',username:'owner',password:'test-only-password-2026',setupToken:secret});eq(created.status,200,'Secure setup succeeds');let token=created.data.unlockToken;
ok(token?.length>50,'Unlock token generated');
const row=sqlite.prepare('SELECT * FROM administrators').get();ok(!row.password_hash.includes('test-only-password'),'Password is not stored in plaintext');eq(row.user_id,'test-owner','Admin bound to platform identity');
eq((await call({action:'setup',username:'other',password:'test-only-password-2026',setupToken:secret})).status,409,'Second administrator claim blocked');
eq((await call({action:'unlock',username:'owner',password:'wrong password'})).status,403,'Incorrect password rejected');
eq((await call({action:'unlock',username:'owner',password:'test-only-password-2026'},{user:'other-user'})).status,403,'Valid password cannot unlock another identity');
eq((await admin.GET(request(null,{method:'GET',user:'other-user',token}))).status,401,'Admin token bound to identity');
eq((await admin.GET(request(null,{method:'GET',token}))).status,200,'Authorized admin reads content');
const product={...defaultContent.products[0],id:'test-product',slug:'test-product',name:'Test product',published:false};
eq((await call({action:'save',kind:'products',data:product},{token})).status,200,'Draft saved');
ok(!(await readContent()).products.some(p=>p.id===product.id),'Draft excluded from public content');
product.status='released';product.published=true;
eq((await call({action:'save',kind:'products',data:product},{token})).status,400,'Release requires real download');
product.releases=[{platform:'Windows',version:'1.0.0',url:'https://example.com/release.exe',architecture:'x64',requirements:'Windows 11',checksum:'a'.repeat(64),notes:'Initial release',date:'2026-10-11'}];
eq((await call({action:'save',kind:'products',data:product},{token})).status,200,'Release saved');
ok((await readContent()).products.some(p=>p.id===product.id&&p.releases.length===1),'Published release publicly readable');
const duplicate={...product,id:'test-conflict'};eq((await call({action:'save',kind:'products',data:duplicate},{token})).status,409,'Duplicate slug rejected');
const unsafe={...product,releases:[{...product.releases[0],url:'javascript:alert(1)'}]};eq((await call({action:'save',kind:'products',data:unsafe},{token})).status,400,'Unsafe download rejected');
eq((await call({action:'delete',kind:'products',id:'aur-notes'},{token})).status,200,'Seed concept deletion saved');ok(!(await readContent()).products.some(p=>p.id==='aur-notes'),'Deleted seed does not reappear');
const contact={kind:'contact',name:'Test Person',email:'person@example.invalid',website:'',consent:true,topic:'A problem to solve',subject:'An example issue',product:'',platform:'Linux',message:'This is a sufficiently detailed test message about an example problem.',idempotencyKey:crypto.randomUUID()};
ok(contactSchema.safeParse(contact).success,'Contact payload validates');
let res=await submissions.POST(request({...contact,consent:false},{path:'/api/submissions'}));eq(res.status,400,'Consent required');
res=await submissions.POST(request({...contact,website:'spam'},{path:'/api/submissions'}));eq(res.status,400,'Honeypot rejects automated payload');
res=await submissions.POST(request(contact,{path:'/api/submissions',user:''}));eq(res.status,201,'Public contact saved');
res=await submissions.POST(request(contact,{path:'/api/submissions',user:''}));eq(res.status,200,'Retry returns success');
eq(sqlite.prepare('SELECT count(*) AS n FROM submissions').get().n,1,'Idempotent retry creates one record');
const application={kind:'join',name:'Test Contributor',email:'contributor@example.invalid',website:'',consent:true,role:'Frontend development',stack:'React and TypeScript',experience:'1–3 years',portfolio:'',timezone:'Asia/Karachi',hours:'4–7 hours',availability:'Tuesday evenings after 7 pm',motivation:'I would like to contribute to accessible software for everyone.',problem:'I would like to build a tool that helps people manage tasks more easily.',collaboration:'I ask questions and use feedback to make the next iteration better.',volunteer:true,idempotencyKey:crypto.randomUUID()};
ok(joinSchema.safeParse(application).success,'Complete volunteer application validates');
res=await submissions.POST(request(application,{path:'/api/submissions'}));eq(res.status,201,'Volunteer application saved');
eq((await call({action:'submission',id:application.idempotencyKey,status:'reviewing'},{token})).status,200,'Inbox status updated');
eq(sqlite.prepare('SELECT status FROM submissions WHERE id=?').get(application.idempotencyKey).status,'reviewing','Status persisted');
eq((await call({action:'submission',id:application.idempotencyKey,status:'delete'},{token})).status,200,'Private submission deletable');
eq(sqlite.prepare('SELECT count(*) AS n FROM submissions WHERE id=?').get(application.idempotencyKey).n,0,'Personal data removed');
const closed={...defaultContent.settings,hiring:false};eq((await call({action:'save',kind:'settings',data:closed},{token})).status,200,'Settings updated');
res=await submissions.POST(request({...application,idempotencyKey:crypto.randomUUID()},{path:'/api/submissions'}));eq(res.status,403,'Closed applications enforced on server');
const svgForm=new FormData();svgForm.append('file',new File(['<svg onload="alert(1)"></svg>'],'unsafe.svg',{type:'image/svg+xml'}));
res=await upload.POST(new Request('https://aur.test/api/media',{method:'POST',headers:{origin:'https://aur.test','oai-authenticated-user-id':'test-owner','x-aur-unlock':token},body:svgForm}));eq(res.status,400,'Active SVG upload rejected');
const png=Uint8Array.from([137,80,78,71,13,10,26,10,0,0,0,13]);const form=new FormData();form.append('file',new File([png],'test.png',{type:'image/png'}));
res=await upload.POST(new Request('https://aur.test/api/media',{method:'POST',headers:{origin:'https://aur.test','oai-authenticated-user-id':'test-owner','x-aur-unlock':token},body:form}));eq(res.status,201,'PNG signature upload accepted');const asset=await res.json();
res=await mediaGet.GET(new Request('https://aur.test'+asset.url),{params:Promise.resolve({key:asset.id})});eq(res.status,200,'Stored media readable');eq(res.headers.get('content-type'),'image/png','Image MIME set safely');
res=await mediaGet.GET(new Request('https://aur.test/api/media/missing'),{params:Promise.resolve({key:'../secret'})});eq(res.status,404,'Media traversal blocked');
sqlite.prepare('UPDATE admin_unlocks SET expires_at=0').run();eq((await admin.GET(request(null,{method:'GET',token}))).status,401,'Expired unlock blocked');
const unlocked=await call({action:'unlock',username:'owner',password:'test-only-password-2026'});eq(unlocked.status,200,'Password unlock works');token=unlocked.data.unlockToken;
const change=await call({action:'password',currentPassword:'test-only-password-2026',password:'test-only-new-password-2026'},{token});eq(change.status,200,'Password rotation works');eq((await admin.GET(request(null,{method:'GET',token}))).status,401,'Rotation revokes old unlock');
// New guide rules are ordinary published settings and remain admin-protected.
const freshToken=change.data.unlockToken;
const guidedSettings={...defaultContent.settings,auriGuides:{email:'Use an address you check regularly.'}};
eq((await call({action:'save',kind:'settings',data:guidedSettings},{token:freshToken})).status,200,'Guide rules save through authenticated settings');
eq((await readContent()).settings.auriGuides.email,guidedSettings.auriGuides.email,'Guide rules published');
eq((await call({action:'save',kind:'settings',data:{...guidedSettings,auriGuides:{email:'a'.repeat(351)}}},{token:freshToken})).status,400,'Oversized guidance rejected');
const concurrent={...contact,email:'parallel@example.invalid',idempotencyKey:crypto.randomUUID()};
await Promise.all([submissions.POST(request(concurrent,{path:'/api/submissions',user:''})),submissions.POST(request(concurrent,{path:'/api/submissions',user:''}))]);
eq(sqlite.prepare('SELECT count(*) AS n FROM submissions WHERE id=?').get(concurrent.idempotencyKey).n,1,'Concurrent retries persist exactly one submission');
const researchWithReferences={...defaultContent.research[0],references:[{label:'Supabase documentation',url:'https://supabase.com/docs'}]};
eq((await call({action:'save',kind:'research',data:researchWithReferences},{token:freshToken})).status,200,'Research references saved');
eq((await readContent()).research[0].references[0].url,'https://supabase.com/docs','Reference URL persists');
eq((await call({action:'save',kind:'research',data:{...researchWithReferences,references:[{label:'Bad link',url:'javascript:alert(1)'}]}},{token:freshToken})).status,400,'Unsafe research reference rejected');
const React=await import('react');const {renderToStaticMarkup}=await import('react-dom/server');const {default:Site}=await import('../app/site.tsx');
for(const path of ['/','/products','/products/aur-notes','/about','/journal','/journal/why-we-build-for-everyone','/research','/research/making-useful-tools-more-accessible','/join','/support','/contact','/privacy','/terms','/admin']){const html=renderToStaticMarkup(React.createElement(Site,{content:defaultContent,path}));ok(html.includes(path==='/admin'?'Checking secure access':'id="main"'),'SSR renders '+path);ok(!html.includes('href="#"'),'No inert placeholder links on '+path);}
console.log(`PASS: ${checks} integration assertions. Admin authorization, publication, forms, inbox, media, schema migrations, and 14 page renders verified.`);
sqlite.close();
