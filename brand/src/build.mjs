import { writeFileSync } from 'fs';
import { symbol } from './symbol.mjs';
import { wordmark } from './wordmark.mjs';

const root = new URL('../', import.meta.url).pathname; // brand/
const W = (p, s) => { writeFileSync(root + p, s.trim() + '\n'); console.log('wrote', p); };

const svgWidth = s => parseFloat(s.match(/width="([\d.]+)"/)[1]);
const svgHeight = s => parseFloat(s.match(/height="([\d.]+)"/)[1]);

/* ---------- SYMBOL VARIANTS ---------- */
W('symbol/xolosax-symbol-gold.svg',       symbol({ gradient: true,  interlace: true }));
W('symbol/xolosax-symbol-gold-flat.svg',  symbol({ color: '#C89B3C', interlace: true }));
W('symbol/xolosax-symbol-black.svg',      symbol({ color: '#111111', interlace: true }));
W('symbol/xolosax-symbol-white.svg',      symbol({ color: '#FFFFFF', interlace: true }));
// solid (unwoven) — maximal legibility for tiny sizes / engraving
W('symbol/xolosax-symbol-gold-solid.svg', symbol({ color: '#C89B3C', interlace: false }));
W('symbol/xolosax-symbol-black-solid.svg',symbol({ color: '#111111', interlace: false }));

/* ---------- WORDMARK VARIANTS ---------- */
W('wordmark/xolosax-wordmark-black.svg', wordmark({ color: '#111111' }));
W('wordmark/xolosax-wordmark-white.svg', wordmark({ color: '#FFFFFF' }));
W('wordmark/xolosax-wordmark-gold.svg',  wordmark({ color: '#C89B3C' }));

/* ---------- LOCKUPS ---------- */
// strip outer <svg> wrapper to inline content with a transform
function inner(svg) {
  const open = svg.indexOf('>') + 1;
  const close = svg.lastIndexOf('</svg>');
  const vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  return { content: svg.slice(open, close), vbW: vb[2], vbH: vb[3] };
}

function lockupH({ symColor, wordColor, gradient, bg, id }) {
  const sym = symbol({ color: symColor, gradient, interlace: true, id: 'lg' + id });
  const wm = wordmark({ color: wordColor });
  const si = inner(sym), wi = inner(wm);
  const symH = 188, symW = 188;
  const gap = 56;
  const wScale = symH / wi.vbH * 0.86;          // wordmark slightly shorter than symbol box
  const wW = wi.vbW * wScale, wH = wi.vbH * wScale;
  const totalW = symW + gap + wW;
  const H = symH;
  const bgRect = bg ? `<rect width="${(totalW + 120).toFixed(1)}" height="${(H + 120).toFixed(1)}" fill="${bg}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${(totalW + 120).toFixed(1)} ${(H + 120).toFixed(1)}" width="${(totalW + 120).toFixed(1)}" height="${(H + 120).toFixed(1)}" role="img" aria-label="XolosaX">
  ${bgRect}
  <g transform="translate(60,60)">
    <g transform="translate(0,0) scale(${(symH / si.vbH).toFixed(4)})">${si.content}</g>
    <g transform="translate(${(symW + gap).toFixed(1)},${((H - wH) / 2).toFixed(1)}) scale(${wScale.toFixed(4)})">${wi.content}</g>
  </g>
</svg>`;
}

function lockupV({ symColor, wordColor, gradient, bg, id }) {
  const sym = symbol({ color: symColor, gradient, interlace: true, id: 'lgv' + id });
  const wm = wordmark({ color: wordColor });
  const si = inner(sym), wi = inner(wm);
  const symH = 230, symW = 230;
  const gap = 50;
  const wScale = (symW * 1.18) / wi.vbW;          // wordmark a touch wider than symbol
  const wW = wi.vbW * wScale, wH = wi.vbH * wScale;
  const contentW = Math.max(symW, wW);
  const totalH = symH + gap + wH;
  const pad = 70;
  const bgRect = bg ? `<rect width="${(contentW + pad * 2).toFixed(1)}" height="${(totalH + pad * 2).toFixed(1)}" fill="${bg}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${(contentW + pad * 2).toFixed(1)} ${(totalH + pad * 2).toFixed(1)}" width="${(contentW + pad * 2).toFixed(1)}" height="${(totalH + pad * 2).toFixed(1)}" role="img" aria-label="XolosaX">
  ${bgRect}
  <g transform="translate(${pad},${pad})">
    <g transform="translate(${((contentW - symW) / 2).toFixed(1)},0) scale(${(symH / si.vbH).toFixed(4)})">${si.content}</g>
    <g transform="translate(${((contentW - wW) / 2).toFixed(1)},${(symH + gap).toFixed(1)}) scale(${wScale.toFixed(4)})">${wi.content}</g>
  </g>
</svg>`;
}

W('lockup/xolosax-lockup-horizontal-gold-on-dark.svg', lockupH({ gradient: true, wordColor: '#FFFFFF', bg: '#111111', id: 'a' }));
W('lockup/xolosax-lockup-horizontal-dark.svg',          lockupH({ gradient: true, wordColor: '#111111', bg: null, id: 'b' }));
W('lockup/xolosax-lockup-horizontal-mono-black.svg',    lockupH({ symColor: '#111111', wordColor: '#111111', bg: null, id: 'c' }));
W('lockup/xolosax-lockup-horizontal-reversed.svg',      lockupH({ gradient: true, wordColor: '#FFFFFF', bg: null, id: 'br' }));
W('lockup/xolosax-lockup-vertical-gold-on-dark.svg',    lockupV({ gradient: true, wordColor: '#FFFFFF', bg: '#111111', id: 'd' }));
W('lockup/xolosax-lockup-vertical-dark.svg',            lockupV({ gradient: true, wordColor: '#111111', bg: null, id: 'e' }));
W('lockup/xolosax-lockup-vertical-reversed.svg',        lockupV({ gradient: true, wordColor: '#FFFFFF', bg: null, id: 'er' }));
W('lockup/xolosax-lockup-vertical-mono-white.svg',      lockupV({ symColor: '#FFFFFF', wordColor: '#FFFFFF', bg: null, id: 'ew' }));

/* ---------- APP ICON ---------- */
function appIcon() {
  const si = inner(symbol({ gradient: true, interlace: true, id: 'app' }));
  const s = 1024, r = 224; // iOS-ish corner radius
  const scale = 0.62, sz = 512 * scale, off = (s - sz) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}">
  <defs>
    <linearGradient id="bgv" x1="0" y1="0" x2="0" y2="${s}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1a1a1a"/><stop offset="1" stop-color="#0c0c0c"/>
    </linearGradient>
  </defs>
  <rect width="${s}" height="${s}" rx="${r}" ry="${r}" fill="url(#bgv)"/>
  <g transform="translate(${off.toFixed(1)},${off.toFixed(1)}) scale(${scale})">${si.content}</g>
</svg>`;
}
W('app-icon/xolosax-app-icon.svg', appIcon());

/* ---------- FAVICON ---------- */
function favicon() {
  const si = inner(symbol({ color: '#C89B3C', interlace: false, id: 'fav' })); // solid for tiny legibility
  const s = 64, r = 14, scale = 0.74, sz = 512 * scale, off = (s - sz) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}">
  <rect width="${s}" height="${s}" rx="${r}" ry="${r}" fill="#111111"/>
  <g transform="translate(${off.toFixed(2)},${off.toFixed(2)}) scale(${(scale * s / 512).toFixed(4)})">${si.content}</g>
</svg>`;
}
W('favicon/xolosax-favicon.svg', favicon());

console.log('DONE');
