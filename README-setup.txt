# Snehal Tanwar portfolio — GitHub Pages + Pages CMS

## Files to upload to the ROOT of your GitHub repository
- `index.html` — rename `snehal-portfolio-cms-ready.html` to this.
- `projects.json` — editable portfolio projects.
- `.pages.yml` — Pages CMS editor configuration.
- `media/` — create this folder for thumbnails uploaded through Pages CMS (it may be empty initially).

## Publish
Enable GitHub Pages in Settings → Pages → Deploy from a branch → `main` → `/(root)`.

## Connect the editor
1. Visit https://app.pagescms.org and sign in with GitHub.
2. Install/authorize the Pages CMS GitHub App for this repository.
3. Open the repository. Pages CMS reads `.pages.yml`; edit Portfolio projects to add, edit, or remove projects.
4. For each project, fill in title, description, category, thumbnail, video source, and video link.
5. Use unique IDs such as `01`, `02`, `03`, etc.
6. For `videoSource`, choose `drive` for a Google Drive share link, `instagram` for a public Instagram link, `direct` for a direct MP4 URL, or `none`.

## Contact form — one-time setup still required
1. Create a form at https://formspree.io/ and set its notification/recipient email to the inbox where enquiries should arrive.
2. Copy the form endpoint, which looks like `https://formspree.io/f/xxxxxxxx`.
3. In `index.html`, find `https://formspree.io/f/REPLACE_WITH_FORM_ID` and replace it with your actual endpoint.
4. Commit the change and submit a test enquiry from the live site.

Do not put passwords, API keys, or private credentials in this repository.
