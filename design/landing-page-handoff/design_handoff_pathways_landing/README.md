# Handoff: PATHways Landing (grow.christchurchusa.org)

## Overview
PATHways is Christ Church's discipleship hub. One page helps visitors find their next step with Jesus across four stages: **Participate (Belong) · Apply (Grow) · Take Action (Serve) · Help Others (Lead)**. It should look like just another interior page of christchurchusa.org.

Target repo: `ronb3nson/CCPathways` (empty, branch `main`). Target stack: **plain static site — HTML, CSS, vanilla JS, no build step, no framework.**

## About the design files
`PATHways Landing v4.html` is a **high-fidelity design reference built in HTML**. It is not production code to copy as-is. Rebuild it as a clean static site:

```
/index.html
/css/tokens.css      design tokens (custom properties)
/css/base.css        reset, type, buttons, utilities
/css/sections.css    header, hero, assessment, stages, walk, app, footer, fab/modal
/js/main.js          menu, stage panels, see-more, form, fab, quiz
/data/stages.json    (optional) stage + offering content, rendered by JS or inlined at author time
/assets/img/         logo, wheel, photos
/assets/fonts/       GillSans, ProximaNova (self-hosted — see Assets)
```

Replace `<image-slot>` (a prototype-only drag-and-drop placeholder) with real `<img>` elements. Drop `image-slot.js`.

## Fidelity
High fidelity. Match colors, type, spacing, copy and interactions exactly. Any copy marked placeholder below still needs real content.

## Design tokens
```
--ink #232323          text
--white #FFFFFF        Choose your path bg
--off #FAFAFA          app bg, stage detail panel, explainer
--cream #FCF1D8        assessment section bg
--gray #EDEDED         Who walks with you bg
--blue #97CAEB         offering card bg
--yel #FBCF00          primary button (black text), FAB
--red #EA1B43          inline text links (bold); hover #C3123A
--foot #1C1C1C         footer bg
Stage:  Participate --p #1D8BCB / tint #DDEFFA
        Apply       --a #00A9B7 / tint #DDF3F5   (teal from the logo)
        Take Action --t #F7C600 / tint #FEF4CC   (use black text on it)
        Help Others --h #E31B3F / tint #FCE1E6
Radius: 4px buttons/inputs/hero rows · 10px cards/panels · 50% letter circles · 999px FAB
Max content width 930px (footer 1100px, hero 1080px) · gutter 24px
Section padding 90px (64px ≤640px) · app section bottom padding 130px (FAB clearance)
```
Stage colors appear only on letter circles, stage-card tints and the active-card outline. They are never used for text or buttons.

## Typography
- Headings: `GillSans, 'Gill Sans', 'Gill Sans MT', sans-serif`, weight 600, color #232323, normal tracking, sentence/Title case (no all-caps headings). H1 65px · H2 50px · H3 27px · H4 24px; line-height 1.15. Breakpoints: ≤1020px H1 54 / H2 42; ≤640px H1 46 / H2 34 / H3 24.
- Body: `ProximaNovaMedium, 'Proxima Nova', Montserrat, sans-serif`, 17.5px (lead text 19px), line-height 1.4, letter-spacing 0.8px.
- Small labels: Gill Sans 600, 14–15px, uppercase, letter-spacing 2px.
- Buttons only: Montserrat 600, 15px, uppercase, letter-spacing 0.5px.

## Buttons
Base: 12px 40px padding, 4px radius, 2px border, no arrows.
- `.btn-yel` #FBCF00 bg, black text. Used once: **Take the assessment**.
- `.btn-dark` #232323 bg, white text. Used for Explore, Send my info, App Store, quiz result.
- `.btn-out` transparent, #232323 border/text. Used for Google Play.
- `.btn-white` white bg, #232323 text. Reserved for buttons placed on photos.
Text links get a trailing "→".

## Screens / sections (top to bottom)

