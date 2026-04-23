// App logic — scroll-driven narrative with chapter animations
// Romans 3 · Tracing a Catena

const D = window.CATENA_DATA;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const state = {
  activePhrase: null,
  alignIdx: 0,
  baPlaying: false,
  baDone: false
};

function setCssVars(el, src) {
  if (!src) return;
  el.style.setProperty("--_color", src.color);
  el.style.setProperty("--_tint", src.tint);
  el.style.setProperty("--_ink", src.ink);
}

/* ═══ CH3 · HINGE — Romans (left) → six sources (right), with flow lines ═══ */
function renderHingeThread() {
  const el = $("#hinge-thread");
  if (!el) return;

  // Short summary per Romans phrase, for the left-column catena list.
  const romansLines = [
    { pid: "p1",  v: "3:10",    short: "No one is righteous, not even one" },
    { pid: "p2",  v: "3:11",    short: "No one understands; no one seeks God" },
    { pid: "p3",  v: "3:12a",   short: "All have turned aside" },
    { pid: "p4",  v: "3:12b",   short: "There is no one who does good" },
    { pid: "p5",  v: "3:13a",   short: "Their throat is an open grave" },
    { pid: "p6",  v: "3:13b",   short: "The venom of asps is under their lips" },
    { pid: "p7",  v: "3:14",    short: "Their mouth is full of cursing and bitterness" },
    { pid: "p8",  v: "3:15",    short: "Their feet are swift to shed blood" },
    { pid: "p9",  v: "3:16",    short: "Ruin and misery mark their paths" },
    { pid: "p10", v: "3:17",    short: "The way of peace they have not known" },
    { pid: "p11", v: "3:18",    short: "No fear of God before their eyes" }
  ];

  // Six sources, ordered top→bottom to minimize line crossings (matches order of first appearance in Romans).
  const sourceOrder = ["ps14", "ps5", "ps140", "ps10", "isa59", "ps36"];
  const sourceRefs = {
    ps14:  "Psalm 14 · vv.1–3",
    ps5:   "Psalm 5:10 (LXX)",
    ps140: "Psalm 140:3 (LXX 139:4)",
    ps10:  "Psalm 10:7 (LXX 9:28)",
    isa59: "Isaiah 59:7–8",
    ps36:  "Psalm 36:1 (LXX 35:2)"
  };

  // Look up a phrase's source id from data
  const phraseSource = (pid) => {
    const p = D.romansPhrases.find(x => x.id === pid);
    return p ? p.source : null;
  };

  el.innerHTML = `
    <div class="ht-track ht-mosaic">
      <svg class="ht-svg" aria-hidden="true"></svg>

      <div class="ht-anchor-col">
        <div class="ht-col-head">
          <div class="ht-col-eyebrow">The paragraph</div>
          <div class="ht-col-title">Romans 3:10–18</div>
          <div class="ht-col-sub">Paul's own composition</div>
        </div>
        <ul class="ht-rom-list">
          ${romansLines.map(r => {
            const src = D.sources[phraseSource(r.pid)] || D.sources.ps14;
            return `
              <li class="ht-rom" data-pid="${r.pid}" data-src="${src.id}" style="--_color:${src.color}">
                <span class="ht-rom-v">${r.v}</span>
                <span class="ht-rom-dot" aria-hidden="true"></span>
                <span class="ht-rom-txt">${r.short}</span>
              </li>
            `;
          }).join("")}
        </ul>
      </div>

      <div class="ht-src-col">
        <div class="ht-col-head">
          <div class="ht-col-eyebrow">The library</div>
          <div class="ht-col-title">Six source texts</div>
          <div class="ht-col-sub">All Old Testament</div>
        </div>
        <div class="ht-src-list">
          ${sourceOrder.map(sid => {
            const src = D.sources[sid];
            const count = D.romansPhrases.filter(p => p.source === sid).length;
            return `
              <div class="ht-src" data-src="${sid}" style="--_color:${src.color}">
                <span class="ht-src-swatch" aria-hidden="true"></span>
                <div class="ht-src-body">
                  <div class="ht-src-name">${src.label}</div>
                  <div class="ht-src-ref">${sourceRefs[sid]}</div>
                </div>
                <span class="ht-src-count">${count}×</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;

  const drawHingeSvg = () => {
    const svg = $(".ht-svg", el);
    const track = $(".ht-track", el);
    if (!svg || !track) return;
    const romEls = $$(".ht-rom", el);
    const srcEls = $$(".ht-src", el);
    if (romEls.length === 0 || srcEls.length === 0) return;

    const tb = track.getBoundingClientRect();
    const W = tb.width, H = tb.height;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("width", W);
    svg.setAttribute("height", H);

    // Build a map of source id → right-edge-out point (left-side of the source card)
    const srcPoints = {};
    srcEls.forEach(s => {
      const r = s.getBoundingClientRect();
      srcPoints[s.dataset.src] = {
        x: r.left - tb.left,
        y: r.top + r.height / 2 - tb.top
      };
    });

    // For each Romans line, a path from its right edge → the matching source's left edge
    const paths = romEls.map((rEl, i) => {
      const r = rEl.getBoundingClientRect();
      const sx = r.right - tb.left;
      const sy = r.top + r.height / 2 - tb.top;
      const sid = rEl.dataset.src;
      const dst = srcPoints[sid];
      if (!dst) return "";
      const ex = dst.x, ey = dst.y;
      // Curve: horizontal tangent at both ends, so lines gracefully merge when stacking into a card.
      const dx = Math.max(60, (ex - sx) * 0.55);
      const c1x = sx + dx, c1y = sy;
      const c2x = ex - dx, c2y = ey;
      const color = D.sources[sid].color;
      return `<path d="M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}" stroke="${color}" data-i="${i}" data-src="${sid}"/>`;
    }).filter(Boolean);

    svg.innerHTML = paths.join("");
  };

  // Hover interactivity — highlight the matching source card + path
  el.addEventListener("mouseover", (e) => {
    const rom = e.target.closest(".ht-rom");
    const src = e.target.closest(".ht-src");
    const target = rom || src;
    if (!target) return;
    const sid = target.dataset.src;
    el.classList.add("has-hover");
    el.dataset.hoverSrc = sid;
    $$(".ht-rom", el).forEach(x => x.classList.toggle("dim", x.dataset.src !== sid));
    $$(".ht-src", el).forEach(x => x.classList.toggle("dim", x.dataset.src !== sid));
    $$(".ht-svg path", el).forEach(p => {
      const match = p.getAttribute("data-src") === sid;
      p.classList.toggle("dim", !match);
      p.classList.toggle("hl", match);
    });
  });
  el.addEventListener("mouseleave", () => {
    el.classList.remove("has-hover");
    delete el.dataset.hoverSrc;
    $$(".ht-rom, .ht-src", el).forEach(x => x.classList.remove("dim"));
    $$(".ht-svg path", el).forEach(p => { p.classList.remove("dim", "hl"); });
  });

  // Draw initially and on resize
  setTimeout(drawHingeSvg, 100);
  setTimeout(drawHingeSvg, 500);
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(drawHingeSvg, 120); });

  // Trigger reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { drawHingeSvg(); el.classList.add("in"); io.disconnect(); }
    });
  }, { threshold: 0.2 });
  io.observe(el);
}

