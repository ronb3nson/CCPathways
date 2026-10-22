# PATHways

Materials for PATHways, Christ Church's discipleship hub: the landing page, the shared brand files, and print pieces such as the brochure.

```
site/        the landing page: the only folder that gets uploaded
brand/       logos, colors, type and voice, shared by the site and print pieces
brochure/    the PATHways brochure: source files and exported PDFs
design/      working and reference material, never uploaded
scripts/     helper scripts
```

New pieces (a slide deck, social graphics, signage) each get their own top-level folder next to `brochure/`, and draw on `brand/`.

## The landing page (`site/`)

A plain static site with no build step. Open `site/index.html` in a browser, or upload the folder's contents to a web server. All paths are relative, so it works from any folder.

```
site/index.html          the page, with the next steps written in
site/css/tokens.css      colors, fonts, sizes
site/css/base.css        reset, type, buttons, signs, letter circles
site/css/sections.css    trail, scenery, header, hero, sections, footer, quiz
site/js/main.js          menu, stage panels, trail, parallax, reveals, form, quiz
site/assets/img/         PATH wheel, PATHways logo and icon
```

It was rebuilt from the coworker's design handoff, now in `design/landing-page-handoff/`.

### Upload with cPanel

1. Run `scripts/package-site.sh`. It zips the contents of `site/` into `dist/pathways-site.zip`.
2. In cPanel's File Manager, open `public_html/cc/pathways/` (create it the first time), upload the zip, and use **Extract**. Then delete the zip from the server.
3. To require a password, use cPanel's **Directory Privacy** on `cc/pathways`. Turn on password protection and add a user there. The password lives only on the server, never in this repo.

After changing a CSS or JS file, raise the `?v=` number on its link in `site/index.html` (for example `?v=4` to `?v=5`), so visitors' browsers load the new file instead of a cached copy.

### Built for every screen

Tested at 320, 375, 768, 1024 and 1440 wide, and on a phone held sideways (812 × 375).
- Every tap target is at least 44px.
- Hover effects apply only to devices with a mouse or trackpad.
- The hero is sized to the visible screen on mobile browsers.
- Visitors who turn on reduced motion get a still page.

### Changes from the handoff

- **Areas and taglines:** Participate (Belong), Apply (Become), Take Action (Serve), Help Others (Multiply). Help Others means making disciples who make disciples. The wording describes each person's own walk with Jesus, never "the path".
- **Colors:** the PATHways app's area colors and #111111 text. See `brand/README.md`.
- **Next steps:** the 31 active on-ramps from the PATHways app's approved catalogue, with its names, descriptions and links. Each area shows its four highest-priority items as cards; the rest go under See more. Items without a link point to the guide form.
- **Fonts:** no paid font files are included. Gill Sans and Proxima Nova are used when installed, with Lato and Montserrat as fallbacks. A soft italic serif, Fraunces, picks out the emotional words in headings. All three come from Google Fonts.
- **A day's walk:** the page runs from dawn to night.
  - The hero is a layered dawn landscape. The sun rises over the hills as you scroll, and the five starting choices are the arms of a signpost.
  - A sandy footpath fades in from the hero and winds down the page through the four area stops. It passes a cairn beside "Who walks with you", then turns right through the dusk hills and off the edge of the screen.
  - Each section has its own scenery: morning clouds and a compass, midday pines and meadow, afternoon birds and mountains, dusk hills, and a starry footer with a closing line.
  - Four marker posts and a few tree blazes carry the area colors.
- **Details:** section labels are trail signs, section edges are hill lines, headings rise word by word, and a fine film grain covers the page. A trail-map guide appears on screens 1200px and wider.

### Still to do

- One round photo per next-step card (they are light placeholders).
- App Store and Google Play links, social icons and the X handle.
- A white Christ Church logo for the footer. A CSS filter whitens the color logo for now, and both Christ Church logos are loaded from christchurchusa.org.
- Swap the guide form's `mailto:` for a real form service before launch.