1. **Header.** Sticky, 80px, #000. Logo (`logo-40th.png`, 50px tall, 40px ≤640px) on the left, linking to https://christchurchusa.org. On the right, "MENU" (Gill Sans 20px white) with a 3-bar hamburger; it toggles a black dropdown with these links: Home, Plan a visit, Sermons, Events, Give, Contact us.

2. **Hero.**
   - Full-bleed photo (**placeholder: Christ Church people/community photo**) with an `rgba(0,0,0,.55)` overlay.
   - Height `min(720px, 100vh − 80px)`; the hero must fit inside a 1280×800 viewport.
   - Two-column grid (1.1fr / 1fr, 56px gap), stacking at ≤1020px.
   - Left column:
     - H1 "PATHways", white, `text-shadow: 2px 2px 0 #000`.
     - Subtitle "Follow Jesus one step at a time", 24px.
     - Intro (19px): "Wherever you are in your faith, there's a next step for you, and people ready to take it with you."
   - Right column: label "Where would you like to start?" (Gill Sans 24px, white, text-shadow), then 5 white rows. Each row has 4px radius, 14px 18px padding, #232323 text and a right chevron. No letters or colors. On hover the row shifts 3px right with a #F3F3F3 bg.
     - I'm new to Christ Church → opens Participate, scrolls to the *Discover Christ Church* card
     - I want to follow Jesus → opens Apply, scrolls to the *Follow Jesus* card
     - I want to grow in my faith → opens Apply
     - I want to serve → opens Take Action
     - I want to lead or mentor others → opens Help Others

3. **PATHways assessment.** Cream bg, two-column layout. Left: label "PATHways assessment", H2 "See where you are on the path", then the paragraph "PATHways is simply a clearer way to see where you are in your discipleship journey and how to continue growing to become more like Jesus." Right: the paragraph "These two assessments are one part of PATHways. They help us see where you are and the gifts and desires God has given you, so we can recommend ways for you to keep growing.", then a full-width yellow **Take the assessment** button linking to https://pathways.jimgottshall.com (new tab).

4. **Choose your path** (`#choose-path`). White bg, centered.
   - Header:
     - Label "The four pathways", H2 "Choose your path".
     - Sub: "Everyone is somewhere on the path. Pick the one that sounds most like you today."
     - Red text button "What is discipleship? →" toggles the explainer. While open, the button reads "Hide explainer ↑".
   - **Explainer:**
     - #FAFAFA panel, 10px radius, 40px padding. Grid of `1fr 400px`, stacking ≤1020px with the image capped at 400px.
     - Contents: H3 "Following Jesus, one step at a time", a discipleship paragraph, and the Matthew 4:19 scripture (centered italic, `— Matthew 4:19` right-aligned below it).
     - Then a closing paragraph, and the path-wheel image on the right.
   - **Stepper:**
     - 4 cards in a row (2×2 at ≤1020px, 1 column at ≤640px), 20px gap.
     - Each card has a 10px radius, the stage tint as its bg and centered content.
     - Card contents: 56px letter circle, H3 name, uppercase tagline, one sentence, and a full-width dark **Explore** button.
     - The active card gets a 3px outline in its stage color.
     - Clicking the card or the button opens that stage's panel. Only one panel is open at a time, and the panel is closed on load.
   - **Detail panel:**
     - Sits below the stepper: #FAFAFA, 10px radius, 44px 40px padding.
     - Has a red "Close ✕" control at top-right.
     - Header: letter circle, H3 34px, tagline, description.
     - Offering cards in a 2-column grid (1 column ≤640px): #97CAEB, 10px radius, centered.
     - Offering card contents: 110px circular photo, small uppercase badge, H4 27px, description, and an underlined #232323 link with →.
     - Optional **See more ▾ / See less ▴** list: 2 columns, title in red Gill Sans 21px, 16px description, 1px #DDD dividers.