/* ═══ CH4 · MOSAIC — Greek primary, English on hover ═══ */
function renderMosaic() {
  const greekEl = $("#mosaic-greek");
  const enEl = $("#mosaic-hover-en");
  if (!greekEl) return;
  greekEl.innerHTML = "";

  // placeholder state
  enEl.classList.add("placeholder");
  enEl.textContent = "Hover a phrase to read its English gloss.";

  D.romansPhrases.forEach((p, i) => {
    const src = D.sources[p.source];
    const g = document.createElement("span");
    g.className = "phrase";
    g.dataset.pid = p.id;
    g.dataset.source = p.source;
    setCssVars(g, src);
    g.textContent = p.greek + (i < D.romansPhrases.length - 1 ? " " : "");
    g.addEventListener("click", () => openDrawer(p.id));
    g.addEventListener("mouseenter", () => showHoverEn(p));
    g.addEventListener("mouseleave", () => resetHoverEn());
    g.addEventListener("focus", () => showHoverEn(p));
    g.tabIndex = 0;
    greekEl.appendChild(g);
  });

  const legend = $("#legend-items");
  legend.innerHTML = "";
  Object.values(D.sources).forEach(src => {
    const count = D.romansPhrases.filter(p => p.source === src.id).length;
    const item = document.createElement("div");
    item.className = "legend-item";
    item.dataset.source = src.id;
    item.innerHTML = `
      <span class="swatch" style="background:${src.color}"></span>
      <span>${src.label}</span>
      <span class="count">${count}</span>
    `;
    item.addEventListener("mouseenter", () => hoverSource(src.id, true));
    item.addEventListener("mouseleave", () => hoverSource(src.id, false));
    legend.appendChild(item);
  });
}

