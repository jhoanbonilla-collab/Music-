import { chromium } from 'playwright-core';
import { readFileSync } from 'fs';

const targets = process.argv.slice(2); // pairs: input.html|svg output.png width height
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
for (let i = 0; i < targets.length; i += 4) {
  const input = targets[i];
  const out = targets[i+1];
  const w = parseInt(targets[i+2] || '800');
  const h = parseInt(targets[i+3] || '800');
  await page.setViewportSize({ width: w, height: h });
  const url = 'file://' + input;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: out });
  console.log('rendered', out);
}
await browser.close();
