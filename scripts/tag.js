#!/usr/bin/env node
// Tự gắn thẻ @ten cho lời thoại dựa trên lời dẫn xung quanh, kèm kiểm tra lỗi định dạng.
// Dùng: node scripts/tag.js stories/ten-truyen [--write]   (hoặc trỏ vào một file .md)
// Cần file stories/ten-truyen/nhan-vat.json, ví dụ:
//   { "mai": { "names": ["Mai"], "pronouns": ["Cô"] }, "ma": { "names": ["Má"] }, "ba": { "names": ["Ba"] } }
// Không có --write: chỉ in báo cáo, không sửa file. Có --write: sửa file và giữ bản .bak.
const fs = require('fs'), path = require('path');
const arg = process.argv[2], WRITE = process.argv.includes('--write');
if (!arg) { console.log('Cách dùng: node scripts/tag.js stories/ten-truyen [--write]'); process.exit(1); }
const isDir = fs.statSync(arg).isDirectory(), dir = isDir ? arg : path.dirname(arg);
const cfgPath = path.join(dir, 'nhan-vat.json');
if (!fs.existsSync(cfgPath)) { console.log('Thiếu ' + cfgPath + ' (khai báo nhân vật, xem hướng dẫn).'); process.exit(1); }
const CH = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const entries = [];
for (const [id, c] of Object.entries(CH)) { (c.names || []).forEach(n => entries.push({ id, n: n.toLowerCase(), pro: false })); (c.pronouns || []).forEach(n => entries.push({ id, n: n.toLowerCase(), pro: true })); }
const SKIP = new Set(['rồi', 'thì', 'còn', 'nhưng', 'và', 'lúc', 'đó']);

function mentions(s) { // tên riêng/xưng hô ở bất kỳ đâu; đại từ (cô, anh...) chỉ tính khi đứng đầu câu
  const toks = []; let m; const re = /\p{L}+/gu;
  while ((m = re.exec(s))) toks.push({ w: m[0].toLowerCase(), i: m.index });
  let f = 0; while (f < toks.length && SKIP.has(toks[f].w)) f++;
  const out = [];
  toks.forEach((t, k) => { const e = entries.find(e => e.n === t.w && (!e.pro || k === f)); if (e) out.push({ id: e.id, i: t.i, first: k === f }); });
  return out;
}
function decide(s) { // ai là chủ ngữ của câu dẫn?
  const ms = mentions(s); if (!ms.length) return null;
  const thi = s.indexOf(' thì '); if (thi >= 0) { const a = ms.find(m => m.i > thi); if (a) return a.id; }
  if (s.trim().endsWith(':')) return ms[ms.length - 1].id;
  const f = ms.find(m => m.first); if (f) return f.id;
  return new Set(ms.map(m => m.id)).size === 1 ? ms[0].id : null;
}
const sents = t => t.split(/(?<=[.!?…:])\s+/u).map(x => x.trim()).filter(Boolean);
const lastS = t => { const a = sents(t); return a.length ? a[a.length - 1] : ''; };
const firstS = t => sents(t)[0] || '';
const QRE = /"([^"]*)"|“([^”]*)”/g;
function parse(p) { // tách đoạn thành các phần lời dẫn / ngoặc kép
  const parts = []; let last = 0, m; QRE.lastIndex = 0;
  while ((m = QRE.exec(p))) { parts.push({ q: false, t: p.slice(last, m.index) }); parts.push({ q: true, t: m[0], inner: m[1] ?? m[2] }); last = m.index + m[0].length; }
  parts.push({ q: false, t: p.slice(last) });
  parts.forEach((x, i) => { if (x.q) { const pre = parts[i - 1].t; x.non = x.inner.trim().split(/\s+/).length <= 3 && /(chữ|từ|tiếng|câu|tên)\s*$/i.test(pre); } });
  return parts;
}

