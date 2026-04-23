# CLAUDE.md — AI assistant entrypoint

Before making any change to this repository, **read `STYLE.md`**. It is the canonical style and contribution guide and supersedes any assumption you might otherwise carry in from general training.

Key reminders (the full rules are in `STYLE.md`):

- **Voice:** scholarly but accessible. No emoji. Dates as BC / AD, not BCE / CE.
- **English glosses are paraphrastic and written fresh.** Never paste ESV, NIV, NRSV, NASB, KJV, or any other modern copyrighted translation — not even as placeholders.
- **Ancient-language text** (Greek, Hebrew) is quoted directly from public-domain critical editions (Nestle–Aland / UBS / Rahlfs–Hanhart / BHS).
- **Content lives in `data.js`.** `app.js` renders it; HTML provides mount points. Don't inline content in `app.js` or the HTML.
- **Color comes from `oklch()` via the `sources` map in `data.js`.** Don't hard-code hex.
- **Type stack is fixed:** Source Serif 4 (English), Gentium Plus (Greek), Frank Ruhl Libre (Hebrew). Don't introduce a fourth face.
- **Confidence tiers** (`documented`, `strong-judgment`, `noted-gap`) are named on every claim. Don't quietly upgrade a "noted gap" into a fact.
- **Motion is argumentative, not decorative.** Three motion moments exist — hinge thread, mosaic hover, back-absorption autoplay. Don't add scroll-driven animation, parallax, or entrance effects beyond the established `.reveal` fade.

After any substantive change, verify per the checklist in §7 of `STYLE.md`.