5. **Who walks with you** (`#guide` holds the form). #EDEDED bg, two columns.
   - Left: H2, a paragraph, and 3 people rows. Each row has a 48px white circular icon. Rows: Pastors & chaplains / Group leaders / Coaches & mentors.
   - Right: the form "Talk to a next-step guide".
     - Fields: Name, Email, Campus (Montclair, Rockaway, Lodi, Online), My path (Not sure yet + 4 stages).
     - Fields are white, 1px #CFCFCF border, 4px radius.
     - Dark **Send my info** button.
     - Note: "Your note goes to our Church Life team at ChurchLife@christchurchusa.org."

6. **App banner.** #FAFAFA bg. Left: H2 "Take your church family with you", a paragraph, and two buttons (App Store: dark; Google Play: outline). **The store URLs are placeholders.** Right: 2 white review cards with 5 stars, italic quote and campus name.

7. **Footer.** #1C1C1C, 72px top padding.
   - Grid: brand column at 1.5fr plus 4 stage columns (2 columns ≤1020px with the brand spanning both; 1 column ≤640px).
   - Brand column:
     - White logo (currently `filter: brightness(0) invert(1)`; use a real white logo file instead).
     - "Uniting People to God and People to People".
     - 501c3 line, © 2026 Christ Church.
     - Social links: Facebook, X, Instagram, YouTube, TikTok (**replace the letter circles with real icons; confirm the X handle**).
     - Phone 973-783-1010.
   - Stage columns: uppercase 15px headings, Gill Sans 17px white links.
   - Bottom bar: "grow.christchurchusa.org" plus links Visit christchurchusa.org →, Privacy policy, Contact us.

8. **Floating "Not sure where to start?" button.**
   - Fixed bottom-left (24px). Yellow pill with black Montserrat 14px uppercase text and `box-shadow 0 4px 14px rgba(0,0,0,.18)`.
   - At ≤640px it spans the full width with 16px insets.
   - Bottom-left avoids the live site's "Start Here" chat pill, which sits bottom-right.
   - Visibility (IntersectionObserver): show the button only when the hero, `#guide` and the footer are all out of view. Fade and slide 12px over 0.2s.
   - Clicking it opens a modal with a 3-question quiz (see State).

## Stage content (exact)
**Participate (P, Belong).** Card text: "Discover hope and community. Come as you are and find your people."
Boxes:
- Discover Christ Church: badge "Rockaway, Sun, Nov 15"; text "New here? Join us for a 30-minute conversation, after our 11am service, with one of our leaders about who we are, what we believe and how our church family began."; link Register → https://christchurchusa.org/registration/path-100 (**placeholder link: replace with the Rock RMS registration URL**).
- Weekend services → /visit (Plan a visit).
- Small groups → /smallgroups/ (Find a group).
- Encounter with God → /encounter/ (Learn more).
- Inviting made easy → /invite/ (Get the tools).

See more: Watch sermons → /sermons/; CC Online → https://live.christchurchusa.org.

**Apply (A, Grow).**
Boxes:
- Follow Jesus: badge "Start here" → https://christchurchusa.org/nextsteps (Take your next step).
- Water Baptism → /waterbaptism/.
- Joining our Church Family → /membership/.
- Pastoral Care → /pastoralcare/.
- Give → /giving/. Text: "Giving is a discipleship step, not just a transaction. When you give, you form a partnership with Christ Church by helping to fulfill the mission of uniting people to God and people to people."

See more:
- Bible reading plan → /documents/TheDiscipleship-2020.pdf
- 40-day prayer journey → /documents/40DayBrochure.pdf
- Care groups → /careministries/
- Online courses → https://churchlifeonline.org/
- School of Prayer → https://schoolofprayerusa.org/
- School of Worship → https://www.schoolofworshipusa.org
- Defending your faith → https://www.defendingfaith.org/
- Financial Empowerment Ministry → /fem/
- Marriage ministry → /marriage/
- Elevate Family Conference → /elevateconference/

