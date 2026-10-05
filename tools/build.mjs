// Regenerates the files derived from index.html and favicon.svg:
//   Nikhilesh-Moosapeta-CV.pdf   (print stylesheet of index.html)
//   assets/og.png                (1200x630 link-preview image)
//   favicon-32.png, apple-touch-icon.png
//
// Usage (from the repo root):
//   npm install --prefix tools
//   node tools/build.mjs

import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".pdf": "application/pdf",
};

// Serve the repo root over HTTP so the page loads its CSS and fonts as it would online.
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = join(root, path.endsWith("/") ? path + "index.html" : path);
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

// 1. CV PDF from the print stylesheet.
{
  const page = await browser.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  // Reuse the "Updated ..." date from the page footer so the PDF never disagrees with the site.
  const updated = await page.textContent(".colophon time");
  await page.pdf({
    path: join(root, "Nikhilesh-Moosapeta-CV.pdf"),
    format: "Letter",
    preferCSSPageSize: true,
    printBackground: false,
    tagged: true,
    outline: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `<div style="width:100%;padding:0 0.6in;font:7.5pt system-ui,sans-serif;color:#555;display:flex;justify-content:space-between">
      <span>Nikhilesh Moosapeta · CV · Updated ${updated}</span>
      <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
  });
  await page.close();
}

// 2. Link-preview image, set in the site's own type and colours.
{
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.setContent(`<!doctype html>
<html><head><link rel="stylesheet" href="${base}/assets/site.css">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; background: #f7f3ea; color: #17233a; }
  .card { box-sizing: border-box; height: 100%; padding: 88px 104px; display: flex; flex-direction: column; justify-content: space-between; }
  .eyebrow { font: 600 20px/1 system-ui, sans-serif; letter-spacing: 0.14em; text-transform: uppercase; color: #7a5c22; display: flex; align-items: center; gap: 18px; margin: 0 0 30px; }
  .eyebrow::before { content: ""; width: 44px; height: 2px; background: currentColor; }
  .name { font-family: "Source Serif 4", serif; font-weight: 600; font-size: 104px; line-height: 1; letter-spacing: -0.02em; margin: 0; }
  .tag { font-family: "Source Serif 4", serif; font-style: italic; font-size: 40px; color: #7a5c22; margin: 26px 0 0; }
  .foot { display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #ddd4c3; padding-top: 26px;
          font-family: system-ui, sans-serif; font-size: 26px; color: #57606b; }
  .mark { width: 56px; height: 56px; }
</style></head>
<body><div class="card">
  <div><p class="eyebrow">Medical student · RCSI Bahrain</p><p class="name">Nikhilesh Moosapeta</p><p class="tag">Internal medicine, primary care and patient safety.</p></div>
  <div class="foot"><span>nickynine2011-prog.github.io</span><img class="mark" src="${base}/favicon.svg" alt=""></div>
</div></body></html>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(root, "assets/og.png") });
  await page.close();
}

// 3. Raster icons from favicon.svg. The Apple icon is full-bleed because iOS applies its own mask.
for (const [size, file, fullBleed] of [
  [32, "favicon-32.png", false],
  [180, "apple-touch-icon.png", true],
]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  const svg = await readFile(join(root, "favicon.svg"), "utf8");
  const markup = fullBleed ? svg.replace(/rx="\d+"/, 'rx="0"') : svg;
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${markup}`,
  );
  await page.screenshot({ path: join(root, file), omitBackground: !fullBleed });
  await page.close();
}

await browser.close();
server.close();
console.log("Built CV PDF, og.png and icons.");
