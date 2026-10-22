# Discipleship PATHways — Handoff Package
**Christ Church · Version 2 · June 2026**

---

## What's in this folder

```
pathways-handoff/
├── index.html          ← The complete landing page (open this in a browser)
├── assets/
│   ├── path-wheel.png  ← PATH wheel graphic (hero section)
│   └── Picture1.png    ← Fallback wheel image
└── README.md           ← This file
```

---

## How to open it

Double-click `index.html` — it opens in any browser with no server required. All CSS and JavaScript are embedded in the single file.

---

## Brand Colors

| Stage | Color | Hex |
|---|---|---|
| Participate | Sky Blue | `#6BABD7` |
| Apply | Blue | `#379EB4` |
| Take Action | Gold | `#D4B800` |
| Help Others | Red | `#E03060` |
| Christ Church Blue | Navy | `#1E3A8A` |
| Christ Church Red | Red | `#C0392B` |
| Christ Church Yellow | Yellow | `#F5C518` |

---

## Fonts

- **Headings:** Montserrat (400, 600, 700, 800, 900) — loaded from Google Fonts
- **Body:** Open Sans (300, 400, 600) — loaded from Google Fonts

Requires an internet connection to load fonts. For offline use, download and self-host both font families.

---

## Page Sections (in order)

1. **Hero** — Full-width dark hero with PATH wheel, headline, campus strip
2. **Orient** — "Not Sure Where to Start?" heading + subtext
3. **Self-Selection Tiles** — 4 colored tiles routing to each stage
4. **Collapsible Definition** — "What is Discipleship?" expandable section
5. **Stage Resources** — Tabbed panel (Participate / Apply / Take Action / Help Others)
6. **Pastoral Care + Connection Card** — Dark section with form
7. **App Banner** — Light section with App Store / Google Play links
8. **Footer** — Links, social, copyright

---

## Interactions (all in-page JavaScript, no dependencies)

- Stage tiles scroll to and activate the correct tab
- Tabs switch between stage panels
- Collapsible definition section opens/closes
- Connection card validates name + email before confirming
- Footer PATHways links navigate to correct stage tabs
- Mobile sticky CTA appears at bottom on small screens

---

## To deploy

Drop the entire folder onto your web server or CMS. The page is self-contained — no build step, no npm, no dependencies.

If your CMS provides its own header/nav, remove the `<!-- NAV removed -->` comment block and the `.nav` CSS class block at the top of the stylesheet.

---

## Contacts & Live URLs

All links point to live christchurchusa.org URLs. Update any placeholder app store links before launch:
- App Store: `https://apps.apple.com/app/christ-church` ← confirm correct URL
- Google Play: `https://play.google.com/store/apps/christ-church` ← confirm correct URL
