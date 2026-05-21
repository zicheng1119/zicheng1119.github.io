# Resume Page Editing Guide

This document explains how to maintain and customize the root site at:

- `https://zicheng1119.github.io/`

This repo is intentionally simple. The whole site is made of only a few parts:

- `editable/site-data.js`: the main content source you should edit first
- `editable/overrides.css`: your personal CSS override file
- `index.html`: page structure and render shell
- `assets/styles.css`: base colors, layout, typography, spacing, and responsive behavior
- `assets/render.js`: turns `editable/site-data.js` into the visible page
- `.github/workflows/pages.yaml`: automatic deployment to GitHub Pages

If you want to change the resume page, most of the time you only need files inside `editable/`.

## 1. Repo structure

```text
zicheng1119.github.io/
├── .github/workflows/pages.yaml
├── assets/
│   ├── render.js
│   └── styles.css
├── docs/
│   └── EDITING.md
├── editable/
│   ├── images/
│   │   └── README.md
│   ├── overrides.css
│   ├── README.md
│   └── site-data.js
├── index.html
└── README.md
```

## 1.1 Where you should edit now

Use this order:

1. `editable/site-data.js`
2. `editable/overrides.css`
3. `assets/styles.css`
4. `index.html`

In normal use, you should rarely need step 3 or step 4.

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

Edit these places in `editable/site-data.js`:

- `meta.title`
- `profile.name`
- `profile.initials`

Current examples:

- `title: "Zicheng Zhou"`
- `name: "Zicheng Zhou"`
- `initials: "ZZ"`

### Change the one-line identity

Edit:

- `profile.role`
- `profile.affiliation`

Use these for things like:

- researcher / engineer / designer
- school / lab / company
- city / remote

### Change email and social links

Edit the links inside:

- `links: []`

Typical items:

- email
- GitHub
- blog
- LinkedIn
- Google Scholar
- X / Twitter

Example:

```js
links: [
  { label: "your@email.com", href: "mailto:your@email.com", external: false },
  { label: "GitHub", href: "https://github.com/your-id", external: true },
  { label: "Blog", href: "https://your-blog.example.com/", external: false }
]
```

### Change the section list on the left

Edit the section list inside:

- `nav: []`

Each link should match a section `id` on the right side.

Example:

```js
nav: [
  { id: "bio", label: "Short Bio" }
]
```

must match a section in:

```js
sections: [
  { type: "bio", id: "bio", title: "Short Bio", paragraphs: [...] }
]
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

If you want to add new content, you will almost always add it inside `editable/site-data.js`.

## 5. How to edit each section

### Intro block

File:

- `editable/site-data.js`

Block:

- `intro`

Use this for:

- one short summary of who you are
- a short positioning statement
- one sentence that explains the difference between your homepage and blog

### Short Bio

Block:

- `sections` item with `type: "bio"`

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

- `sections` item with `type: "updates"`

Each item has two pieces:

- `.news-date`
- `.news-text`

Example:

```js
items: [
  { date: "2026-05", text: "Started a new project on ..." }
]
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

- `sections` item with `type: "work"`

Each project uses one `items` entry.

Structure:

```js
{
  meta: "Category",
  title: "Project name",
  description: "Project description",
  links: [
    { label: "Visit", href: "https://example.com", external: true },
    { label: "Source", href: "https://github.com/example", external: true }
  ]
}
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

- `sections` item with `type: "text"` and `id: "writing"`

This is usually a bridge to your blog. You can:

- keep one short paragraph and one link
- add a list of featured essays
- split writing into technical and non-technical groups

### Contact

Block:

- `sections` item with `type: "text"` and `id: "contact"`

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

Inside `nav`:

```js
{ id: "experience", label: "Experience" }
```

### Step 2: add a matching section on the right

Inside `sections`:

```js
{
  type: "text",
  id: "experience",
  title: "Experience",
  paragraphs: ["Put your content here."]
}
```

That is enough for the new section to work.

## 7. Replace the initials block with a real photo

Right now the top visual is controlled by:

```js
profile: {
  initials: "ZZ"
}
```

If you want a real profile image:

### Step 1: add an image file

Put the file in:

- `editable/images/portrait.jpg`

or:

- `editable/images/portrait.png`

### Step 2: uncomment the `photo` block in `editable/site-data.js`

Use:

```js
photo: {
  src: "./editable/images/portrait.jpg",
  alt: "Portrait of Your Name"
}
```

### Step 3: preview and adjust if needed

If you want the image to show more face and less crop, adjust `.portrait-image` in `assets/styles.css` or add an override in `editable/overrides.css`.

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

Important metadata now mainly lives in `editable/site-data.js`:

- `meta.title`
- `meta.description`

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

- edit `editable/site-data.js`

If you want to change appearance only:

- edit `editable/overrides.css`
- or edit `assets/styles.css` for base styles

If you want to change both:

1. update `editable/site-data.js`
2. preview locally
3. adjust `editable/overrides.css`
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

1. `profile`
2. `links`
3. `sections[0]` for bio
4. `sections[1]` for updates
5. `sections[2]` for work

That alone will turn the current skeleton into a real homepage.
