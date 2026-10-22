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
site/css/base.css        reset, type and the shared pieces: signs, cards, buttons, circles
site/css/sections.css    trail, scenery, header, hero, sections, footer, quiz
site/js/main.js          menu, area panels, trail, parallax, reveals, form, quiz
site/assets/img/         PATHways logo and icon
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

### How the page is built

The page reads as a day's walk, from dawn to night, and every section uses the same few pieces:
- **A trail sign** names each section.
- **A heading** pairs Gill Sans with an italic accent in Charis SIL, the serif of the PATHways report.
- **One short line** sits under the heading, then a visual does the rest.
- **One white card style** holds every boxed thing.
- **Waypoint diamonds** mark lists and steps.

The sections, in order, follow the questions a first-time visitor asks:

1. **Hero (dawn): "Is this for me? What can I do?"** A layered landscape where the sun rises as you scroll. The five starting points are the arms of a signpost, and one line under it offers the 20-minute assessment.
2. **Find your next step (morning to midday): "What are my options?"** It opens with the church's definition of discipleship, set as it opens the PATHways report: "walking with Jesus" in bold, and each area's phrase marked in its color like a highlighter. One line says what PATH stands for. Then come the four areas as stops on the trail, each described in the report's own words. Each opens a panel of next steps, drawn from the 31 active on-ramps in the PATHways app's approved catalogue.
3. **Get your bearings (cream fields): "Which one is right for me?"** Three steps (the two assessments and the report), with a sample page of the report beside them, so the outcome is shown rather than described.
4. **Who walks with you (dusk): "Can someone help me?"** Three companions, each with a small illustration (a lantern, a campfire, footprints side by side), and the guide form.
5. **Footer (night):** stars, a moon, and one closing line.

The floating "Not sure where to start?" button opens two choices: take the assessment, or talk to a guide. It replaced the handoff's three-question quiz, which duplicated the assessment less accurately.

A sandy footpath links them all. It fades in from the hero's footpath and winds through the four area stops, past a cairn beside "Who walks with you", then turns off the edge of the screen. Four marker posts, a few tree blazes and wildflowers carry the area colors. Headings rise word by word, the definition's marks sweep in like a highlighter, and a fine film grain covers the page. A trail-map guide appears on screens 1200px and wider.

Areas and taglines: Participate (Belong), Apply (Become), Take Action (Serve), Help Others (Multiply). The wording describes each person's own walk with Jesus, never "the path". No paid font files are included; see `brand/README.md` for type and colors.

### Still to do

- Optional: real photos for the next-step cards. Each card opens with a small illustrated landscape in its area's color; to use a photo instead, replace that card's `rc-art` div with `<img class="rc-art" src="assets/img/…" alt="">`.
- Social icons and the X handle.
- A white Christ Church logo for the footer. A CSS filter whitens the color logo for now, and both Christ Church logos are loaded from christchurchusa.org.
- Swap the guide form's `mailto:` for a real form service before launch.
