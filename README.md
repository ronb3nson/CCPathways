# PATHways landing page (prototype)

A plain static site built from the design handoff in `PATHways (1)/design_handoff_pathways_landing/`. It needs no build step: open `index.html` in a browser, or upload the files to a web server.

```
index.html          the page, with the next steps written in
css/tokens.css      colors, fonts, sizes
css/base.css        reset, type, buttons, letter circles
css/sections.css    header, hero, assessment, stages, guide form, app, footer, quiz
js/main.js          menu, stage panels, see more, form, floating button, quiz
assets/img/         PATH wheel, PATHways logo and icon
```

All paths are relative, so the site works from any folder.

## Changes from the handoff

- **Stage taglines:** Belong, Become, Serve, Multiply. Help Others means making disciples who make disciples. The copy that mentioned Grow or Lead has been rewritten.
- **Colors:** the PATHways app's stage colors (Participate #7FB3E5, Apply #14A8C2, Take Action #F4AF00, Help Others #DE2A50) and #111111 for text. Letter circles use dark text, except on Help Others.
- **Next steps:** the 31 active on-ramps from the PATHways app's approved catalogue, with its names, descriptions and links. Each stage shows its four highest-priority items as cards; the rest go under See more. Items without a link point to the guide form.
- **Fonts:** no paid font files are included. The page uses Gill Sans and Proxima Nova when they are installed, and otherwise falls back to Lato and Montserrat from Google Fonts.
- **Hero:** an illustrated dawn landscape in layers replaces the photo. As you scroll, the layers move at different speeds and the sun rises over the hills. A footpath leads from the sun down to the bottom of the hero. The PATHways logo replaces the text heading, and the five starting choices are the arms of a signpost.
- **Walking trail:** `js/main.js` continues the hero's footpath as a sandy trail that winds down the page to a cairn beside "Who walks with you". The whole path is always visible, edged with grass, stones and wildflowers. It fades in out of the hero, passes a cairn beside "Who walks with you", and at the bottom turns right through the dusk hills and walks off the edge of the screen, so the journey carries on. Four wooden marker posts, banded in the area colors, stand where it enters each section. Its dotted center line steps forward gently while you scroll and stops when you stop. Some trees carry painted trail blazes.
- **Editorial details:** a soft italic serif (Fraunces, from Google Fonts) picks out the emotional words in headings. Headings rise into view word by word. A fine film grain covers the page, and mist and the last stars of night sit in the dawn sky. "Belong · Become · Serve · Multiply" drifts in large type behind "Who walks with you". The footer opens with a closing line, "Wherever you are, there's a next step," under the moon.
- **Trail map:** on screens 1200px and wider, a small fixed guide on the right shows the page's four sections, marks the one you're in, and jumps to any of them. It keeps to the side margins and passes through the four letter circles, now set above their cards as stops.
- **A day's walk:** each section has its own scenery, so the page runs from dawn to night: morning clouds and a slowly turning compass (assessment), midday pines and a meadow (four areas), afternoon birds and mountains (Who walks with you), dusk hills (app), and stars and a crescent moon (footer). The shapes come from a small SVG sprite at the top of `index.html`, and margin scenery hides below 1100px.
- **Journey details:** section labels are trail signs, each section's top edge is a hill line, and content rises gently into view. Visitors who turn on reduced motion get no parallax and no reveal effects.
- **Wording:** each person's own walk with Jesus, never "the path".

## Upload with cPanel

1. In cPanel's File Manager, create `public_html/cc/pathways/`.
2. Upload `index.html` and the `css`, `js` and `assets` folders into it. Don't upload `PATHways (1)/` or this README.
3. To require a password, use cPanel's **Directory Privacy** on `cc/pathways`. Turn on password protection and add a user there. The password lives only on the server.

## Still to do

- One round photo per next-step card (they are light placeholders).
- App Store and Google Play links, social icons and the X handle.
- A white Christ Church logo for the footer. A CSS filter whitens the color logo for now, and both logos are loaded from christchurchusa.org.
- Swap the guide form's `mailto:` for a real form service before launch.
