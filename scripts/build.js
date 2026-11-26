// Quét stories/, tạo dist/ (web + stories + index.json). Không cần cài thư viện.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), SRC = path.join(ROOT, 'stories'), OUT = path.join(ROOT, 'dist');
const fm = t => { const m = t.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/); const d = {};
  if (!m) return { d, body: t };
  m[1].split(/\r?\n/).forEach(l => { const i = l.indexOf(':'); if (i > 0) d[l.slice(0, i).trim()] = l.slice(i + 1).trim().replace(/^["']|["']$/g, ''); });
  return { d, body: m[2] }; };
const when = f => { try { const t = cp.execSync(`git log -1 --format=%ct -- "${f}"`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); if (t) return +t * 1000; } catch (e) {} return fs.statSync(f).mtimeMs; };

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(ROOT, 'web'), OUT, { recursive: true });
fs.cpSync(SRC, path.join(OUT, 'stories'), { recursive: true });

const stories = [];
for (const slug of fs.readdirSync(SRC)) {
  const dir = path.join(SRC, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  const infoPath = path.join(dir, 'info.md');
  const info = fs.existsSync(infoPath) ? fm(fs.readFileSync(infoPath, 'utf8')) : { d: {}, body: '' };
  const files = fs.readdirSync(dir).filter(f => /^\d.*\.(md|txt)$/i.test(f)).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  let updated = 0;
  const chapters = files.map(f => {
    const p = path.join(dir, f), c = fm(fs.readFileSync(p, 'utf8'));
    const h = c.body.match(/^\s*#\s+(.+)$/m);
    updated = Math.max(updated, when(p));
    return { file: f, title: c.d.title || (h && h[1].trim()) || f.replace(/^\d+[-_ ]*/, '').replace(/\.\w+$/, '').replace(/[-_]/g, ' ') };
  });
  stories.push({ slug, ...info.d, desc: info.d.desc || info.body.trim(), chapters, updated });
}
stories.sort((a, b) => b.updated - a.updated);
const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.json'), 'utf8'));
fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify({ site, stories }));
console.log(`OK: ${stories.length} truyện, ${stories.reduce((n, s) => n + s.chapters.length, 0)} chương`);