function showHoverEn(p) {
  const enEl = $("#mosaic-hover-en");
  const src = D.sources[p.source];
  enEl.classList.remove("placeholder");
  enEl.style.setProperty("--_ink", src.ink);
  enEl.innerHTML = `<strong>Romans ${p.verse} · ${src.label}</strong>${p.english}`;
}
function resetHoverEn() {
  const enEl = $("#mosaic-hover-en");
  enEl.classList.add("placeholder");
  enEl.textContent = "Hover a phrase to read its English gloss.";
}

function hoverSource(sourceId, on) {
  $$(".phrase").forEach(el => {
    if (el.dataset.source !== sourceId) {
      el.style.opacity = on ? "0.22" : "";
    } else {
      el.classList.toggle("active", on);
    }
  });
}

/* ═══ DRAWER ═══ */
function openDrawer(pid) {
  const p = D.romansPhrases.find(x => x.id === pid);
  if (!p) return;
  const src = D.sources[p.source];
  state.activePhrase = pid;

  $$(".phrase").forEach(el => el.classList.toggle("active", el.dataset.pid === pid));

  $("#drawer-body").innerHTML = `
    <div class="drawer-chip" style="background:${src.tint};color:${src.ink}">
      <span class="swatch" style="background:${src.color};width:8px;height:8px;"></span>
      ${src.label}
    </div>
    <h2>Romans ${p.verse}</h2>
    <div class="romans-phrase greek">${p.greek}</div>
    <div class="romans-en">${p.english}</div>

    <div class="block">
      <div class="block-label">Greek source — ${p.sourceLxx.ref}</div>
      <div class="block-text greek">${p.sourceLxx.greek}</div>
      <div class="block-en">${p.sourceLxx.english}</div>
    </div>

    <div class="block">
      <div class="block-label">Hebrew source — ${p.sourceHebrew.ref}</div>
      <div class="block-text hebrew">${p.sourceHebrew.hebrew}</div>
      <div class="block-en">${p.sourceHebrew.english}</div>
    </div>

    <div class="note">
      <span class="note-flag">Commentary</span>
      ${p.note}
      ${p.alignmentNote ? `<br><br><span class="note-flag">Greek vs. Hebrew</span>${p.alignmentNote}` : ""}
    </div>
  `;
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
}
function closeDrawer() {
  $("#drawer").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
  $$(".phrase").forEach(el => el.classList.remove("active"));
  state.activePhrase = null;
}

