# Design decisions

This file explains every significant choice behind the site: what was chosen, what was ruled out, and the evidence for each. When you want to change something, check here first so the reasoning travels with the change.

## 1. Hosting: a GitHub Pages user site (`nickynine2011-prog.github.io`)

**Chosen:** a public repository named `nickynine2011-prog.github.io` (the original `nikhileshmclaude` repo, renamed), published from the `main` branch root.

**Why:** it is free, needs no build step, and serves over HTTPS with a CDN. A repository with this exact name publishes at the root URL (`https://nickynine2011-prog.github.io/`) rather than a sub-path like `/nikhileshmclaude/`. A shorter URL is easier to type from a CV and looks deliberate.

**Not chosen:**
- *Project site under the old repo name.* This works, but the URL would carry the sub-path `/nikhileshmclaude/`, which is longer and reads like a repository name rather than a person.
- *Netlify, Vercel, Cloudflare Pages.* All are free and good, but each adds a second account and dashboard to maintain. You asked for GitHub.
- *A custom domain such as nikhileshmoosapeta.com.* It is the single biggest upgrade available (about CA$15–25 a year), but you asked to keep everything free. Adding one later takes about ten minutes: buy the domain, add a `CNAME` file, and set DNS. The site needs no other changes.

## 2. Technology: hand-written HTML and CSS, no framework, no JavaScript

**Why:**
- **Longevity.** A static HTML file from 2005 still renders today. Jekyll themes (Academic Pages, al-folio) depend on Ruby gems and plugin versions that break over time. Al-folio v1 now ships as separately versioned plugin gems. For a site meant to last "for life" with little upkeep, zero dependencies is the safest choice.
- **Speed.** No JavaScript means nothing to download, parse or execute. The page is usable the moment the HTML arrives.
- **Robustness.** Nothing can fail to load and leave content hidden.

**Not chosen:** React, Next.js, Astro, Hugo, Jekyll. Each solves problems this site does not have, such as many pages, a blog or dynamic data, and each adds a build pipeline that can break.

## 3. Structure: one page, ordered like a medical CV

**Chosen:** a single scrolling page. The order is introduction, education, clinical experience, research and writing, leadership and mentoring, training, awards, other work, contact. Entries run in reverse chronological order.

**Why:**
- Program directors and recruiters skim. The Ladders eye-tracking study (2018) found an average first look of about 7.4 seconds, concentrated on name, current role, current organization, dates and education, in an F-shaped pattern. The page puts exactly those at the top and the dates in a scannable left column.
- Residency CV guides (AAFP, Blueprint) recommend listing the most recent items first and grouping research, presentations, leadership and honours. The section names follow that convention, so a reader can map the site onto an ERAS or CaRMS application.
- One page means one URL to share, and every section is a single tap away from the top.

**Not chosen:** separate pages for About, CV and Contact. With this amount of content, extra pages only add clicks.

## 4. Writing style: plain, specific, verifiable

**Rules applied:**
- Every claim traces to a source: the LinkedIn export, Med Plus evaluation forms, certificates, or the medical school application notes. Anything that could not be verified was left out. Examples are publication titles that weren't found and exact dates for some shadowing.
- No puffery. Wikipedia's *Signs of AI writing* guide flags phrases like "passionate about", "a testament to", "pivotal role", "delve", "fostering", "journey", stock transitions ("Moreover", "Additionally"), automatic groups of three, and em-dash-heavy sentences. None appear in the copy.
- Use concrete detail over adjectives, for example the Code Yellow in the Niagara Health ED rather than "demonstrated initiative".
- Patient privacy. No patient is identifiable, in line with medical e-professionalism guidance (AMA, Medical Protection, and University of Otago guides for medical students).

## 5. Visual design: typographic, quiet, deliberately not "template"

AI-generated and template sites share a recognizable fingerprint. Design-critique sources list the Inter typeface, purple or indigo gradients, three rounded cards in a row, a centred hero with two buttons, emoji or Lucide icons, glassmorphism and fade-in-on-scroll animations. This site avoids all of them.

**Typeface: Source Serif 4** (Adobe, SIL Open Font License), self-hosted.
- *Why a serif:* research finds no meaningful readability difference between serif and sans-serif on screens (Arditi & Cho 2005 and later reviews), so the choice comes down to tone. Many medical journals and most academic CVs are set in serif type. Using one signals "academic and clinical" rather than "tech start-up".
- *Why Source Serif 4:* it is a free, open-licence family with optical sizes, so the large name and the small body text are each drawn for their size. It is also far less common on the web than Inter, Roboto or Playfair Display.
- *Why self-hosted:* in January 2022 a Munich court ruled that loading Google Fonts from Google's servers sent visitors' IP addresses to Google without consent, breaching GDPR. You study at an Irish university, so European visitors are likely. Self-hosting removes the issue and saves a connection to a third-party server.
- Dates and small labels use the device's own sans-serif font. It costs nothing to load and has tabular figures, so dates line up.

**Colour:** near-black ink on warm off-white paper, with one restrained navy used only for links. Navy is the conventional link colour and a familiar one in clinical and academic settings. Keeping it to links makes it functional rather than decorative. There are no gradients and no second accent colour.

**Dark mode:** follows the device setting automatically through `prefers-color-scheme`, with no toggle. A toggle needs JavaScript and is another control to maintain. Visitors who prefer dark mode have usually already set it on their device, and the site follows that.

**Layout and measure:** body text is 18px (17px on phones). Lines run about 60–75 characters on a desktop, measured in the browser. Readability research puts the optimum at 50–75 characters per line, and WCAG advises no more than 80.

**Photo:** none at launch, because no professional headshot was found. Stanford's web-credibility guidelines advise showing the real person behind a site, and a photo is the most direct way to do that, so a headshot is the top content addition (see README).

**Motion:** none. Scroll-reveal animations hide content until JavaScript runs, can trouble people with vestibular disorders, and are a template cliché.

## 6. Accessibility: WCAG 2.2 AA as the floor

- Colour contrast at least 4.5:1 for all text, in both light and dark modes.
- Links are underlined, not marked by colour alone.
- Visible focus outlines. The header is not sticky, so a focused element is never hidden behind it (WCAG 2.2, 2.4.11 Focus Not Obscured).
- Tap targets at least 24×24 CSS px (2.5.8 Target Size).
- Semantic landmarks, one `h1`, ordered headings, a skip link, `lang="en-CA"`, and real `<time>` elements for dates.
- Checked with axe-core and Lighthouse (see README for the commands).

## 7. Search and sharing

- `schema.org` `ProfilePage` + `Person` JSON-LD, Google's documented format for profile pages. It links the site to LinkedIn (`sameAs`), Brock University (`alumniOf`) and RCSI Bahrain (`affiliation`).
- Open Graph and Twitter-card tags with a 1200×630 preview image. That is the size LinkedIn, Slack, iMessage and X all render as a large card.
- `sitemap.xml`, `robots.txt` and a canonical URL.

## 8. Printable CV

The same page has a print stylesheet. `Nikhilesh-Moosapeta-CV.pdf` is generated from it, so the PDF and the website can never drift apart. Update the HTML, run `tools/build.mjs`, and both are current.

## 9. What was deliberately left out

- **Analytics.** Even free, privacy-friendly analytics adds a third-party script. Revisit if you want visitor counts.
- **Contact form.** A form needs a third-party service (Formspree and similar) and attracts spam. An email link does the job.
- **Skills bars, percentage meters, "soft skills" lists.** Readers can't verify them, and many CV guides advise against them.
- **Grades and test scores.** Share them on request or in applications, not on a public page.
- **Application history, finances, health details.** Private.
