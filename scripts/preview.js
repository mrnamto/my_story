// Tạo dist/preview.html: toàn bộ web + truyện trong MỘT file để xem thử nhanh (không cần server).
const fs = require('fs'), path = require('path'), D = path.join(__dirname, '..', 'dist');
const rd = f => fs.readFileSync(path.join(D, f), 'utf8');
const css = rd('style.css'), js = rd('common.js');
const page = f => rd(f).replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`)
  .replace('<script src="common.js"></script>', `<script>${js}</script>`);
const files = { 'index.json': rd('index.json') };
const idx = JSON.parse(files['index.json']);
for (const s of idx.stories) for (const c of s.chapters) files[`stories/${s.slug}/${c.file}`] = rd(`stories/${s.slug}/${c.file}`);
const IMGS = {}, MT = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml' };
(function walk(d) { for (const f of fs.readdirSync(path.join(D, d))) { const rel = d + '/' + f, ab = path.join(D, rel);
  if (fs.statSync(ab).isDirectory()) walk(rel); else { const m = MT[f.split('.').pop().toLowerCase()]; if (m) IMGS[rel] = 'data:' + m + ';base64,' + fs.readFileSync(ab).toString('base64'); } } })('stories');
const pages = { index: page('index.html'), story: page('story.html'), read: page('read.html') };
const J = o => JSON.stringify(o).replace(/</g, '\\u003c');
fs.writeFileSync(path.join(D, 'preview.html'), `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${idx.site.title} (xem thử)</title>
<style>html,body{height:100%;margin:0}iframe{width:100%;height:100%;border:0;display:block}</style></head><body><iframe id="f"></iframe>
<script>
var IMGS=${J(IMGS)},FILES=${J(files)},PAGES=${J(pages)};
const SHIM=(q)=>'<script>window.__SEARCH='+JSON.stringify(q)+';window.__go=u=>parent.route(u);'+
 'window.fetch=u=>{const v=parent.FILES[decodeURIComponent(u)];return Promise.resolve(v==null?new Response("",{status:404}):new Response(v))};'+
 'document.addEventListener("error",e=>{const t=e.target;if(t.tagName==="IMG"){let k=decodeURIComponent(t.getAttribute("src")||"");const i=k.indexOf("stories/");if(i>0)k=k.slice(i);if(parent.IMGS[k]&&t.src!==parent.IMGS[k])t.src=parent.IMGS[k]}},true);'+
 'document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(a){e.preventDefault();parent.route(a.getAttribute("href"))}});<\\/script>';
function route(u){const [p,q]=u.split('?');const k=/story\\.html$/.test(p)?'story':/read\\.html$/.test(p)?'read':'index';
 document.getElementById('f').srcdoc=PAGES[k].replace('<head>','<head>'+SHIM(q?'?'+q:''));}
route('index.html');
</script></body></html>`);
console.log('OK: dist/preview.html', (fs.statSync(path.join(D, 'preview.html')).size / 1024).toFixed(0) + ' KB');