function processFile(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const fmM = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/), head = fmM ? fmM[0] : '';
  const lines = raw.slice(head.length).split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const rep = { tagged: 0, speech: 0, flags: [], warns: [], fixedQuotes: 0, counts: {} };
  if (lines.length && !/^[#@>!-]/.test(lines[0]) && lines[0].length <= 80 && !/["“”]/.test(lines[0])) { lines[0] = '# ' + lines[0]; rep.warns.push('Dòng đầu chưa có "# ", đã thêm thành tiêu đề.'); }
  const info = lines.map(l => { if (/^[#@>!]|^(-{3,}|\*{3,})$/.test(l)) return { skip: true, l }; const parts = parse(l); return { l, parts, speech: parts.some(x => x.q && !x.non) }; });
  const hist = []; // các người nói gần nhất
  const out = lines.map((l, n) => {
    const it = info[n]; if (it.skip) return l;
    const odd = (l.match(/"/g) || []).length % 2 || (l.match(/“/g) || []).length !== (l.match(/”/g) || []).length;
    if (odd) rep.warns.push(`Dòng ${n + 1}: ngoặc kép chưa đóng: "${l.slice(0, 40)}…"`);
    if ((l.replace(/\*\*/g, '').match(/\*/g) || []).length % 2) rep.warns.push(`Dòng ${n + 1}: dấu * lẻ (suy nghĩ chưa đóng): "${l.slice(0, 40)}…"`);
    let text = l;
    if (it.parts.some(x => x.q && x.non)) { text = it.parts.map(x => x.q && x.non ? '‘' + x.inner + '’' : x.t).join(''); rep.fixedQuotes++; }
    if (!it.speech) return text;
    rep.speech++;
    const parts = it.parts, sp = [];
    parts.forEach((x, i) => { if (!x.q || x.non) return;
      const pre = parts[i - 1].t.trim(), post = (parts[i + 1] ? parts[i + 1].t : '').trim();
      let id = pre ? decide(lastS(pre)) : null; if (!id && post) id = decide(firstS(post)); sp.push(id); });
    let who = [...new Set(sp.filter(Boolean))];
    if (!who.length) { // đoạn chỉ có thoại: nhìn đoạn trước/sau
      const pv = info[n - 1], nx = info[n + 1];
      if (pv && !pv.skip && !pv.speech) who = [decide(lastS(pv.l))].filter(Boolean);            // 1) đoạn kể ngay trước
      else if (pv && pv.speech && hist.length >= 2) who = [hist[hist.length - 2]];                  // 2) đối đáp qua lại: luân phiên
      if (!who.length && nx && !nx.skip && !nx.speech) who = [decide(firstS(nx.l))].filter(Boolean); // 3) đoạn kể ngay sau
    }
    if (who.length === 1) { hist.push(who[0]); if (hist.length > 2) hist.shift(); if (hist.length === 2 && hist[0] === hist[1]) hist.shift();
      rep.tagged++; rep.counts[who[0]] = (rep.counts[who[0]] || 0) + 1; return '@' + who[0] + ' ' + text; }
    rep.flags.push(`Dòng ${n + 1} (${who.length > 1 ? 'nhiều người nói: ' + who.join(', ') : 'chưa rõ ai nói'}): ${l.slice(0, 50)}…`);
    return text;
  });
  if (WRITE) { fs.copyFileSync(file, file + '.bak'); fs.writeFileSync(file, head + out.join('\n\n') + '\n'); }
  return rep;
}
const files = isDir ? fs.readdirSync(arg).filter(f => /^\d.*\.(md|txt)$/i.test(f)).sort().map(f => path.join(arg, f)) : [arg];
let T = { tagged: 0, speech: 0 };
for (const f of files) { const r = processFile(f); T.tagged += r.tagged; T.speech += r.speech;
  console.log(`\n== ${path.basename(f)}: gắn thẻ ${r.tagged}/${r.speech} đoạn thoại ${Object.entries(r.counts).map(([k, v]) => k + ' ' + v).join(', ')}${r.fixedQuotes ? ' | đổi ' + r.fixedQuotes + ' đoạn có chữ trong ngoặc kép sang nháy đơn' : ''}`);
  r.warns.forEach(w => console.log('  Cảnh báo: ' + w)); r.flags.forEach(w => console.log('  Cần xem:  ' + w)); }
console.log(`\nTổng: ${T.tagged}/${T.speech} đoạn thoại đã gắn thẻ.${WRITE ? ' Đã ghi file (bản gốc: .bak).' : ' (Chạy thử, chưa sửa file. Thêm --write để ghi.)'}`);
