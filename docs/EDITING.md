# Resume Page Editing Guide

This document explains how to maintain and customize the root site at:

- `https://zicheng1119.github.io/`

This repo is intentionally simple. The whole site is made of only a few parts:

- `index.html`: page structure and all text content
- `assets/styles.css`: colors, layout, typography, spacing, and responsive behavior
- `.github/workflows/pages.yaml`: automatic deployment to GitHub Pages

If you want to change the resume page, most of the time you only need `index.html` and `assets/styles.css`.

## 1. Repo structure

```text
zicheng1119.github.io/
├── .github/workflows/pages.yaml
├── assets/
│   └── styles.css
├── docs/
│   └── EDITING.md
├── index.html
└── README.md
```

## 2. Daily workflow

### Local preview

From the repo root:

```bash
cd /Users/zhouzicheng/Desktop/zicheng1119.github.io
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173/`

### Publish changes

After editing:

```bash
git add .
git commit -m "Update resume page"
git push
```

GitHub Actions will deploy automatically to:

- `https://zicheng1119.github.io/`

## 3. What to edit for common tasks

### Change your name

Edit these places in `index.html`:

- `<title>...</title>`
- `<h1>...</h1>`
- the text inside the portrait block if you want the initials to change

Current examples:

- `<title>Zicheng Zhou</title>`
- `<h1>Zicheng Zhou</h1>`
- `<div class="portrait-mark">ZZ</div>`

### Change the one-line identity

Edit:

- `<p class="profile-role">...</p>`
- `<p class="profile-affiliation">...</p>`

Use these for things like:

- researcher / engineer / designer
- school / lab / company
- city / remote

### Change email and social links

Edit the links inside:

- `<div class="profile-links">...</div>`

Typical items:

- email
- GitHub
- blog
- LinkedIn
- Google Scholar
- X / Twitter

Example:

```html
<div class="profile-links">
  <a href="mailto:your@email.com">your@email.com</a>
  <a href="https://github.com/your-id" target="_blank" rel="noreferrer">GitHub</a>
  <a href="https://your-blog.example.com/">Blog</a>
</div>
```

### Change the section list on the left

Edit the anchor links inside:

- `<nav class="profile-nav" aria-label="Page sections">...</nav>`

Each link should match a section `id` on the right side.

Example:

```html
<a href="#bio">Short Bio</a>
```

must match:

```html
<section id="bio" class="content-section">
```

If they do not match, the left-side navigation will not scroll to the right section.

## 4. How the page is organized

The page uses two columns:

- left column: identity, links, section navigation
- right column: actual resume content

Main wrapper:

```html
<div class="page-shell">
  <aside class="profile-column">...</aside>
  <main class="content-column">...</main>
</div>
```

If you want to add new content, you will almost always add it inside `<main class="content-column">`.

## 5. How to edit each section

### Intro block

File:

- `index.html`

Block:

```html
<section class="intro-block">...</section>
```

Use this for:

- one short summary of who you are
- a short positioning statement
- one sentence that explains the difference between your homepage and blog

### Short Bio

Block:

```html
<section id="bio" class="content-section">...</section>
```

Use this for:

- background
- research or professional interests
- current focus
- what kind of work you do

Recommended style:

- 2 to 4 short paragraphs
- each paragraph focuses on one idea
- avoid making it read like a full CV

### Updates

Block:

```html
<section id="updates" class="content-section">
  <ul class="news-list">
    <li>...</li>
  </ul>
</section>
```

Each item has two pieces:

- `.news-date`
- `.news-text`

Example:

```html
<li>
  <span class="news-date">2026-05</span>
  <span class="news-text">Started a new project on ...</span>
</li>
```

Good uses:

- accepted paper
- internship
- project launch
- award
- speaking event
- recent update to your work

### Selected Work

Block:

```html
<section id="work" class="content-section">...</section>
```

Each project uses one `.entry`.

Structure:

```html
<article class="entry">
  <div class="entry-meta">Category</div>
  <div class="entry-body">
    <h3>Project name</h3>
    <p>Project description</p>
    <div class="entry-links">
      <a href="...">Visit</a>
      <a href="...">Source</a>
    </div>
  </div>
</article>
```

