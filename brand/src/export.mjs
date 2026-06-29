import { chromium } from 'playwright-core';
import { readFileSync, mkdirSync } from 'fs';
const base = new URL('../', import.meta.url).pathname;
mkdirSync(base + 'png', { recursive: true });

const jobs = [
  ['symbol/xolosax-symbol-gold.svg',  'png/xolosax-symbol-gold-1024.png',  1024, true],
  ['symbol/xolosax-symbol-black.svg', 'png/xolosax-symbol-black-1024.png', 1024, true],
  ['symbol/xolosax-symbol-white.svg', 'png/xolosax-symbol-white-1024.png', 1024, true],
  ['app-icon/xolosax-app-icon.svg',   'png/xolosax-app-icon-1024.png',     1024, false],
  ['favicon/xolosax-favicon.svg',     'png/xolosax-favicon-180.png',        180, false],
  ['favicon/xolosax-favicon.svg',     'png/xolosax-favicon-32.png',          32, false],
  ['favicon/xolosax-favicon.svg',     'png/xolosax-favicon-16.png',          16, false],
  ['wordmark/xolosax-wordmark-black.svg','png/xolosax-wordmark-black-2048.png',2048, true, true],
  ['wordmark/xolosax-wordmark-white.svg','png/xolosax-wordmark-white-2048.png',2048, true, true],
];

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await b.newPage();
for (const [src, out, size, transparent, isWide] of jobs) {
  const svg = readFileSync(base + src, 'utf8');
  const enc = encodeURIComponent(svg);
  const w = isWide ? size : size, h = isWide ? Math.round(size * 260 / (svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)/)[1] / svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)/)[2])) : size;
  // simpler: compute aspect from viewBox
  const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const aw = parseFloat(vb[1]), ah = parseFloat(vb[2]);
  const W = size, H = Math.round(size * ah / aw);
  await page.setViewportSize({ width: W, height: H });
  await page.setContent(`<body style="margin:0">${`<img src="data:image/svg+xml,${enc}" style="width:${W}px;height:${H}px;display:block">`}</body>`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: base + out, omitBackground: transparent });
  console.log('png', out, `${W}x${H}`);
}
// README banner: vertical lockup on dark, padded
{
  const svg = readFileSync(base + 'lockup/xolosax-lockup-vertical-gold-on-dark.svg', 'utf8');
  const enc = encodeURIComponent(svg);
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(`<body style="margin:0;background:radial-gradient(120% 90% at 50% 8%,#1b1814,#111111 55%);display:flex;align-items:center;justify-content:center;height:630px">
    <img src="data:image/svg+xml,${enc}" style="height:440px">
    </body>`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: base + 'png/xolosax-banner.png' });
  console.log('png banner 1200x630');
}
await b.close();