**Take Action (T, Serve).**
Boxes:
- Join a serve team → /serve
- Discover your spiritual gifts → https://pathways.jimgottshall.com (new tab)
- CARE Center of NJ → https://carecenterofnewjersey.org/
- Food pantry → /foodpantry/

**Help Others (H, Lead).**
Boxes:
- Small group leadership → /smallgroups/lead
- CC Global / Missions → /missions/
- Legacy Group → /legacygroup/

All relative paths are on https://christchurchusa.org. The prototype file has the full card copy.

## Interactions & behavior
- **Smooth scroll** to a target with an 96px offset for the sticky header; card targets use 110px (`scroll-margin-top:110px` on cards, 96px on the panel).
- **Stage open:** set `data-active` and `aria-expanded` on the cards and buttons, show `#stage-detail`, and toggle `.on` on the matching `.s-panel`. Clicking Explore scrolls to the panel. Clicking Close hides the panel and scrolls back to the stepper.
- **See more:** toggles the sibling list, `aria-expanded`, and the label.
- **Form:** name and email are required. If either is missing, the button shows "Please add your name and email" for 2.6s. On success, open `mailto:ChurchLife@christchurchusa.org` with subject "PATHways: next-step guide" and a body listing Name, Email, Campus and Path. The button then reads "Thank you!" and is disabled. *Recommended for production: replace mailto with a real form endpoint, such as Rock RMS or a form service.*
- **Menu:** the button toggles the pane `hidden` state and `aria-expanded`.
- **Modal:** closes on Escape, a backdrop click, or ✕. It sets `body overflow:hidden` while open.

## State (vanilla JS)
- `activeStage: null | 'participate'|'apply'|'takeaction'|'helpothers'`
- `explainerOpen`, per-panel `seeMoreOpen`, `menuOpen`
- FAB visibility: `{hero, guide, foot}` intersecting flags → `show = !hero && !guide && !foot`
- Quiz: `step` (0–2) and `answers[]` (index 0–3 per question).
  - Result: `stage = STAGES[min(3, round(mean(answers)))]`.
  - The result view shows a letter circle, the stage name, a one-line description and an "Explore {Stage}" button. That button closes the modal, opens the stage and scrolls to the panel.
  - The modal also offers Back, Start over, and "Or talk to a guide →", which closes the modal and scrolls to `#guide`.
- Quiz questions and answers are in the prototype's script (`Q` and `ST`).

## Accessibility
- Use semantic landmarks (header, nav, main sections, footer).
- `aria-expanded` and `aria-controls` on every toggle; `role="dialog"` and `aria-modal` on the quiz.
- Visible focus styles (inputs use a 2px #232323 outline).
- Yellow surfaces always carry black text.
- Recommended: trap focus in the modal and return focus to the FAB when it closes.

## Assets
- `assets/path-wheel.png`: PATH wheel graphic, shown in the explainer at 400px.
- The logo is hotlinked: `https://christchurchusa.org/assets/images/logo-40th.png`. **Self-host it, and add a white version for the footer.**
- Fonts are hotlinked from `https://christchurchusa.org/assets/fonts/GillSans-01.ttf` and `.../ProximaNova-Regular.ttf`. Cross-origin font loading can be blocked, so **self-host them as WOFF2 (with license confirmed) or set CORS on the main site.** Montserrat (600) comes from Google Fonts.
- **Photos still needed:** the hero image, plus one circular photo per offering card.

## Open items / placeholders
- Discover Christ Church registration URL and the live date (currently "Rockaway, Sun, Nov 15"); these will come from Rock RMS.
- App Store and Google Play URLs, and the official store badges.
- Social icons and the X handle.
- Card counts: Participate has 5 cards (the 5th sits alone on its row) and Help Others has 3.
- The "Discover your spiritual gifts" description still mentions the membership course but now links to the assessment.

## Files
- `PATHways Landing v4.html`: the full design reference (markup, CSS and JS in one file).
- `image-slot.js`: prototype-only placeholder component (do not ship).
- `assets/path-wheel.png`
