# Nikhilesh Moosapeta: personal site

Live at **https://nickynine2011-prog.github.io/**

A single-page professional portfolio and CV. It is plain HTML and CSS with no framework and no build step for the page itself, plus one tiny optional script. GitHub Pages serves the files exactly as they are in the `main` branch.

The reasoning behind every design choice, with sources, is in [DECISIONS.md](DECISIONS.md).

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site: content, metadata, structured data. Edit text here. |
| `assets/site.css` | All styling, including dark mode and the print/PDF layout. Colours and the type scale are the variables at the top. |
| `assets/site.js` | Optional, about 1 KB: highlights the current section in the side index. |
| `assets/fonts/` | Self-hosted Source Serif 4 (SIL Open Font License, see `OFL.txt`). |
| `Nikhilesh-Moosapeta-CV.pdf` | Generated from `index.html`. Don't edit by hand. |
| `assets/og.png`, `favicon-32.png`, `apple-touch-icon.png` | Generated preview image and icons. |
| `favicon.svg` | Monogram icon, drawn from the Source Serif 4 outlines. |
| `404.html`, `robots.txt`, `sitemap.xml` | Standard site files. |
| `tools/` | Build and audit scripts. Not part of the page. |

## Editing

1. Change the text in `index.html`. Each entry looks like this:

   ```html
   <article class="entry">
     <p class="when"><time datetime="2024-10">Oct 2024</time> – <time datetime="2025-08">Aug 2025</time></p>
     <div class="what">
       <h3>Role</h3>
       <p class="where">Organization, City</p>
       <p>One or two sentences, or a <ul> of bullet points.</p>
     </div>
   </article>
   ```

2. Update the "Updated" date in the footer, the `dateModified` in the JSON-LD block, and `<lastmod>` in `sitemap.xml`.
3. Regenerate the PDF and images, then run the checks:

   ```sh
   npm install --prefix tools
   npx --prefix tools playwright install chromium   # first time only
   node tools/build.mjs
   node tools/audit.mjs
   npx --prefix tools html-validate index.html 404.html
   ```

4. Commit and push to `main`. The site updates within a minute or two.

The editing rules used so far: write in plain first person, state facts that can be checked against a record, prefer one concrete detail to three adjectives, and never describe an individual patient encounter. Dates in the left column use spaced en dashes (`2020 – 2023`); ranges inside running text use closed ones (`2021–22`).

## Quality checks (October 2026)

- Lighthouse: Accessibility 100, Best Practices 100, SEO 100 on mobile and desktop. Performance 100 on desktop and 98 on mobile (largest paint 2.3 s on a simulated slow phone connection, inside Google's 2.5 s "good" band).
- axe-core with WCAG 2.0/2.1/2.2 A and AA rules: no violations, in light and dark mode, at desktop and phone widths. The only "manual review" items are the letters in the decorative eye-chart picture, which is hidden from assistive technology.
- Side index, scrolled to the bottom at 1366, 1440, 1920 and 2560 px wide in both modes: stops above the contact band and marks Contact as current.
- html-validate (recommended rules): no errors.
- CV PDF: 2 pages, clickable contact links, a name and page-number footer, clean copied text.
- Total page weight about 210 KB, mostly the two self-hosted font files. No third-party requests.
