// Custom geometric monoline wordmark "XolosaX" — letterforms constructed as vector paths.
const f = n => (Math.round(n * 100) / 100);
const T = 21;            // monoline stroke weight
const CAP_T = 20, CAP_B = 220;   // cap band (X)
const XT = 72, XB = 220;         // x-height band (o,s,a)
const xh = XB - XT;              // 148
const xr = xh / 2;               // x-height radius
const xc = (XT + XB) / 2;        // x-height center y = 146

// Each glyph: returns {els:[svg path strings using centerlines], adv:width}
function gX() {
  const w = 150;
  return { els: [
    `<path d="M0,${CAP_T} L${w},${CAP_B}"/>`,
    `<path d="M0,${CAP_B} L${w},${CAP_T}"/>`,
  ], adv: w };
}
function gO() {
  const r = xr, cx = r, cy = xc;
  return { els: [
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none"/>`,
  ], adv: 2 * r };
}
function gL() {
  return { els: [ `<path d="M0,${CAP_T} L0,${CAP_B}"/>` ], adv: 0 };
}
function gS() {
  // geometric s built from cubic arcs, x-height band, width ~ 2*xr*0.8
  const w = xr * 1.62;            // ~120
  const cy = xc;
  const r = xr;                  // bowl radius reference
  // centerline path tuned for a balanced geometric s
  const d = [
    `M ${f(w*0.93)},${f(XT + r*0.34)}`,
    `C ${f(w*0.93)},${f(XT + r*0.02)} ${f(w*0.68)},${f(XT)} ${f(w*0.5)},${f(XT)}`,
    `C ${f(w*0.2)},${f(XT)} ${f(0)},${f(XT + r*0.28)} ${f(0)},${f(XT + r*0.55)}`,
    `C ${f(0)},${f(cy - r*0.06)} ${f(w*0.24)},${f(cy)} ${f(w*0.5)},${f(cy)}`,
    `C ${f(w*0.76)},${f(cy)} ${f(w)},${f(cy + r*0.06)} ${f(w)},${f(XB - r*0.55)}`,
    `C ${f(w)},${f(XB - r*0.28)} ${f(w*0.8)},${f(XB)} ${f(w*0.5)},${f(XB)}`,
    `C ${f(w*0.32)},${f(XB)} ${f(w*0.07)},${f(XB - r*0.02)} ${f(w*0.07)},${f(XB - r*0.34)}`,
  ].join(' ');
  return { els: [ `<path d="${d}" fill="none"/>` ], adv: w };
}
function gA() {
  // single-story geometric a: bowl circle + right stem
  const r = xr, cx = r, cy = xc;
  const stemX = 2 * r;           // tangent to bowl's right
  return { els: [
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none"/>`,
    `<path d="M${stemX},${XT} L${stemX},${XB}"/>`,
  ], adv: stemX };
}

const GLY = { X: gX, o: gO, l: gL, s: gS, a: gA };

export function wordmark({ color = '#111111', track = 30, pad = 40 } = {}) {
  const word = 'XolosaX';
  let cursor = 0;
  const parts = [];
  for (const ch of word) {
    const g = GLY[ch]();
    parts.push(`<g transform="translate(${f(cursor)},0)">${g.els.join('')}</g>`);
    cursor += g.adv + track;
  }
  cursor -= track;
  const W = cursor + pad * 2;
  const H = CAP_B + CAP_T + 20; // top pad CAP_T(20) symmetric-ish; total
  const vbH = 260;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(W)} ${vbH}" width="${f(W)}" height="${vbH}" role="img" aria-label="XolosaX">
  <g transform="translate(${pad},0)" fill="none" stroke="${color}" stroke-width="${T}" stroke-linecap="round" stroke-linejoin="round">
    ${parts.join('\n    ')}
  </g></svg>`;
}

if (process.argv[2] === 'preview') {
  const { writeFileSync } = await import('fs');
  const blk = wordmark({ color: '#111111' });
  const gold = wordmark({ color: '#C89B3C' });
  const enc = s => encodeURIComponent(s);
  const html = `<!doctype html><meta charset=utf8><body style="margin:0;background:#2b2b2b;padding:24px;display:flex;flex-direction:column;gap:18px">
   <div style="background:#fff;padding:30px"><img src="data:image/svg+xml,${enc(blk)}" style="width:680px"></div>
   <div style="background:#111;padding:30px"><img src="data:image/svg+xml,${enc(gold)}" style="width:680px"></div>
   <div style="background:#fff;padding:30px"><img src="data:image/svg+xml,${enc(blk)}" style="width:320px"></div>
  </body>`;
  writeFileSync(new URL('./previeww.html', import.meta.url), html);
  console.log('ok');
}