/* ═══ CH6 · ALIGNMENT (DEPTH) ═══ */
function renderAlignTabs() {
  const tabs = $("#align-tabs");
  if (!tabs) return;
  tabs.innerHTML = "";
  D.romansPhrases.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "align-tab" + (i === state.alignIdx ? " active" : "");
    const words = p.english.split(" ");
    b.textContent = `${p.verse} · ${words.slice(0, 4).join(" ")}${words.length > 4 ? "…" : ""}`;
    b.addEventListener("click", () => { state.alignIdx = i; renderAlign(); });
    tabs.appendChild(b);
  });
}

function renderAlign() {
  const grid = $("#align-grid");
  if (!grid) return;
  renderAlignTabs();
  const p = D.romansPhrases[state.alignIdx];
  const src = D.sources[p.source];
  const isPs14 = p.source === "ps14";
  const fadeMissing = `opacity:0.45`;

  grid.innerHTML = `
    <div class="align-col anchor">
      <div class="col-label">Romans ${p.verse}</div>
      <div class="col-ref">Greek NT</div>
      <div class="col-greek">${p.greek}</div>
      <div class="col-en">${p.english}</div>
    </div>

    <div class="align-col" style="border-top:3px solid ${isPs14 ? src.color : 'var(--line-2)'};${isPs14 ? '' : fadeMissing}">
      <div class="col-label">Psalm 13/14 LXX</div>
      <div class="col-ref">${isPs14 ? p.sourceLxx.ref : "—"}</div>
      <div class="col-greek">${isPs14 ? p.sourceLxx.greek : "<span style='color:var(--ink-4);font-family:var(--serif);font-style:italic'>Not in short-form Psalm 13/14.</span>"}</div>
      <div class="col-en">${isPs14 ? p.sourceLxx.english : ""}</div>
    </div>

    <div class="align-col" style="border-top:3px solid ${!isPs14 ? src.color : 'var(--line-2)'};${!isPs14 ? '' : fadeMissing}">
      <div class="col-label">Other LXX source</div>
      <div class="col-ref">${!isPs14 ? p.sourceLxx.ref : "—"}</div>
      <div class="col-greek">${!isPs14 ? p.sourceLxx.greek : "<span style='color:var(--ink-4);font-family:var(--serif);font-style:italic'>Psalm 14 itself is the source.</span>"}</div>
      <div class="col-en">${!isPs14 ? p.sourceLxx.english : ""}</div>
    </div>

    <div class="align-col" style="border-top:3px solid ${isPs14 ? src.color : 'var(--line-2)'};${isPs14 ? '' : fadeMissing}">
      <div class="col-label">Psalm 14 Hebrew</div>
      <div class="col-ref">${isPs14 ? p.sourceHebrew.ref : "—"}</div>
      <div class="col-hebrew">${isPs14 ? p.sourceHebrew.hebrew : "<span style='color:var(--ink-4);font-family:var(--serif);font-style:italic;direction:ltr;display:block;text-align:left;'>Not in Hebrew Psalm 14.</span>"}</div>
      <div class="col-en">${isPs14 ? p.sourceHebrew.english : ""}</div>
    </div>

    <div class="align-col" style="border-top:3px solid ${!isPs14 ? src.color : 'var(--line-2)'};${!isPs14 ? '' : fadeMissing}">
      <div class="col-label">Other Hebrew source</div>
      <div class="col-ref">${!isPs14 ? p.sourceHebrew.ref : "—"}</div>
      <div class="col-hebrew">${!isPs14 ? p.sourceHebrew.hebrew : "<span style='color:var(--ink-4);font-family:var(--serif);font-style:italic;direction:ltr;display:block;text-align:left;'>Psalm 14 itself is the source.</span>"}</div>
      <div class="col-en">${!isPs14 ? p.sourceHebrew.english : ""}</div>
    </div>
  `;

  const labels = {
    "verbatim-lxx": "Near-verbatim LXX",
    "lxx-close": "Follows LXX closely",
    "lxx-only": "LXX-only feature",
    "compressed": "Compressed from source",
    "stable": "Stable across traditions",
    "paul-frames": "Paul's own framing"
  };
  $("#align-diag").innerHTML = `
    <div class="diag-chip ${p.alignment}">${labels[p.alignment] || p.alignment}</div>
    <div class="diag-body">${p.note}${p.alignmentNote ? ` <strong style="color:var(--ink);font-weight:600;"> · ${p.alignmentNote}</strong>` : ""}</div>
  `;
}

