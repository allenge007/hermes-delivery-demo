import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const commit = process.env.DEMO_SOURCE_COMMIT;
if(!/^[a-f0-9]{40}$/.test(commit ?? '')) throw Error('Exact source commit required');
const names = ['index.html','styles.css','app.mjs','orders.mjs'];
const target = path.join(root, 'site'); await fs.mkdir(target, { recursive: true });
const entries = [];
for(const name of names) {
  const source = path.join(root, name); if(!(await fs.lstat(source)).isFile()) throw Error('Only regular static files permitted');
  const data = await fs.readFile(source); await fs.writeFile(path.join(target, name), data);
  entries.push({ path: name, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') });
}
await fs.writeFile(path.join(target, 'build-info.json'), JSON.stringify({ schemaVersion: 1, sourceCommit: commit, files: entries }, null, 2)+'\n');
console.log(JSON.stringify({ sourceCommit: commit, files: entries.length, bytes: entries.reduce((sum,file) => sum+file.bytes,0) }));
