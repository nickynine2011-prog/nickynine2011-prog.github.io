# Design decisions

This file explains every significant choice behind the site: what was chosen, what was ruled out, and the evidence for each. Check here before changing something, so the reasoning travels with the change.

## 1. Hosting: a GitHub Pages user site (`nickynine2011-prog.github.io`)

**Chosen:** a public repository named `nickynine2011-prog.github.io`, published from the `main` branch root.

**Why:** it is free, needs no build step, and serves over HTTPS with a CDN. A repository with this exact name publishes at the root URL (`https://nickynine2011-prog.github.io/`) rather than a sub-path. A shorter URL is easier to type from a CV and looks deliberate.

**Not chosen:**
- *A project site under another repository name.* This works, but the URL carries a sub-path that reads like a repository name rather than a person.
- *Netlify, Vercel, Cloudflare Pages.* All are free and good, but each adds a second account and dashboard to maintain. The brief was GitHub.
- *A custom domain such as nikhileshmoosapeta.com.* It is the single biggest upgrade available (about CA$15–25 a year), but the brief was to keep everything free. Adding one later takes about ten minutes: buy the domain, add a `CNAME` file, and set DNS.

Every file in the repository is served, including this one. `robots.txt` asks search engines not to index `DECISIONS.md`, `README.md` and `tools/`.

## 2. Technology: hand-written HTML and CSS, no framework, almost no JavaScript

**Why:**
- **Longevity.** A static HTML file from 2005 still renders today. Jekyll themes (Academic Pages, al-folio) depend on Ruby gems and plugin versions that break over time. For a site meant to last with little upkeep, zero dependencies is the safest choice.
- **Speed.** The page is usable the moment the HTML arrives.
- **Robustness.** Nothing can fail to load and leave content hidden. The only script (`assets/site.js`, about 1 KB) highlights the current section in the side index. Without it the page loses nothing but that highlight.

**Not chosen:** React, Next.js, Astro, Hugo, Jekyll. Each solves problems this site does not have, such as many pages, a blog or dynamic data, and each adds a build pipeline that can break.

## 3. Structure: one page, ordered like a medical CV

**Chosen:** a single scrolling page. The order is hero (identity, interests, links and an "At a glance" panel), education, healthcare experience, research and writing, leadership/service/work, training and awards, contact. Entries run in reverse chronological order.

**Why:**
- Program directors and recruiters skim. The Ladders eye-tracking study (2018) found an average first look of about 7.4 seconds, concentrated on name, current role, current organization, dates and education. The page puts exactly those at the top and the dates in a scannable left column.
- Education comes first, as in the AMA and CaRMS CV order. This matters most for the PDF, which hides the hero panel: without it, education would not appear until page 2.
- Residency CV guides (AAFP, Blueprint) recommend listing the most recent items first and grouping research, presentations, leadership and honours. The section names follow that convention, so a reader can map the site onto an ERAS or CaRMS application.
- "Healthcare experience" rather than "Clinical experience". To a program director, "clinical" means clerkship. Front-desk work, shadowing and volunteering are healthcare experience, and AMCAS keeps shadowing separate from clinical work for the same reason.
- High-school items are mostly left out, as Canadian residency CV guides advise. The exceptions are the three years of hospital volunteering and a community service award, which show long-term commitment.
- One page means one URL to share, and every section is a single tap away from the top.

**Not chosen:** separate pages for About, CV and Contact. With this amount of content, extra pages only add clicks.

## 4. Writing style: plain, specific, verifiable

**Rules applied:**
- Every claim traces to a primary record: signed Med Plus hours forms and evaluations, the physician observation timesheet, certificates, supervisors' emails, the poster file, the published article and the LinkedIn export. Anything that could not be checked was left out.
- Claims match the record exactly. A virtual program is called virtual. Shadowing is called shadowing, and the activities observed are not written as if they were performed. Dates come from the signed forms, not memory.
- No puffery. Wikipedia's *Signs of AI writing* guide flags phrases like "passionate about", "a testament to", "pivotal role", "delve", "fostering", "journey", stock transitions ("Moreover", "Additionally"), automatic groups of three, and em-dash-heavy sentences. None appear in the copy.
- Concrete detail over adjectives: "151 hours over 35 sessions" rather than "extensive shadowing".
- Patient privacy. The site describes no individual patient encounter, even de-identified. Canadian learner guidance (the CFMS guide hosted by the CMA, and the University of Calgary PGME social media standard) treats a post as identifiable if the patient alone could recognize it, and lists hospital names and unique circumstances as identifiers.
- The contact section says plainly that a medical student can't give medical advice, as online-professionalism guidance for learners expects.

