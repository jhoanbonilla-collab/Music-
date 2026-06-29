// Production symbol builder: tapered crossing ribbons with a fine interlaced (over/under) center.
const f = n => n.toFixed(2);
const TL = [118, 118], TR = [394, 118], BR = [394, 394], BL = [118, 394];

function leaf(P0, P1, w) {
  const dx = P1[0] - P0[0], dy = P1[1] - P0[1];
  const L = Math.hypot(dx, dy);
  const ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const s = 0.34 * L;
  const q1 = [P0[0] + ux * s + nx * w, P0[1] + uy * s + ny * w];
  const q2 = [P1[0] - ux * s + nx * w, P1[1] - uy * s + ny * w];
  const q3 = [P1[0] - ux * s - nx * w, P1[1] - uy * s - ny * w];
  const q4 = [P0[0] + ux * s - nx * w, P0[1] + uy * s - ny * w];
  return `M${f(P0[0])},${f(P0[1])} C${f(q1[0])},${f(q1[1])} ${f(q2[0])},${f(q2[1])} ${f(P1[0])},${f(P1[1])} `
       + `C${f(q3[0])},${f(q3[1])} ${f(q4[0])},${f(q4[1])} ${f(P0[0])},${f(P0[1])} Z`;
}

// Build symbol. opts: { color, gradient(bool), interlace(bool), gap }
export function symbol(opts = {}) {
  const { color = '#C89B3C', gradient = false, interlace = true, gap = 13, w = 68, id = 'g' } = opts;
  const front = leaf(TL, BR, w); // crosses OVER
  const back = leaf(TR, BL, w);
  const fill = gradient ? `url(#${id})` : color;
  const defs = gradient
    ? `<defs><linearGradient id="${id}" x1="110" y1="110" x2="402" y2="402" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#D4AF37"/><stop offset="0.55" stop-color="#C89B3C"/><stop offset="1" stop-color="#B8860B"/></linearGradient>`
    : '<defs>';
  let body;
  if (interlace) {
    const mid = `m_${id}`;
    body = `${defs}<mask id="${mid}"><rect width="512" height="512" fill="#fff"/>`
      + `<path d="${front}" fill="#000" stroke="#000" stroke-width="${gap * 2}"/></mask></defs>`
      + `<path d="${back}" fill="${fill}" mask="url(#${mid})"/>`
      + `<path d="${front}" fill="${fill}"/>`;
  } else {
    body = `${defs}</defs><path d="${front}" fill="${fill}"/><path d="${back}" fill="${fill}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="XolosaX symbol"><title>XolosaX</title>${body}</svg>`;
}

if (process.argv[2] === 'preview') {
  const { writeFileSync } = await import('fs');
  const flat = symbol({ gradient: false });
  const grad = symbol({ gradient: true });
  const blk = symbol({ color: '#111111' });
  const wht = symbol({ color: '#FFFFFF' });
  const enc = s => encodeURIComponent(s);
  const tile = (s, bg, sz) => `<div style="background:${bg};display:flex;align-items:center;justify-content:center;width:${sz+40}px;height:${sz+40}px"><img src="data:image/svg+xml,${enc(s)}" style="width:${sz}px;height:${sz}px"></div>`;
  const row = (label, cells) => `<div style="display:flex;gap:8px;align-items:center"><div style="width:120px;color:#ccc;font:13px sans-serif">${label}</div>${cells}</div>`;
  const html = `<!doctype html><meta charset=utf8><body style="margin:0;background:#2b2b2b;padding:20px;display:flex;flex-direction:column;gap:10px">
  ${row('gradient', tile(grad,'#111',220)+tile(grad,'#fff',220)+tile(grad,'#0F172A',220))}
  ${row('flat gold', tile(flat,'#111',220)+tile(flat,'#fff',220))}
  ${row('gold foil', tile(blk,'#C89B3C',220)+tile(wht,'#111',220))}
  ${row('favicon sizes', tile(flat,'#111',64)+tile(flat,'#111',32)+tile(flat,'#111',16)+tile(grad,'#fff',64)+tile(blk,'#fff',32)+tile(blk,'#fff',16))}
  </body>`;
  writeFileSync(new URL('./previewf.html', import.meta.url), html);
  console.log('ok');
}
