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
- **Hero:** the PATHways logo replaces the text heading.

## Upload with cPanel

1. In cPanel's File Manager, create `public_html/cc/pathways/`.
2. Upload `index.html` and the `css`, `js` and `assets` folders into it. Don't upload `PATHways (1)/` or this README.
3. To require a password, use cPanel's **Directory Privacy** on `cc/pathways`. Turn on password protection and add a user there. The password lives only on the server.

## Still to do

- Hero photo and one round photo per next-step card (they are gray placeholders).
- App Store and Google Play links, social icons and the X handle.
- A white Christ Church logo for the footer. A CSS filter whitens the color logo for now, and both logos are loaded from christchurchusa.org.
- Swap the guide form's `mailto:` for a real form service before launch.
