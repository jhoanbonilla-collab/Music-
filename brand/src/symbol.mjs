// XolosaX symbol — the "Golden S" sax monogram.
// Synthesis of references: an elegant monoline S (the saxophone's S-curve body), an
// abstracted bell mouth, a row of three key "pearls", optionally enclosed in a diamond
// seal whose diagonals and four points carry the X of XolosaX.
const f = n => (Math.round(n * 100) / 100);

// S spine centerline: top-right terminal -> over top -> slim waist -> bottom bowl -> bell
const S_SPINE = `M340,158 C340,120 302,102 256,102 C204,102 168,132 168,178 `
  + `C168,222 204,242 252,255 C302,268 340,288 340,334 C340,392 300,422 250,422 `
  + `C214,422 186,406 180,374`;

function gradDef(id) {
  return `<linearGradient id="${id}" x1="120" y1="90" x2="380" y2="430" gradientUnits="userSpaceOnUse">`
    + `<stop offset="0" stop-color="#E7C964"/><stop offset="0.5" stop-color="#C89B3C"/><stop offset="1" stop-color="#9D7320"/></linearGradient>`;
}

function pearls(n, r, paint) {
  const a = [250, 258], b = [330, 312], ox = -16, oy = 12;
  let out = '';
  for (let i = 0; i < n; i++) {
    const t = n > 1 ? i / (n - 1) : 0.5;
    const x = a[0] + (b[0] - a[0]) * t + ox, y = a[1] + (b[1] - a[1]) * t + oy;
    out += `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${paint}"/>`;
  }
  return out;
}

function bell(sw, paint) {
  return `<g transform="translate(156,360) rotate(-32)"><ellipse cx="0" cy="0" rx="46" ry="29" fill="none" stroke="${paint}" stroke-width="${sw}"/></g>`;
}

function diamond(sw, paint) {
  const corners = [[256, 52], [460, 256], [256, 460], [52, 256]];
  const acc = corners.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="${paint}"/>`).join('');
  return `<path d="M256,52 L460,256 L256,460 L52,256 Z" fill="none" stroke="${paint}" stroke-width="${sw}" stroke-linejoin="miter"/>${acc}`;
}

// Tight geometry bounds of the S art (measured, constant regardless of colour).
const ART = { x: 101.62, y: 102, w: 238.38, h: 320 };

// opts: { color, gradient, frame, pearls(bool), bell(bool), sw, dsw, npearls, pr, id }
export function symbol(opts = {}) {
  const {
    color = '#C89B3C', gradient = false, frame = false,
    pearls: wPearls = true, bell: wBell = true,
    sw = 25, dsw = 5, npearls = 3, pr = 9.5, id = 'g',
  } = opts;
  const paint = gradient ? `url(#${id})` : color;
  const defs = gradient ? `<defs>${gradDef(id)}</defs>` : '';
  const art = `<path d="${S_SPINE}" fill="none" stroke="${paint}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`
    + (wBell ? bell(sw * 0.66, paint) : '')
    + (wPearls ? pearls(npearls, pr, paint) : '');

  let body;
  if (frame) {
    // diamond fills the canvas; centre the S inside it
    const dx = 256 - (ART.x + ART.w / 2), dy = 256 - (ART.y + ART.h / 2);
    body = diamond(dsw, paint) + `<g transform="translate(${f(dx)},${f(dy)})">${art}</g>`;
  } else {
    // normalise the S to fill ~82% of the canvas, centred
    const pad = sw / 2 + 2;
    const bx = ART.x - pad, by = ART.y - pad, bw = ART.w + 2 * pad, bh = ART.h + 2 * pad;
    const scale = (512 * 0.82) / Math.max(bw, bh);
    const tx = 256 - scale * (bx + bw / 2), ty = 256 - scale * (by + bh / 2);
    body = `<g transform="translate(${f(tx)},${f(ty)}) scale(${f(scale)})">${art}</g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="XolosaX symbol"><title>XolosaX</title>${defs}${body}</svg>`;
}

if (process.argv[2] === 'preview') {
  const { writeFileSync } = await import('fs');
  const enc = s => encodeURIComponent(s);
  const tile = (s, bg, sz) => `<div style="background:${bg};display:flex;align-items:center;justify-content:center;width:${sz + 44}px;height:${sz + 44}px"><img src="data:image/svg+xml,${enc(s)}" style="width:${sz}px;height:${sz}px"></div>`;
  const row = (l, c) => `<div style="display:flex;gap:8px;align-items:center"><div style="width:120px;color:#ccc;font:13px sans-serif">${l}</div>${c}</div>`;
  const seal = symbol({ gradient: true, frame: true });
  const free = symbol({ gradient: true });
  const blk = symbol({ color: '#111111', frame: true });
  const wht = symbol({ color: '#FFFFFF', frame: true });
  const fav = symbol({ color: '#C89B3C', pearls: false, frame: false, sw: 30 });
  writeFileSync(new URL('./previewS.html', import.meta.url), `<!doctype html><meta charset=utf8><body style="margin:0;background:#2b2b2b;padding:20px;display:flex;flex-direction:column;gap:10px">
    ${row('seal gradient', tile(seal, '#0F172A', 220) + tile(seal, '#111', 220) + tile(wht, '#111', 220))}
    ${row('frameless', tile(free, '#0F172A', 220) + tile(free, '#fff', 220) + tile(blk, '#fff', 220))}
    ${row('favicon size', tile(fav, '#111', 64) + tile(fav, '#111', 32) + tile(fav, '#111', 16) + tile(seal, '#111', 64) + tile(seal, '#111', 32))}
  </body>`);
  console.log('ok');
}