## 5. Visual design: typographic, quiet, deliberately not "template"

AI-generated and template sites share a recognizable fingerprint. Design-critique sources list the Inter typeface, purple or indigo gradients, three rounded cards in a row, a centred hero with two buttons, emoji or Lucide icons, glassmorphism and fade-in-on-scroll animations. This site avoids all of them.

It also avoids looking like any one real site. An earlier draft borrowed three signature moves from a medical student's portfolio seen during research: a dash before the role label, an italic gold tagline, and roman-numeral section labels in a side rail. Together they made the page read as a reskin. They were replaced with a plain role label, an upright grey interests line, and section labels that give the years each section covers.

**Typeface: Source Serif 4** (Adobe, SIL Open Font License), self-hosted.
- *Why a serif:* research finds no meaningful readability difference between serif and sans-serif on screens (Arditi & Cho 2005 and later reviews), so the choice comes down to tone. Many medical journals and most academic CVs are set in serif type.
- *Why Source Serif 4:* it is a free, open-licence family with optical sizes, so the large name and the small body text are each drawn for their size. It is also far less common on the web than Inter, Roboto or Playfair Display.
- *Why self-hosted:* in January 2022 a Munich court ruled that loading Google Fonts from Google's servers sent visitors' IP addresses to Google without consent, breaching GDPR. RCSI is an Irish institution, so European visitors are likely. Self-hosting removes the issue and saves a connection to a third-party server.
- On screen, dates and small labels use the device's own sans-serif font, which costs nothing to load and has tabular figures. The PDF uses Source Serif 4 throughout, so it looks the same whichever machine builds it.

**Colour:** navy ink on warm paper, navy links, and one bronze accent used only for small labels and markers. The research found this formula (warm neutral ground, dark ink, exactly one accent) on most of the polished medical and academic sites reviewed. Every text colour pair is at least 4.5:1 contrast in both light and dark modes. There are no gradients.

**Dark mode:** follows the device setting automatically through `prefers-color-scheme`, with no toggle. The palette is re-tuned rather than inverted. In dark mode the contact band gets a thin gold top edge, because navy on a near-black page would otherwise disappear.

**Layout and measure:** body text is 18px (17px on phones). Lines run about 60–75 characters on a desktop. Readability research puts the optimum at 50–75 characters per line, and WCAG advises no more than 80. The date column is wide enough for the longest range to sit on one line.

**Photo:** none yet, because no professional headshot exists. Stanford's web-credibility guidelines advise showing the real person behind a site, so a headshot is the top content addition.

**Motion:** almost none. Links ease their colour on hover (0.14 s), turned off for people who ask for reduced motion. There are no scroll-reveal animations: they hide content until JavaScript runs, can trouble people with vestibular disorders, and are a template cliché.

## 6. Accessibility: WCAG 2.2 AA as the floor

- Colour contrast at least 4.5:1 for all text, in both light and dark modes.
- Links are underlined, not marked by colour alone. The current item in the section index is marked by weight and a line as well as colour, so it still shows in Windows high-contrast mode.
- Visible focus outlines. The header is not sticky, so a focused element is never hidden behind it (2.4.11 Focus Not Obscured). The side index on wide screens stops at the end of the main content, so it never sits over the dark contact band where its text would lose contrast.
- Tap targets at least 24×24 CSS px (2.5.8 Target Size).
- Semantic landmarks, one `h1`, ordered headings, a skip link, `lang="en-CA"`, and real `<time>` elements for dates.
- Checked with axe-core, html-validate and Lighthouse. `tools/audit.mjs` also scrolls to the bottom at four desktop sizes and fails if the side index overlaps the contact band or marks the wrong section.

## 7. Search and sharing