/* ═══ CH7 · BACK-ABSORPTION — flow from Paul into Psalm ═══ */
function renderBA() {
  const paulEl = $("#ba-paul-lines");
  const shortEl = $("#ba-short-lines");
  const longEl = $("#ba-long-lines");
  if (!paulEl) return;

  // Paul's 13–18 lines (the borrowed ones, from data)
  const paulLines = D.romansPhrases.filter(p => p.verse !== "3:10" && p.verse !== "3:11" && p.verse !== "3:12");
  paulEl.innerHTML = "";
  paulLines.forEach((p) => {
    const src = D.sources[p.source];
    const el = document.createElement("div");
    el.className = "ba-line";
    el.dataset.paulId = p.id;
    el.dataset.source = p.source;
    setCssVars(el, src);
    el.innerHTML = `
      <div class="ba-line-greek">${p.greek}</div>
      <div class="ba-line-en">${p.english}</div>
    `;
    paulEl.appendChild(el);
  });

  // Short form (always visible)
  shortEl.innerHTML = "";
  D.backAbsorption.shortForm.greek.forEach(line => {
    const src = D.sources[line.source];
    const el = document.createElement("div");
    el.className = "ba-line short-line";
    setCssVars(el, src);
    el.innerHTML = `
      <div class="ba-line-greek">${line.text}</div>
      ${line.en ? `<div class="ba-line-en">${line.en}</div>` : ""}
    `;
    shortEl.appendChild(el);
  });

  // Long form — ABSORBED portion only (skip first 2 which = short form)
  longEl.innerHTML = "";
  const absorbed = D.backAbsorption.longForm.greek.slice(2);
  absorbed.forEach((line, i) => {
    const src = D.sources[line.source];
    const el = document.createElement("div");
    el.className = "ba-line absorbed-line";
    el.dataset.idx = i;
    el.dataset.source = line.source;
    setCssVars(el, src);
    el.innerHTML = `
      <div class="ba-line-greek">${line.text}</div>
      ${line.en ? `<div class="ba-line-en">${line.en}</div>` : ""}
    `;
    longEl.appendChild(el);
  });
}

function drawBASvg() {
  const svg = $("#ba-svg");
  const flow = $("#ba-flow");
  if (!svg || !flow) return;
  const flowBox = flow.getBoundingClientRect();
  const W = flowBox.width, H = flowBox.height;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("width", W);
  svg.setAttribute("height", H);

  const paulLines = $$(".ba-paul .ba-line");
  const absorbedLines = $$(".ba-absorbed .ba-line");

  const paths = [];
  paulLines.forEach((pEl, i) => {
    const aEl = absorbedLines[i];
    if (!aEl) return;
    const pRect = pEl.getBoundingClientRect();
    const aRect = aEl.getBoundingClientRect();
    const sx = pRect.right - flowBox.left - 8;
    const sy = pRect.top + pRect.height / 2 - flowBox.top;
    const ex = aRect.left - flowBox.left + 8;
    const ey = aRect.top + aRect.height / 2 - flowBox.top;
    const midX = (sx + ex) / 2;
    const src = D.sources[pEl.dataset.source];
    paths.push(`<path d="M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}" stroke="${src.color}" data-idx="${i}"/>`);
  });
  svg.innerHTML = paths.join("");

  // Compute each path's length for accurate animation
  $$("path", svg).forEach(p => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
  });
}