What to put here:

- products
- papers
- open source projects
- internships
- design case studies
- academic projects

Best practice:

- keep project descriptions to 2 to 4 lines
- lead with outcome, not process
- include a link when possible

### Writing

Block:

```html
<section id="writing" class="content-section">...</section>
```

This is usually a bridge to your blog. You can:

- keep one short paragraph and one link
- add a list of featured essays
- split writing into technical and non-technical groups

### Contact

Block:

```html
<section id="contact" class="content-section">...</section>
```

Good options:

- email
- GitHub
- LinkedIn
- Google Scholar
- CV PDF

If you add external links, keep `target="_blank"` and `rel="noreferrer"` for safety and consistency.

## 6. Add a brand-new section

If you want to add a new section like `Experience`, `Publications`, or `Teaching`, do these two things.

### Step 1: add a nav item on the left

Inside `.profile-nav`:

```html
<a href="#experience">Experience</a>
```

### Step 2: add a matching section on the right

Inside `.content-column`:

```html
<section id="experience" class="content-section">
  <h2>Experience</h2>
  <p>Put your content here.</p>
</section>
```

That is enough for the new section to work.

## 7. Replace the initials block with a real photo

Right now the top visual is:

```html
<div class="portrait-card" aria-hidden="true">
  <div class="portrait-mark">ZZ</div>
</div>
```

If you want a real profile image:

### Step 1: add an image file

Put the file in:

- `assets/portrait.jpg`

or:

- `assets/portrait.png`

### Step 2: replace the block in `index.html`

Use:

```html
<div class="portrait-card">
  <img class="portrait-image" src="./assets/portrait.jpg" alt="Portrait of Your Name">
</div>
```

### Step 3: add image styles in `assets/styles.css`

Add:

```css
.portrait-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

If you want the image to show more face and less crop, adjust `object-fit` or add `object-position`.

## 8. Change colors

All main colors live at the top of `assets/styles.css` under `:root`.

Current variables:

```css
:root {
  --page-bg: #f4f1ea;
  --paper: #fcfbf7;
  --ink: #171717;
  --muted: #666154;
  --line: rgba(23, 23, 23, 0.12);
  --accent: #2b5d94;
  --accent-soft: rgba(43, 93, 148, 0.08);
  --shadow: 0 18px 40px rgba(34, 28, 18, 0.06);
  --max-width: 1160px;
}
```

What they control:

- `--page-bg`: overall page background
- `--paper`: lighter surface tone if you introduce cards or panels later
- `--ink`: primary text color
- `--muted`: secondary text color
- `--line`: borders and separators
- `--accent`: links and highlights
- `--accent-soft`: soft highlight backgrounds
- `--shadow`: box shadows

If you want a different mood:

- warmer academic look: slightly beige background + navy accent
- cleaner minimal look: white background + gray text + dark accent
- more editorial look: cream background + dark brown or forest green accent

## 9. Change fonts

Fonts are loaded in `index.html` here:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Instrument+Sans:wght@400;500;600;700&display=swap">
```

And used in `assets/styles.css` here:

- body uses `"Instrument Sans", sans-serif`
- headings and large text use `"Crimson Text", serif`

If you change fonts:

1. update the Google Fonts URL
2. update the matching `font-family` declarations in CSS

Recommended rule:

- one serif for titles and long-form atmosphere
- one sans-serif for navigation and UI

## 10. Change spacing and page width

The main layout values are in `assets/styles.css`.

Important selectors:

- `.page-shell`
- `.content-section`
- `.intro-block`
- `.entry`

Most useful settings:

- `--max-width`: overall page width
- `grid-template-columns` on `.page-shell`: left-right column ratio
- `gap`: spacing between columns and blocks
- `padding`: section breathing room

Examples:

- make the left column wider:
  - change `.page-shell` from `300px minmax(0, 1fr)` to `340px minmax(0, 1fr)`
- make the page more compact:
  - reduce paddings like `48px`, `34px`, `30px`
- make text area narrower:
  - reduce `max-width` on `.content-section p`

