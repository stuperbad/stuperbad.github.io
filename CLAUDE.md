# stuperbad.com

Static portfolio site (GitHub Pages, served from `master`). Plain HTML/CSS/JS, no build step.
Preview locally with `python3 -m http.server` and open `index.html`.

## Publishing workflow (authorized by Evan)
- Claude may merge its own pull requests to `master`, which publishes the site. Use squash merges so each change is a single commit that can be reverted.
- Work on a branch, open a PR, check the result locally (render the pages, click through, no broken images), then merge.
- Ask before publishing anything that could be sensitive: employer or client material (Applied Invention work, client homes), people's faces or names, private documents, or anything Evan hasn't said is shareable.
- Never publish tokens, secrets or private file paths. Photo-search tokens belong in the cloud environment, not in the repo.

## Site structure
- `index.html`: portfolio grid. Each card is `<div class="iso-box ... data-tier="1|2">`. Tags are CSS classes (design, art, machine, furniture, architecture, sculpture, interactive, digital) and a card can carry several. Tier 1 is featured work, tier 2 is art and college work, shown below. Order in the file is order on the page.
- Project pages are `<project>.html` with images under `Images/<project>/`. Copy `sliced-furniture.html` as the template.
- Retired pages (`microarchitecture.html`, `torroid.html`, `axiradial-toadstool.html`) are redirects to `sliced-furniture.html`.
- Page text marked `DRAFT TEXT` is first-pass and should be reviewed by Evan.

## Photos
- Evan's Google Takeout photo archive is searched through a service on his PC at `photos-pc.90percent.art` (see `photo-search/README.md` in `stuperbad/90percentart-ai-orchestrator`). Photos used on the site are 400px thumbnails unless noted.
- Older project photos and Rhino renders also live in Evan's Google Drive (`Portfolio` folder).
