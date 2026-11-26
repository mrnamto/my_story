const $ = (s, r = document) => r.querySelector(s);
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const store = { get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
                set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
function parseFM(t) {
  const m = t.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/), d = {};
  if (!m) return { d, body: t };
  m[1].split(/\r?\n/).forEach(l => { const i = l.indexOf(':'); if (i > 0) d[l.slice(0, i).trim()] = l.slice(i + 1).trim().replace(/^["']|["']$/g, ''); });
  return { d, body: m[2] };
}
const inl = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<i class="tht">$2</i>');
const dl = s => s.replace(/&quot;(.+?)&quot;/g, '<span class="dlg">&quot;$1&quot;</span>').replace(/“(.+?)”/g, '<span class="dlg">“$1”</span>').replace(/«(.+?)»/g, '<span class="dlg">«$1»</span>');
function md(t, base = '') { // markdown tối giản: #, >, ---, **đậm**, *nghiêng*; mỗi dòng là một đoạn; lời thoại gắn class "dlg"
  return t.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(x => {
    let who = '', l = x; const tg = l.match(/^@([A-Za-z0-9_-]+)\s+(.*)$/); if (tg) { who = tg[1].toLowerCase(); l = tg[2]; } // @ten ở đầu dòng: lời thoại/suy nghĩ của nhân vật đó
    let im = l.match(/^!\[(.*?)\]\((\S+?)\)$/);
    if (im) { const u = im[2]; if (/^[a-z][a-z0-9+.-]*:/i.test(u) && !/^https?:/i.test(u)) return ''; // chặn javascript:, data:...
      const src = /^(https?:)?\/\//i.test(u) ? u : base + u.split('/').map(encodeURIComponent).join('/');
      return `<figure class="im"><img loading="lazy" src="${esc(src)}" alt="${esc(im[1])}">${im[1] ? `<figcaption>${inl(im[1])}</figcaption>` : ''}</figure>`; }
    if (/^(-{3,}|\*{3,}|\* \* \*)$/.test(l)) return '<hr>';
    let m = l.match(/^(#{1,4})\s+(.*)$/); if (m) return `<h${m[1].length + 1}>${inl(m[2])}</h${m[1].length + 1}>`;
    if (l[0] === '>') return `<blockquote>${inl(l.replace(/^>\s?/, ''))}</blockquote>`;
    if (/^[-–—]\s+/.test(l)) return `<p class="dlg${who ? ' c-' + who : ''}">${inl(l)}</p>`;
    return `<p${who ? ` class="c-${who}"` : ''}>${dl(inl(l))}</p>`;
  }).join('\n');
}
function coverStyle(s) { // bìa mặc định nếu truyện không có ảnh
  let h = 0; for (const c of s.title || s.slug) h = (h * 31 + c.charCodeAt(0)) % 360;
  return `background:linear-gradient(155deg,hsl(${205 + h % 30} 85% 55%),hsl(${220 + h % 20} 75% 36%))`;
}
const ago = ms => { const d = (Date.now() - ms) / 864e5; return d < 1 ? 'Hôm nay' : d < 2 ? 'Hôm qua' : d < 30 ? Math.floor(d) + ' ngày trước' : new Date(ms).toLocaleDateString('vi-VN'); };
const SEARCH = window.__SEARCH ?? location.search;      // bản xem thử một-file ghi đè 2 dòng này
const go = u => (window.__go || (x => { location.href = x; }))(u);
const IC = { b: 'M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM8 7h6', l: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5', p: 'M3 12h4l3-7 4 14 3-7h4', c: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', h: 'M4 11 12 4l8 7v9h-5v-6H9v6H4z', g: 'M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z' };
const ico = k => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${IC[k]}"/></svg>`;
function shell(d, activeGenre, home) { // thanh menu bên trái, dùng chung cho trang chủ và trang truyện
  const ls = store.get('lastStory', null), s = ls && d.stories.find(x => x.slug === ls), gs = [...new Set(d.stories.map(x => x.genre).filter(Boolean))];
  $('#bn').textContent = d.site.title;
  $('#nav').innerHTML = `<a href="./" class="${home && !activeGenre ? 'on' : ''}">${ico('h')}Thư viện</a>` +
    (s ? `<a href="read.html?s=${s.slug}&c=${encodeURIComponent(store.get('last', {})[s.slug] || s.chapters[0].file)}">${ico('b')}Đang đọc</a>` : '') +
    (gs.length ? '<small>Thể loại</small>' + gs.map(g => `<a href="./?g=${encodeURIComponent(g)}" class="${g === activeGenre ? 'on' : ''}">${ico('g')}${esc(g)}</a>`).join('') : '');
  const t = () => document.body.classList.toggle('open');
  $('#mb').onclick = t; $('#ov').onclick = t;
}
