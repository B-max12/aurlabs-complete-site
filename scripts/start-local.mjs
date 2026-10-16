import {existsSync,writeFileSync} from 'node:fs';
import {randomBytes} from 'node:crypto';
import {spawnSync,spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
process.chdir(root);
if(Number(process.versions.node.split('.')[0])<24){
  console.error('Use Node.js 24 or newer. This export was verified with Node.js 24.19.0.');
  process.exit(1);
}
const flags=new Set(process.argv.slice(2));
if([...flags].some(x=>!['--check','--prepare-only'].includes(x))){
  console.error('Usage: node scripts/start-local.mjs [--check | --prepare-only]');
  process.exit(1);
}
const run=(bin,args)=>{
  const result=spawnSync(bin,args,{cwd:root,stdio:'inherit',env:process.env,shell:process.platform==='win32'&&bin.endsWith('.cmd')});
  if(result.error)throw result.error;
  if(result.status!==0)process.exit(result.status??1);
};
run(process.execPath,['scripts/verify-handoff.mjs']);
if(!existsSync('node_modules/.pnpm/lock.yaml')){
  run(process.platform==='win32'?'npx.cmd':'npx',['--yes','pnpm@11.25.0','install','--frozen-lockfile']);
}
if(flags.has('--check')){
  for(const file of ['tests/integration.mjs','tests/client.mjs'])run(process.execPath,[file]);
  run(process.execPath,['node_modules/typescript/bin/tsc','--noEmit']);
  run(process.execPath,['scripts/run-framework.mjs','build']);
  console.log('Local assertions, TypeScript and the Cloudflare production build passed. This is not a Vercel deployment test.');
  process.exit(0);
}
if(!existsSync('.dev.vars')){
  writeFileSync('.dev.vars','# Local-only setup token. Never publish this file.\nAUR_ADMIN_SETUP_TOKEN='+randomBytes(32).toString('hex')+'\n',{mode:0o600,flag:'wx'});
  console.log('Created a local-only setup token in ignored .dev.vars. Read it locally when setting up /admin.');
}
run(process.execPath,['--import','./scripts/sites-env.mjs','node_modules/wrangler/bin/wrangler.js','d1','migrations','apply','DB','--local','--config','handoff/wrangler.local.json','--persist-to','.wrangler/state']);
if(flags.has('--prepare-only')){
  console.log('Local D1/R2 configuration prepared. No remote service was changed and no server was started.');
  process.exit(0);
}
console.log('Starting the original production application locally at http://localhost:5173. Sign-in is the included localhost-only test identity.');
const child=spawn(process.execPath,['scripts/run-framework.mjs','dev','--host','127.0.0.1'],{cwd:root,stdio:'inherit',env:process.env});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('error',error=>{console.error(error.message);process.exit(1)});
child.on('exit',code=>process.exit(code??1));
