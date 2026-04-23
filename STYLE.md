# Romans 3 · Tracing a Catena — Style & Contribution Guide

This document is the canonical style guide for the site. It describes the voice, the visual system, the file architecture, and the editorial rules we've committed to. Read this before making changes — whether you're a human contributor or an AI assistant.

---

## 1. What this site is

An interactive study companion that traces Romans 3:10–18 phrase by phrase to its Old Testament sources, and then shows how Paul's *catena* ("stringing of beads") was absorbed back into later Greek manuscripts of Psalm 13(14). It is a scrolling long-form narrative with interactive chapters, not a reference work or a concordance.

**Primary argument arc:**
1. Open with the single clean match (Rom 3:12 ≈ Ps 13[14]:3 LXX).
2. Reveal the mosaic — six sources, one paragraph.
3. Show the direction of influence via the *tell* (πικρίας) and the Psalm 14 / Psalm 53 doublet (χρηστότητα vs. ἀγαθόν).
4. Pay off with the back-absorption animation: Paul's phrases flow into the long form of Psalm 13 LXX.
5. Place it in history via the timeline.
6. End with confidence-tagged claims and attribution.

Every chapter should earn its place in that arc. Don't add chapters for decoration.

---

## 2. Editorial voice

- **Scholarly but accessible.** Assume an educated reader who isn't a specialist. Translate every Greek/Hebrew word the first time it appears in prose.
- **No emoji.** Anywhere. Ever.
- **Dates: BC / AD**, not BCE / CE. Format as `c. AD 57` (AD before numerals), `3rd c. AD` (AD after century), `c. 150 BC` (BC after numerals).
- **Paraphrastic English only.** All English glosses on this site are written fresh for this project. Do not paste in ESV, NIV, NRSV, NASB, KJV, or any other modern copyrighted translation. If you need to render a verse in English, write it yourself, stay close to the Greek/Hebrew, and keep it short.
- **Ancient-language text is quoted directly.** Greek follows Nestle–Aland/UBS (NT) and Rahlfs–Hanhart (LXX). Hebrew follows the Masoretic tradition (BHS-family). These are public domain.
- **Confidence levels are named, not hidden.** Every major claim sits at one of three tiers: `documented`, `strong-judgment`, or `noted-gap`. The "noted gap" (no pre-Pauline Greek MS of Psalm 13/14 survives) must remain visible — never quietly upgraded.
- **No filler.** If a paragraph doesn't move the argument forward, cut it. This is a short site, not a survey.

---

## 3. Visual system

### 3.1 Color

The palette is **muted editorial** — chroma ~0.08, hue varied. All colors use `oklch()`. Avoid fully saturated hues.

Each of the six source texts has its own hue. The palette is defined in `data.js` under `window.CATENA_DATA.sources` and is the single source of truth:

| Source    | Hue  | Role                      |
|-----------|------|---------------------------|
| Psalm 14  | 25   | Paul's opening anchor     |
| Psalm 5   | 200  | First catena pivot        |
| Psalm 140 | 290  | Venom line                |
| Psalm 10  | 75   | The πικρίας tell          |
| Isaiah 59 | 340  | Feet/ruin/peace trio      |
| Psalm 36  | 165  | Closing frame             |

Per source, three tokens exist: `color` (oklch ~0.55 L / 0.08–0.11 C), `tint` (oklch ~0.96 L / 0.025 C, used for backgrounds), `ink` (oklch ~0.35 L / 0.08–0.11 C, used for text on tint).

When you add a new color-coded element, read `D.sources[sourceId]` and apply via the three CSS custom properties `--_color`, `--_tint`, `--_ink` — use the `setCssVars()` helper in `app.js`. Do not hard-code hex.

### 3.2 Typography

Three typefaces, each with a single responsibility:

- **Source Serif 4** — all English prose. Body, headings, UI.
- **Gentium Plus** — Greek. Both Koine NT and LXX.
- **Frank Ruhl Libre** — Hebrew. Right-to-left.

Use the `.greek` and `.hebrew` classes (defined in `styles.css`) to switch fonts. Don't introduce a fourth face.

### 3.3 Motion

Motion exists to *argue*, not to decorate. Three motion moments exist and each earns it:

1. **Hinge thread** (Ch. 3) — SVG curves draw when the section scrolls in; reveals the six-source structure visually.
2. **Mosaic** (Ch. 4) — color-coded phrase hover/click with a drawer; static layout, motion only on interaction.
3. **Back-absorption** (Ch. 7) — connector curves draw from Paul into the Psalm, one phrase at a time, on autoplay when the section enters viewport.

