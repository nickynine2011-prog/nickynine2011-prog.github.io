// Runs axe-core (WCAG 2.2 AA rules) against index.html and 404.html
// in both light and dark colour schemes, then checks the side index when
// scrolled to the bottom. Exits non-zero on any failure.
//
// Usage (from the repo root, after `npm install --prefix tools`):
//   node tools/audit.mjs
// HTML validation:
//   npx --prefix tools html-validate index.html 404.html

import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const require = createRequire(import.meta.url);
const axeSource = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".png": "image/png" };

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

const browser = await chromium.launch();
let failures = 0;

for (const path of ["/", "/404.html"]) {
  for (const colorScheme of ["light", "dark"]) {
    for (const width of [1280, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme });
      await page.goto(base + path, { waitUntil: "networkidle" });
      await page.addScriptTag({ content: axeSource });
      const result = await page.evaluate(() =>
        window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
        }),
      );
      const label = `${path} ${colorScheme} ${width}px`;
      if (result.violations.length) {
        failures += result.violations.length;
        for (const v of result.violations) {
          console.log(`FAIL ${label}: ${v.id} (${v.impact}) ${v.help}`);
          for (const n of v.nodes.slice(0, 5)) console.log("   ", n.target.join(" "), n.failureSummary?.split("\n")[1] ?? "");
        }
      } else {
        console.log(`pass ${label}: ${result.passes.length} rules passed, ${result.incomplete.length} need manual review${result.incomplete.length ? " (" + result.incomplete.map(i => i.id + ": " + i.nodes.map(n => n.target.join(" ")).slice(0, 3).join(", ")).join("; ") + ")" : ""}`);
      }
      await page.close();
    }
  }
}

// The side index only appears on wide screens and moves as the page scrolls,
// so check it scrolled to the bottom as well: it must stop above the contact
// band and mark Contact as the current section.
for (const colorScheme of ["light", "dark"]) {
  for (const [width, height] of [[1366, 768], [1440, 900], [1920, 1080], [2560, 1440]]) {
    const page = await browser.newPage({ viewport: { width, height }, colorScheme });
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.waitForTimeout(200);
    const { railBottom, footerTop, current } = await page.evaluate(() => ({
      railBottom: document.querySelector(".toc ol").getBoundingClientRect().bottom,
      footerTop: document.querySelector(".closing").getBoundingClientRect().top,
      current: document.querySelector(".toc a[aria-current]")?.textContent ?? null,
    }));
    const label = `side index ${colorScheme} ${width}x${height} at bottom`;
    if (railBottom > footerTop || current !== "Contact") {
      failures += 1;
      console.log(`FAIL ${label}: rail bottom ${Math.round(railBottom)}, footer top ${Math.round(footerTop)}, current ${current}`);
    } else {
      console.log(`pass ${label}: clear of the footer, Contact current`);
    }
    await page.close();
  }
}

await browser.close();
server.close();
process.exit(failures ? 1 : 0);
