# Romans 3:10–18 — A Textual Journey

An interactive, long-scroll study of Romans 3:10–18 — the paragraph where Paul frames the charge and stitches together quotations from six different Old Testament texts to form one sustained indictment.

The piece walks through:

- **The paragraph itself**, broken into eleven phrases, each color-coded by source
- **The hinge** at verse 13, where Paul leaves the Psalm 14 block and begins braiding in five more texts (Psalms 5, 140, 10, 36, and Isaiah 59) — with a collapsible side-by-side comparison of Psalm 14 and its near-twin Psalm 53
- **The mosaic**, showing how Paul's phrases relate to source texts in Hebrew and Greek
- **A single-word diagnostic** (χρηστότητα) that points toward Psalm 13 LXX rather than Psalm 52 or the Hebrew wording
- **The back-absorption** — how Paul's catena was later absorbed back into the Psalter itself, producing the expanded form of LXX Psalm 13 found inline in Codex Sinaiticus and carried into Jerome's Gallican Psalter
- **A textual timeline** from the original Hebrew through the Septuagint, the great codices, Jerome, and modern critical editions

## Viewing the site

Open `index.html` in any modern browser. No build step, no dependencies — everything is static HTML, CSS, and vanilla JavaScript.

## File structure

```
├── index.html      — the page
├── styles.css      — all styling
├── app.js          — interactivity (scroll reveals, SVG flow lines, drawers, animation)
├── data.js         — all textual content (phrases, sources, timeline, claims)
├── LICENSE         — MIT license
└── README.md       — this file
```

To edit the content (phrasings, source references, timeline entries, etc.), edit `data.js`. The page will pick up changes on reload.

## Hosting

This site is designed to work as a self-contained static page. It can be hosted anywhere that serves HTML — GitHub Pages, Netlify, Cloudflare Pages, a subfolder of an existing site, or embedded via iframe into a platform like Squarespace.

## Attribution of source texts

- **Greek New Testament (Romans)** follows the standard critical tradition (Nestle–Aland / UBS).
- **Greek Old Testament (LXX)** follows the Rahlfs–Hanhart critical text.
- **Hebrew** follows the Masoretic tradition (BHS-family editions).
- **English** glosses throughout the site are paraphrastic summaries written for this project. No modern copyrighted translation is quoted.
- Text-critical claims about the short and long forms of Psalm 13/14 follow the editorial judgment of Rahlfs–Hanhart and standard text-critical scholarship.
- Manuscript references (Vaticanus, Sinaiticus, Alexandrinus, P.Oxy. 5101, Papyrus Rylands 458) are drawn from published descriptions; images are not reproduced.

All ancient-language texts cited are in the public domain.

## License

Copyright © 2026 Sharon Reformed Presbyterian Church ([sharonrpc.org](https://sharonrpc.org))

Released under the MIT License — see [LICENSE](./LICENSE) for the full text.

You are free to use, copy, modify, and redistribute this project, including for commercial purposes, as long as the copyright notice and license are preserved in any copies or substantial portions of the work.
