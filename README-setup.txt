# Snehal Tanwar portfolio — GitHub Pages + Pages CMS

## Files in this repository
- `index.html` — the site. It bundles the React application plus the original
  cinematic dark/light theme.
- `projects.json` — all portfolio projects (the only place projects are defined).
- `.pages.yml` — Pages CMS editor configuration.
- `media/` — thumbnails uploaded through Pages CMS.
- `css/theme-light.css` — the warm editorial light theme (scoped to
  `html[data-theme="light"]`).
- `css/theme.css` — theme tokens, the five-category cards, the category view,
  the theme toggle, the enquiry form and the contrast fixes.
- `js/app-parts.js` — readable source of the portfolio modules that are bundled
  into `index.html` (categories, category routing, theme toggle, enquiry form).

## Publish
Enable GitHub Pages in Settings → Pages → Deploy from a branch → `main` → `/(root)`.

The site is designed to work from the `/snehal-portfolio/` subdirectory: all
paths are relative (`./projects.json`, `./css/…`, `media/…`).

## Connect the editor
1. Visit https://app.pagescms.org and sign in with GitHub.
2. Install/authorize the Pages CMS GitHub App for this repository.
3. Open the repository. Pages CMS reads `.pages.yml`.
4. Edit **Portfolio projects** to add, edit, or remove projects.
5. Upload thumbnails with the Thumbnail image field. Uploads land in `media/`
   (JPG, JPEG, PNG, WebP, AVIF) and are stored as `media/<file>` so they resolve
   on GitHub Pages. GitHub "blob" URLs are also converted automatically.
6. Use unique IDs such as `01`, `02`, `03`.
7. For **Video source** choose `drive` (Google Drive share link), `instagram`
   (public reel/post link), `direct` (direct MP4 URL) or `none`.
8. **Featured** is optional. If no project in a category is featured, the first
   project in that category is used on the homepage category card.

## Categories
The five fixed categories are Cinematic Edits, Reels & Short-Form Content,
Travel Films, Colour Grading and Creative Experiments. A project appears in the
category set in its `category` field; nothing is hardcoded in the HTML.

## Contact
- WhatsApp: https://wa.me/918690946334
- Instagram: https://www.instagram.com/tanwarsnehal/
- Email: Snehalsaini99@gmail.com

The enquiry form is not connected to any third-party form service. It validates
the fields, builds a formatted message and opens
`https://wa.me/918690946334?text=<encoded message>`. The visitor still presses
Send inside WhatsApp — the website cannot send messages on their behalf.

## Theme
Dark (near-black + lavender) is the default. The toggle in the navigation
switches to the warm cream light theme, is stored in `localStorage`
(`snehal-theme`) and is applied before paint to avoid a flash of the wrong theme.

Do not put passwords, API keys, or private credentials in this repository.
