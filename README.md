# nikhileshmclaude

Personal website for Nikhilesh Moosapeta, hosted free on GitHub Pages.

## Structure

- `index.html` is the page content. Edit text here.
- `assets/styles.css` holds colours, fonts and layout. The theme colours are at the top.
- `assets/main.js` handles the dark mode toggle and scroll animations.
- `404.html` is shown for missing pages.

It's plain HTML and CSS, with no build step. Whatever is on `main` is what gets served.

## Publishing (one-time setup)

1. Make the repo public: **Settings → General → Danger Zone → Change visibility**. Free GitHub Pages only works on public repos.
2. Go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, then choose branch `main` and folder `/ (root)`.
3. After a minute the site is live at `https://nickynine2011-prog.github.io/nikhileshmclaude/`.

Each merge to `main` redeploys the site automatically.