## 11. Mobile adaptation

Responsive rules are at the bottom of `assets/styles.css`:

```css
@media (max-width: 920px) {
  ...
}
```

This section controls:

- when the two-column layout becomes one column
- sticky sidebar behavior
- mobile spacing
- stacked layout for updates and project entries

If something only looks wrong on phone, check this media query first.

## 12. Change or remove specific visual elements

### Remove the sticky left column behavior

In `assets/styles.css`, find:

```css
.profile-sticky {
  position: sticky;
  top: 36px;
}
```

Change it to:

```css
.profile-sticky {
  position: static;
}
```

### Remove the top portrait block entirely

Delete this block from `index.html`:

```html
<div class="portrait-card" aria-hidden="true">
  <div class="portrait-mark">ZZ</div>
</div>
```

Then reduce spacing around `.profile-copy` in CSS if needed.

### Remove the blog link

Delete the blog link from:

- `.profile-links`
- `Writing` section
- footer

## 13. Add a downloadable CV PDF

### Step 1: add the file

Put your file in the repo root or a simple folder, for example:

- `cv.pdf`

### Step 2: link it from `index.html`

Example:

```html
<a href="./cv.pdf" target="_blank" rel="noreferrer">CV</a>
```

Good places:

- `.profile-links`
- `Contact` section

## 14. Add external platforms

Common additions:

- LinkedIn
- Google Scholar
- ORCID
- X / Twitter
- Zhihu
- Bilibili
- Notion

Example:

```html
<a href="https://www.linkedin.com/in/your-id/" target="_blank" rel="noreferrer">LinkedIn</a>
```

## 15. Change the page language

Current page language is:

```html
<html lang="zh-CN">
```

If your whole page becomes English, change it to:

```html
<html lang="en">
```

Then update visible text like:

- `Short Bio`
- `Selected Work`
- `Writing`
- `Contact`

You can also make the whole page Chinese by rewriting the section labels and paragraphs directly in `index.html`.

## 16. SEO and browser metadata

Important metadata at the top of `index.html`:

- `<title>...</title>`
- `<meta name="description" content="...">`

Update them whenever you change your identity or page focus.

Good `description` style:

- one sentence
- 120 to 160 characters
- clearly says who you are and what this page contains

## 17. Deployment workflow

Auto deployment is controlled by:

- `.github/workflows/pages.yaml`

Usually you do not need to edit it.

Only touch it if:

- deployment fails
- you rename the default branch
- you add a build step later

For plain HTML/CSS changes, just `git push`.

## 18. Troubleshooting

### Changes do not appear online

Check:

1. did you `git push`
2. did GitHub Actions finish successfully
3. did you hard refresh the browser
4. did you wait 1 to 3 minutes for Pages cache to refresh

### Left nav link does not work

Check whether:

- `href="#something"` matches
- `<section id="something">`

### Layout suddenly breaks

Common causes:

- missing closing `</div>`, `</section>`, or `</article>`
- changed class names in HTML without updating CSS
- accidental deletion inside the media query block

### Font does not load

Check:

- the Google Fonts URL
- the CSS `font-family` names
- your network access

### A link opens in the same tab but you wanted a new tab

Use:

```html
target="_blank" rel="noreferrer"
```

for external links.

## 19. Recommended editing strategy

If you want to change content only:

- edit `index.html`

If you want to change appearance only:

- edit `assets/styles.css`

If you want to change both:

1. update `index.html`
2. preview locally
3. adjust `assets/styles.css`
4. preview again
5. commit and push

## 20. Safe change checklist

Before pushing, quickly check:

- your name is correct in both `<title>` and `<h1>`
- email and social links are valid
- all left nav links point to existing sections
- no placeholder text remains
- mobile layout still looks reasonable
- blog link still points to `https://zicheng1119.github.io/freeandeasy/` if you want to keep it

## 21. Fastest way to personalize this page

If you only want to turn the current page into a real version as fast as possible, edit these five areas first:

1. `profile-copy`
2. `profile-links`
3. `#bio`
4. `#updates`
5. `#work`

That alone will turn the current skeleton into a real homepage.