Do not add scroll-driven animation, parallax, or entrance animations beyond the established `.reveal` fade. Do not add new motion moments without a clear argumentative reason.

---

## 4. File architecture

```
/
├── index.html              ← the page
├── data.js                 ← content model (single source of truth)
├── app.js                  ← all rendering + interaction
├── styles.css              ← full stylesheet
├── chapter-palettes.css    ← per-chapter background/ink overrides
├── STYLE.md                ← this file
├── CLAUDE.md               ← AI-assistant entrypoint (points here)
├── README.md               ← repo intro
└── LICENSE
```

### 4.1 `data.js` — the content model

All prose, references, and configuration lives here. The structure:

- `sources` — six source books, keyed by id, with `color` / `tint` / `ink` / `label` / `shortLabel`.
- `romansPhrases` — array of 11 phrase objects. Each has: `id`, `verse`, `source`, `tag`, `greek`, `english`, `note`, `sourceLxx { ref, greek, english }`, `sourceHebrew { ref, hebrew, english }`, `alignment` (`verbatim-lxx` | `lxx-close` | `lxx-only` | `compressed` | `stable` | `paul-frames`), optional `alignmentNote`.
- `backAbsorption` — `shortForm.greek[]` and `longForm.greek[]`, each line with `text` / `en` / `source`.
- `timeline` — array of `{ era, label, body }`.
- `claims` — array of `{ level, text }` where `level` is one of the three tiers above.
- `attribution` — array of `{ kind, detail }`.

**Rule:** add content in `data.js`. Do not hard-code phrases, refs, or English glosses in `app.js` or the HTML.

### 4.2 `app.js` — rendering

Chapter-by-chapter render functions are called from `init()` in order: `renderHingeThread`, `renderMosaic`, `renderAlign`, `renderBA`, `renderTimeline`, `renderClaims`, `renderAttribution`. Each reads from `D = window.CATENA_DATA` and writes into a specific mount point in the HTML.

The helpers `$`, `$$`, `setCssVars`, and `state` are defined at the top. Reuse them; don't re-roll selectors.

### 4.3 HTML

`index.html` is the single canonical markup file and the GitHub Pages entry.

### 4.4 CSS

`styles.css` holds the full design system. `chapter-palettes.css` provides per-chapter background and ink overrides so each chapter reads as a distinct panel. Prefer extending `styles.css` for anything structural; use `chapter-palettes.css` only for chapter-scoped color.

---

## 5. Adding a new chapter

1. Add a `<section class="chapter chapter-XXX" data-nav="Short label" data-ch="N">` to `index.html`. `data-ch` is 1-indexed and must match the section's position in the arc.
2. If the chapter renders dynamic content, add a mount point (`<div id="xxx">`) and a `render<Xxx>()` function in `app.js` called from `init()`.
3. If the chapter introduces new content, extend `data.js` with a new top-level key. Do not inline content in `app.js`.
4. Add chapter-scoped color in `chapter-palettes.css` if the chapter needs a distinct background.
5. Keep the argument tight. A new chapter must serve the Romans 3 → Psalm 13 LXX argument arc. Decorative chapters are rejected.

---

## 6. DOs and DON'Ts

**DO**
- Read the source from the `sources` map — don't hard-code color or label.
- Write English glosses yourself. Short. Close to the original.
- Name confidence tiers on every claim (`documented` / `strong-judgment` / `noted-gap`).
- Use `oklch()` for any new color.
- Test the back-absorption autoplay end-to-end after any change to `app.js` or the BA markup. All seven connector paths must draw and all seven absorbed lines must appear.

**DON'T**
- Don't paste modern copyrighted English translations, even as placeholders.
- Don't add emoji.
- Don't introduce Roboto, Inter, Arial, or any system font. Stick to Source Serif 4 / Gentium Plus / Frank Ruhl Libre.
- Don't write BCE / CE — always BC / AD.
- Don't add scroll-driven animation beyond what's already in the hinge thread and back-absorption.
- Don't add new source books without a real textual reason and a manuscript reference.
- Don't remove the "noted gap" disclaimer (no pre-Pauline Greek MS of Psalm 13/14 survives).

---

## 7. Verifying a change

Before committing:

1. Open `index.html` locally. No console errors.
2. Scroll the whole document. Every chapter renders. Nav dots on the left rail update as you scroll.
3. Hover a phrase in the mosaic (Ch. 4). English appears below. Click it. Drawer opens with Greek and Hebrew sources.
4. Scroll to the back-absorption chapter (Ch. 7). Connector curves draw one by one; absorbed lines appear below the short-form Psalm.
5. Timeline dates all read BC / AD.
