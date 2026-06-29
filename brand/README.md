# XolosaX — Brand Identity System

> Music · Technology · Entrepreneurship · Artificial Intelligence

![XolosaX](png/xolosax-banner.png)

A premium identity for a creative visionary working at the intersection of musical
excellence, intelligent systems, and entrepreneurship. The system is built around a
single ownable symbol, a custom geometric wordmark, and a disciplined matte-black /
white / saxophone-gold palette. Everything is delivered as **vector SVG** so it scales
flawlessly from a 16 px favicon to a brushed-metal plaque, and works in monochrome,
gold foil, embossing, and engraving.

---

## 1. The Symbol — the *Woven X*

An abstract **X · S monogram**. Two tapered ribbons — drawn with the confidence of a
conductor's stroke and the flowing bow of a saxophone — cross and **interlace** at the
centre, one passing over the other.

The meaning is hidden in the geometry rather than illustrated:

| Read | Meaning |
|------|---------|
| The crossing **X** | The brand's name, bookended X…X |
| The over-under **weave** | Interconnected systems — the fusion of art + technology |
| The vertical **lens** at the centre | A resonant body / instrument bore |
| Continuous **point-symmetry** | Circular breathing, harmonic motion, infinity |
| **Tapered, pointed** terminals | Precision and craft; emboss and engrave cleanly |

It is never a literal saxophone. It is a mark of resonance.

<p>
  <img src="symbol/xolosax-symbol-gold.svg" width="120">
  <img src="symbol/xolosax-symbol-black.svg" width="120">
  <img src="symbol/xolosax-symbol-white.svg" width="120" style="background:#111">
</p>

**Files** (`symbol/`)

| File | Use |
|------|-----|
| `xolosax-symbol-gold.svg` | Primary — champagne→brass gradient |
| `xolosax-symbol-gold-flat.svg` | Single-colour gold (print / spot) |
| `xolosax-symbol-black.svg` | Black on light backgrounds |
| `xolosax-symbol-white.svg` | Reversed / knockout on dark or foil |
| `xolosax-symbol-*-solid.svg` | Un-woven solid form for very small sizes & deep engraving |

> **Small-size rule:** below ~24 px use the **solid** variant (the interlace gap closes
> cleanly into a single confident mark). The favicon already uses it.

---

## 2. The Wordmark

A **custom geometric monoline** wordmark — circular `o`s, even tracking, the two capital
`X` bookends framing the lowercase `olosa`. Light weight and open spacing give it an
editorial, luxury register. It is drawn as outlined vector paths, so it carries **no font
dependency**.

![Wordmark](png/xolosax-wordmark-black-2048.png)

**Files** (`wordmark/`): `-black`, `-white`, `-gold`.

---

## 3. Lockups

Pre-composed symbol + wordmark combinations with correct proportion and clear space
already built in (`lockup/`).

| File | Orientation / colour |
|------|----------------------|
| `xolosax-lockup-horizontal-dark.svg` | Symbol + black wordmark, transparent |
| `xolosax-lockup-horizontal-reversed.svg` | Gold symbol + white wordmark, transparent (for dark) |
| `xolosax-lockup-horizontal-gold-on-dark.svg` | Boxed dark card |
| `xolosax-lockup-horizontal-mono-black.svg` | Single-colour black |
| `xolosax-lockup-vertical-*` | Stacked variants (dark / reversed / mono / boxed) |

Use **horizontal** for headers, signatures, and plaques; **vertical** for app splash,
profiles, programmes, and avatars.

---

## 4. App icon & favicon

- `app-icon/xolosax-app-icon.svg` — 1024 squircle, gold mark on a black gradient field.
- `favicon/xolosax-favicon.svg` — 64 px rounded tile using the solid mark for legibility.
- Raster exports in `png/`: app icon `1024`, favicon `180 / 32 / 16`.

---

## 5. Colour

| Role | Name | HEX |
|------|------|-----|
| Primary | Matte Black | `#111111` |
| Primary | White | `#FFFFFF` |
| **Signature** | **Saxophone Gold** | **`#C89B3C`** |
| Accent | Rich Brass Gold | `#B8860B` |
| Accent | Champagne Gold | `#D4AF37` |
| Optional | Deep Navy | `#0F172A` |

The gradient used in the gold mark runs **Champagne → Saxophone Gold → Brass**
(`#D4AF37 → #C89B3C → #B8860B`) along the descending diagonal, evoking lacquered brass.
For print, foil, embossing and engraving, use the **flat** gold or a single metallic ink.

---

## 6. Clear space & minimum size

- **Clear space:** keep a margin of at least the height of one symbol arm-tip (≈ 20% of
  the mark) on all sides. The lockup files already include this padding.
- **Minimum size:** symbol 16 px (solid variant); wordmark 90 px wide; lockup 120 px wide.

---

## 7. Do & Don't

**Do** — use the supplied gold, keep generous clear space, place on matte black, white,
navy, or gold foil, and use the solid mark when tiny.

**Don't** — recolour the gold, add drop shadows or extra gradients, stretch or rotate the
mark, outline the wordmark, or place the gold mark on busy/low-contrast imagery.

---

## 8. Regenerating the assets

All artwork is generated from precise geometry (no font or external dependency for the
vectors themselves). Source in `src/`:

```bash
cd brand/src
node build.mjs        # regenerates every SVG in symbol/ wordmark/ lockup/ app-icon/ favicon/

# Optional preview / PNG export (needs playwright-core + the bundled Chromium):
npm i playwright-core
node export.mjs        # writes png/ rasters + banner
```

- `symbol.mjs` — the Woven X geometry (`symbol({color, gradient, interlace, w, gap})`)
- `wordmark.mjs` — the geometric letterforms (`wordmark({color, track})`)
- `build.mjs` — emits the full file set · `render.mjs` / `export.mjs` — preview & raster

---

See **`showcase.html`** for the full identity presentation and application mockups
(business card, app icon, website header, embossed seal, apparel, metal plaque).
