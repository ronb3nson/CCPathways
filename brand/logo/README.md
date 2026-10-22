# PATHways logo

| File | Use |
|---|---|
| `pathways-logo-black-text.svg` / `.png` | The logo on white or light backgrounds |
| `pathways-logo-white-text.svg` / `.png` | The logo on dark backgrounds (the text is white, the background transparent) |
| `pathways-icon.svg` / `.png` | The icon alone |

Use the **SVG** on websites: it is sharp at every size and about 4 KB. The PNGs are for places that do not take SVG. They have transparent backgrounds and are large enough to scale down anywhere: the logos are 512 px tall and the icon 1024 px square.

## Margins

Every file is trimmed exactly to the artwork, with no padding built in. The edge of the file is the edge of the logo, so it lines up with your text and grid, and the size you set is the size people see.

Add space around it in your layout instead, and keep at least this much clear on every side:

- **Logo:** the height of the P in PATH, about two-thirds of the logo's height (26 px when the logo is 40 px tall).
- **Icon:** a quarter of its width.

`usage-preview.png` shows the file edges and the clear space.

## On a web page

Set the height and let the width follow:

```html
<img src="pathways-logo-black-text.svg" alt="PATHways" height="40">
```

On a site with a dark mode, swap the version automatically:

```html
<picture>
  <source srcset="pathways-logo-white-text.svg" media="(prefers-color-scheme: dark)">
  <img src="pathways-logo-black-text.svg" alt="PATHways" height="40">
</picture>
```

**Smallest size:** the logo 24 px tall, the icon 16 px.

## Colors

- Text: `#111111` (black) or `#FFFFFF` (white)
- Icon, one color for each area: `#7FB3E5` Participate, `#14A8C2` Apply, `#F4AF00` Take Action, `#DE2A50` Help Others

The text is Montserrat (Black for PATH, Regular for ways), converted to shapes, so no font is needed.

**Please don't:** stretch or squash it, recolor the icon, rearrange the icon and text, add shadows or outlines, or put it on a busy photo without a solid panel behind it.