- `schema.org` `ProfilePage` + `Person` JSON-LD, Google's documented format for profile pages. It links the site to LinkedIn (`sameAs`), Brock University (`alumniOf`) and RCSI Bahrain (`affiliation`). `alternateName` connects "Nik Moosapeta", the name on the poster, to the site.
- The structured data lists awards but no `knowsAbout` topics, which would claim expertise a student does not yet have.
- Open Graph and Twitter-card tags with a 1200×630 preview image, the size LinkedIn, Slack, iMessage and X render as a large card.
- `sitemap.xml`, `robots.txt` and a canonical URL. The meta description stays under 160 characters so search results don't cut it off.

## 8. Printable CV

The same page has a print stylesheet. `Nikhilesh-Moosapeta-CV.pdf` is generated from it, so the PDF and the website can never drift apart. Update the HTML, run `tools/build.mjs`, and both are current.

- Two pages, US Letter, with a name, "Updated" date and page number in the footer.
- The email, LinkedIn and website in the header are clickable links.
- Separators between items and their issuers are real characters, and labels are not letter-spaced, so text copied from the PDF (or read by an applicant-tracking system) comes out clean.

## 9. What was deliberately left out

- **Elective requests.** Canadians studying abroad can apply for Canadian visiting electives through the AFMC portal only in their final two years, and VSLO Global accepts only final-year students. Until then the page asks for research projects, which are realistic now.
- **Analytics.** Even free, privacy-friendly analytics adds a third-party script.
- **Contact form.** A form needs a third-party service and attracts spam. An email link does the job.
- **Skills bars, percentage meters, "soft skills" lists.** Readers can't verify them, and many CV guides advise against them.
- **Grades and test scores.** Share them on request or in applications, not on a public page.
- **Routine high-school distinctions and short high-school roles.** See section 3.
- **Application history, finances, health details.** Private.

## 10. October 2026 redesign: from typographic CV to portfolio

The first version was accurate and fast, but next to real medical and academic sites it read as a plain list. A research sweep before this redesign catalogued **353 sites** (medical students, residents, physician-scientists, professors and labs, academic templates, design-award portfolios). It rendered and inspected **177** of them from their source. The patterns that recur on the strongest sites, and what this site does about each:

| Pattern seen on strong sites | How often | What this site does |
|---|---|---|
| Identity in the first screen: small role label, large name, one-line focus, short bio, link row | Nearly universal (11+ physician sites, 9+ templates, 10 medical students) | Hero with a role label, name, interests line, two short paragraphs, and Email · LinkedIn · CV links |
| A real headshot near the name | 13 physician sites, 8 templates | Not yet: no professional photo exists. The "At a glance" panel holds the space and can sit under a photo later |
| Quick-facts panel (stage, location, focus) | 5 content-strategy examples | "At a glance" panel: now, before, healthcare, research |
| A small label and hairline rule over each section heading | 6 physician sites, 9 student sites | Each label gives the years the section covers, so it adds information rather than repeating the heading |
| Sticky in-page index on long one-pagers | 8 student sites | A side index on wide screens that follows the reader and highlights the current section. Below that width it is an ordinary row of links |
| Selected work with a picture for each item | 5 design-showcase examples, 6 physician sites | Research and writing shown as two featured items side by side, each with a drawn picture (an eye chart for the vision-screening poster, a magazine page for the article) |
| Alternating tonal bands for rhythm | 5–6 examples | The research section sits on a full-width sand band. The contact section closes the page on navy |
| A closing "Get in touch" with who should write and why | 5 physician sites | Closing heading, one sentence on what to write about, and the email set large |
| Freshness signals | 7 student sites | "Updated October 2026" in the colophon; the CV PDF footer carries the same date |

**Deliberately not adopted:** stat tiles of big numbers (it is too early in training for counts not to look padded), keyword chips (they repeat the interests line), testimonials (inappropriate for a student), dark-mode toggles and scroll animations (see section 5), and any clinical imagery (privacy).

**Facts checked against primary records during the redesign:** St. Joseph's roles and dates (signed hours form and the volunteer coordinator); the shadowing hours (timesheet: 151 hours over 35 sessions, Feb–Jun 2024); the MRT Club roles by year (Med Plus evaluations and the club's ratification form); Ability Online, SNAP and Niagara Children's Centre dates (Med Plus trackers); the LDANR tutoring dates (confirmed by the coordinator); the poster's title, authors, venue and what the team did (the poster file and project emails); the article's content and issue (the final draft and the editor's email); the First Aid certificate wording and expiry; and the summer 2026 observership in Hyderabad (the owner's own talk notes and travel records).
