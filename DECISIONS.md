# Design decisions

This file explains every significant choice behind the site: what was chosen, what was ruled out, and the evidence for each. When you want to change something, check here first so the reasoning travels with the change.

## 1. Hosting: a GitHub Pages user site (`nickynine2011-prog.github.io`)

**Chosen:** a public repository named `nickynine2011-prog.github.io` (the original `nikhileshmclaude` repo, renamed), published from the `main` branch root.

**Why:** it is free, needs no build step, and serves over HTTPS with a CDN. A repository with this exact name publishes at the root URL (`https://nickynine2011-prog.github.io/`) rather than a sub-path like `/nikhileshmclaude/`. A shorter URL is easier to type from a CV and looks deliberate.

**Not chosen:**
- *Project site under the old repo name.* This works, but the URL would carry the sub-path `/nikhileshmclaude/`, which is longer and reads like a repository name rather than a person.
- *Netlify, Vercel, Cloudflare Pages.* All are free and good, but each adds a second account and dashboard to maintain. You asked for GitHub.
- *A custom domain such as nikhileshmoosapeta.com.* It is the single biggest upgrade available (about CA$15–25 a year), but you asked to keep everything free. Adding one later takes about ten minutes: buy the domain, add a `CNAME` file, and set DNS. The site needs no other changes.

## 2. Technology: hand-written HTML and CSS, no framework, almost no JavaScript

**Why:**
- **Longevity.** A static HTML file from 2005 still renders today. Jekyll themes (Academic Pages, al-folio) depend on Ruby gems and plugin versions that break over time. Al-folio v1 now ships as separately versioned plugin gems. For a site meant to last "for life" with little upkeep, zero dependencies is the safest choice.
- **Speed.** The page is usable the moment the HTML arrives.
- **Robustness.** Nothing can fail to load and leave content hidden. The only script (`assets/site.js`, under 1 KB) highlights the current section in the side index. Without it the page loses nothing but that highlight.

**Not chosen:** React, Next.js, Astro, Hugo, Jekyll. Each solves problems this site does not have, such as many pages, a blog or dynamic data, and each adds a build pipeline that can break.

## 3. Structure: one page, ordered like a medical CV

**Chosen:** a single scrolling page. The order is hero (identity, focus, links and an "At a glance" panel), clinical experience, research and writing, leadership/teaching/service, education, training and awards, contact. Entries run in reverse chronological order. Education comes after the experience sections because the hero and panel already state it in the first screen.

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

**Colour:** navy ink on warm paper, navy links, and one bronze accent used only for labels, section numerals and the tagline. The research found this formula (warm neutral ground, dark ink, exactly one accent) on most of the polished medical and academic sites reviewed. Every text colour pair is at least 5:1 contrast in both light and dark modes. There are no gradients.

**Dark mode:** follows the device setting automatically through `prefers-color-scheme`, with no toggle. The palette is re-tuned rather than inverted: a deep blue-black ground, warm off-white text, and a lighter gold accent. A toggle is another control to maintain, and visitors who prefer dark mode have usually already set it on their device.

**Layout and measure:** body text is 18px (17px on phones). Lines run about 60–75 characters on a desktop, measured in the browser. Readability research puts the optimum at 50–75 characters per line, and WCAG advises no more than 80.

**Photo:** none at launch, because no professional headshot was found. Stanford's web-credibility guidelines advise showing the real person behind a site, and a photo is the most direct way to do that, so a headshot is the top content addition (see README).

**Motion:** almost none. Links ease their colour on hover (0.14 s), turned off for people who ask for reduced motion. There are no scroll-reveal animations: they hide content until JavaScript runs, can trouble people with vestibular disorders, and are a template cliché.

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

## 10. October 2026 redesign: from typographic CV to portfolio

The first version was accurate and fast, but next to real medical and academic sites it read as a plain list. A research sweep before this redesign catalogued **353 sites** (medical students, residents, physician-scientists, professors and labs, academic templates, design-award portfolios). It rendered and inspected **177** of them from their source. The patterns that recur on the strongest sites, and what this site now does about each:

| Pattern seen on strong sites | How often | What this site does |
|---|---|---|
| Identity in the first screen: small role label, large name, one-line focus, short bio, link row | Nearly universal (11+ physician sites, 9+ templates, 10 medical students) | Hero with an eyebrow, name, italic focus line, two short paragraphs, and Email · LinkedIn · CV links |
| A real headshot near the name | 13 physician sites, 8 templates | Not yet: no professional photo exists. An "At a glance" panel holds the space and can sit under a photo later |
| Quick-facts panel (stage, location, focus) | 5 content-strategy examples | "At a glance" panel: now, before, clinical, research, from |
| Numbered sections with a small label and hairline rule | 6 physician sites, 9 student sites | Roman-numeral labels (I–VI) over each section heading |
| Sticky in-page index on long one-pagers | 8 student sites | A fixed side index on wide screens with the current section highlighted. Below that width it is an ordinary row of links |
| Selected work with a picture for each item | 5 design-showcase examples, 6 physician sites | Research and writing shown as two featured items, each with a drawn thumbnail (an eye-chart motif for the vision-screening poster, a magazine page for the article) |
| Alternating tonal bands for rhythm | 5–6 examples | The research section sits on a full-width sand band. The contact section closes the page on navy |
| A closing "Get in touch" with who should write and why | 5 physician sites | Large closing heading, one sentence on who should write, and the email set large |
| Freshness signals | 7 student sites | "Updated October 2026" in the colophon; the CV PDF footer carries the same date |

**Deliberately not adopted:** stat tiles of big numbers (it is too early in training for counts not to look padded), keyword chips (they repeat the tagline), testimonials (inappropriate for a student), dark-mode toggles and scroll animations (see section 5), and any clinical imagery (privacy).

**Facts corrected during the redesign** by checking emails, certificates and evaluations directly: St. Joseph's roles were Patient Comfort, Hemodialysis and the Rehab Lunch Program (not palliative care, per the hospital's volunteer coordinator, June 2024). The MRT Club roles are now shown by year (member, executive, then vice-president in 2022–23). The shadowing is now dated (Feb–Jun 2024) and includes the West Haldimand ED days. Niagara Children's Centre (2019–20) was added. The poster now carries its real title and venue.