function playBackAbsorption() {
  if (state.baPlaying) return;
  state.baPlaying = true;
  state.baDone = false;

  const btn = $("#ba-play");
  btn.classList.add("playing");
  $(".ba-play-lbl", btn).textContent = "Absorbing…";

  // Reset all
  $$(".ba-paul .ba-line").forEach(el => el.classList.remove("pulsing"));
  $$(".ba-absorbed .ba-line").forEach(el => el.classList.remove("ready"));
  $$("#ba-svg path").forEach(p => {
    p.classList.remove("flowing");
    const len = p.getTotalLength();
    p.style.strokeDashoffset = len;
  });
  $("#ba-expand-gate").classList.remove("ready");

  // Redraw in case of resize
  drawBASvg();

  // Reveal expand gate first
  setTimeout(() => $("#ba-expand-gate").classList.add("ready"), 200);

  const paulLines = $$(".ba-paul .ba-line");
  const absorbedLines = $$(".ba-absorbed .ba-line");
  const paths = $$("#ba-svg path");

  paulLines.forEach((pEl, i) => {
    const delay = 600 + i * 650;
    setTimeout(() => {
      pEl.classList.add("pulsing");
      const path = paths[i];
      if (path) {
        path.classList.add("flowing");
        // Animate to 0 — class rule is overridden by drawBASvg's inline style
        path.style.strokeDashoffset = "0";
      }
    }, delay);
    setTimeout(() => {
      if (absorbedLines[i]) absorbedLines[i].classList.add("ready");
    }, delay + 900);
    setTimeout(() => {
      pEl.classList.remove("pulsing");
    }, delay + 1200);
  });

  const total = 600 + paulLines.length * 650 + 1000;
  setTimeout(() => {
    state.baPlaying = false;
    state.baDone = true;
    btn.classList.remove("playing");
    btn.classList.add("done");
    $(".ba-play-lbl", btn).textContent = "Absorbed";
  }, total);
}

function resetBackAbsorption() {
  state.baPlaying = false;
  state.baDone = false;
  const btn = $("#ba-play");
  btn.classList.remove("playing", "done");
  $(".ba-play-lbl", btn).textContent = "Play the absorption";
  $$(".ba-paul .ba-line").forEach(el => el.classList.remove("pulsing"));
  $$(".ba-absorbed .ba-line").forEach(el => el.classList.remove("ready"));
  $$("#ba-svg path").forEach(p => {
    p.classList.remove("flowing");
    const len = p.getTotalLength();
    p.style.strokeDashoffset = len;
  });
  $("#ba-expand-gate").classList.remove("ready");
}

