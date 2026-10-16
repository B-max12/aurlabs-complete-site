import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const manifest=JSON.parse(readFileSync(path.join(root,'handoff/production-source-manifest.json'),'utf8'));
const changes=[];
for(const row of manifest.files){
  let actual;
  try{actual=createHash('sha256').update(readFileSync(path.join(root,row.exportPath))).digest('hex')}catch{changes.push(row.exportPath+' is missing');continue}
  if(actual!==row.sha256)changes.push(row.exportPath+' differs from the production snapshot');
}
if(changes.length){
  console.error(changes.join('\n'));
  console.error('The export no longer matches its production-source manifest. Intentional future edits require reviewing and updating the manifest.');
  process.exit(1);
}
console.log('Verified all '+manifest.files.length+' original production files from '+manifest.sourceCommit+'. Documentation and local-only additions are listed separately.');
