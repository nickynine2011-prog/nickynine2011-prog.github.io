# Nikhilesh Moosapeta: personal site

Intended address: **https://nickynine2011-prog.github.io/** (not published yet; see the hosting steps in DECISIONS.md, section 1).

A single-page professional portfolio and CV. It is plain HTML and CSS with no framework, no JavaScript and no build step for the page itself. GitHub Pages serves the files exactly as they are in the `main` branch.

The reasoning behind every design choice, with sources, is in [DECISIONS.md](DECISIONS.md).

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site: content, metadata, structured data. Edit text here. |
| `assets/site.css` | All styling, including dark mode and the print/PDF layout. Colours are the variables at the top. |
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
       <p class="where">Organisation, City</p>
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

The editing rules used so far: write in plain first person, state facts that can be checked, prefer one concrete detail to three adjectives, and never include anything that could identify a patient.

## Quality checks at launch (October 2026)

- Lighthouse, mobile and desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100.
- axe-core with WCAG 2.0/2.1/2.2 A and AA rules: no violations, light and dark, desktop and phone widths.
- html-validate (recommended rules): no errors.
- Total page weight about 144 KB. No third-party requests.

## Worth adding next

These are listed in order of impact.

1. **A professional headshot.** Real photos increase trust (Stanford Web Credibility Project). Add `assets/headshot.jpg`, about 600×600, and place it in the masthead.
2. **Research details.** The poster's title, authors, venue and year, in standard citation format. Add any publication with its DOI.
3. **A custom domain**, for example `nikhileshmoosapeta.com`, about CA$15–25 a year. Add a `CNAME` file containing the domain, point the DNS at GitHub Pages, and replace `nickynine2011-prog.github.io` in `index.html`, `robots.txt`, `sitemap.xml` and `tools/build.mjs`.
4. **Exact dates** for the Rymal Gage shadowing, SNAP volunteering and St. Joseph's volunteering.
5. **RCSI Bahrain activities**: societies, the Surgical Society suturing course, any committee roles, as they happen.