/* ═══ CH8 · TIMELINE ═══ */
function renderTimeline() {
  const tl = $("#tl");
  if (!tl) return;
  tl.innerHTML = "";
  D.timeline.forEach((t, i) => {
    const highlight = i === 3 || i === 6;
    const el = document.createElement("div");
    el.className = "tl-item" + (highlight ? " highlight" : "");
    el.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-era">${t.era}</div>
      <div class="tl-body">
        <h4>${t.label}</h4>
        <p>${t.body}</p>
      </div>
    `;
    tl.appendChild(el);
  });
}

/* ═══ CH9 · CLAIMS ═══ */
function renderClaims() {
  const c = $("#claims");
  if (!c) return;
  c.innerHTML = "";
  const labels = {
    "documented": "Documented",
    "strong-judgment": "Scholarly judgment",
    "noted-gap": "Noted gap"
  };
  D.claims.forEach(cl => {
    const el = document.createElement("div");
    el.className = "claim";
    el.innerHTML = `
      <span class="claim-level ${cl.level}">${labels[cl.level]}</span>
      <p>${cl.text}</p>
    `;
    c.appendChild(el);
  });
}

/* ═══ CH10 · ATTRIBUTION ═══ */
function renderAttribution() {
  const a = $("#attr");
  if (!a) return;
  a.innerHTML = "";
  D.attribution.forEach(it => {
    const r = document.createElement("div");
    r.className = "attr-row";
    r.innerHTML = `<h5>${it.kind}</h5><p>${it.detail}</p>`;
    a.appendChild(r);
  });
}

/* ═══ NAV DOTS ═══ */
function buildNavDots() {
  const nav = $("#nav-dots");
  const chapters = $$(".chapter");
  chapters.forEach(ch => {
    const btn = document.createElement("button");
    btn.className = "nav-dot";
    btn.dataset.ch = ch.dataset.ch;
    btn.innerHTML = `<span class="lbl">${ch.dataset.nav}</span>`;
    btn.addEventListener("click", () => {
      window.scrollTo({ top: ch.offsetTop - 20, behavior: "smooth" });
    });
    nav.appendChild(btn);
  });
}

function updateNavDots() {
  const chapters = $$(".chapter");
  const mid = window.scrollY + window.innerHeight * 0.4;
  let active = chapters[0];
  for (const ch of chapters) {
    if (ch.offsetTop <= mid) active = ch;
  }
  $$(".nav-dot").forEach(d => {
    const ch = d.dataset.ch;
    d.classList.toggle("active", active && active.dataset.ch === ch);
  });
}

function updateProgress() {
  const h = document.documentElement;
  const pct = h.scrollTop / Math.max(1, (h.scrollHeight - h.clientHeight));
  $("#scroll-progress").style.width = `${Math.min(100, pct * 100)}%`;
  $(".topnav").classList.toggle("scrolled", h.scrollTop > 20);
}

/* ═══ REVEAL OBSERVERS ═══ */
function setupReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || "0", 10);
        setTimeout(() => e.target.classList.add("in"), delay);
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "-10% 0px -10% 0px", threshold: 0.05 });
  $$(".reveal").forEach(el => io.observe(el));

  const tlIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); tlIo.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  setTimeout(() => $$(".tl-item").forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    tlIo.observe(el);
  }), 100);

  const claimIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); claimIo.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  setTimeout(() => $$(".claim").forEach((el, i) => {
    el.style.transitionDelay = `${i * 90}ms`;
    claimIo.observe(el);
  }), 100);

  // Auto-play back-absorption when it scrolls into view, once
  let baAutoPlayed = false;
  const baIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !baAutoPlayed && !state.baPlaying && !state.baDone) {
        baAutoPlayed = true;
        setTimeout(() => playBackAbsorption(), 500);
      }
    });
  }, { threshold: 0.15, rootMargin: "-10% 0px -10% 0px" });
  const baSec = document.querySelector(".chapter-ba");
  if (baSec) baIo.observe(baSec);
}

/* ═══ CH7 · BA AUTOPLAY — no-op stub kept for compatibility ═══ */
function updateBAScroll() { /* intentionally empty — autoplay handled above */ }

/* ═══ INIT ═══ */
function init() {
  renderHingeThread();
  renderMosaic();
  renderAlign();
  renderBA();
  renderTimeline();
  renderClaims();
  renderAttribution();

  buildNavDots();

  $("#drawer-close").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

  // Hinge aside → scroll to χρηστότητα sub-section in the tell chapter
  const haLink = $("#ha-to-tell");
  if (haLink) {
    haLink.addEventListener("click", (e) => {
      e.preventDefault();
      const target = $("#tell-greek-2");
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 160;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  }

  window.addEventListener("scroll", () => {
    updateProgress();
    updateNavDots();
    updateBAScroll();
  }, { passive: true });

  // Redraw SVG connectors on resize
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => { drawBASvg(); updateBAScroll(); }, 120);
  });

  setupReveals();
  updateProgress();
  updateNavDots();
  updateBAScroll();

  // Initial SVG draw once fonts have had a moment to settle
  setTimeout(() => drawBASvg(), 400);
  setTimeout(() => drawBASvg(), 1200);
}

document.addEventListener("DOMContentLoaded", init);
