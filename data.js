// Data model for Romans 3:10-18 catena analysis
// All English is paraphrastic/summary, written fresh. Greek and Hebrew are ancient source-language (public domain).

window.CATENA_DATA = {
  // Source books — each phrase in Romans is tagged by which book it came from.
  // Colors chosen as muted editorial palette, chroma ~0.08, varying hue.
  sources: {
    ps14:   { id: "ps14",   label: "Psalm 14",    shortLabel: "Ps 14", color: "oklch(0.55 0.09 25)",  tint: "oklch(0.96 0.025 25)",  ink: "oklch(0.35 0.09 25)",  note: "Greek numbering: Psalm 13. Psalm 53 is a close doublet in the Psalter — most of Paul's signals point to Psalm 14 (LXX 13) rather than its twin." },
    ps5:    { id: "ps5",    label: "Psalm 5:10 LXX",    shortLabel: "Ps 5",  color: "oklch(0.55 0.09 200)", tint: "oklch(0.96 0.025 200)", ink: "oklch(0.35 0.09 200)" },
    ps140:  { id: "ps140",  label: "Psalm 140:3 (LXX 139:4)", shortLabel: "Ps 140", color: "oklch(0.55 0.09 290)", tint: "oklch(0.96 0.025 290)", ink: "oklch(0.35 0.09 290)" },
    ps10:   { id: "ps10",   label: "Psalm 10:7 (LXX 9:28)",  shortLabel: "Ps 10", color: "oklch(0.60 0.11 75)",  tint: "oklch(0.96 0.030 75)",  ink: "oklch(0.38 0.11 75)"  },
    isa59:  { id: "isa59",  label: "Isaiah 59:7–8",     shortLabel: "Isa 59", color: "oklch(0.52 0.10 340)", tint: "oklch(0.96 0.025 340)", ink: "oklch(0.33 0.10 340)" },
    ps36:   { id: "ps36",   label: "Psalm 36:1 (LXX 35:2)",  shortLabel: "Ps 36", color: "oklch(0.55 0.08 165)", tint: "oklch(0.96 0.025 165)", ink: "oklch(0.35 0.08 165)" }
  },

  // Romans 3:10–18 broken into phrases. Each phrase knows its source and has parallel Greek/Hebrew source material.
  romansPhrases: [
    {
      id: "p1",
      verse: "3:10",
      source: "ps14",
      tag: "framing",
      greek: "οὐκ ἔστιν δίκαιος οὐδὲ εἷς",
      english: "There is no one righteous, not even one",
      note: "Paul's opening thesis. The line is not a verbatim LXX quotation; it frames the Psalm 14 block and may echo Ecclesiastes 7:20's 'there is not a righteous man' wording.",
      sourceLxx: {
        ref: "Ps 13(14):1 LXX",
        greek: "οὐκ ἔστιν ποιῶν χρηστότητα, οὐκ ἔστιν ἕως ἑνός",
        english: "There is no one doing good, not even one."
      },
      sourceHebrew: {
        ref: "Psalm 14:1",
        hebrew: "אֵין עֹשֵׂה־טוֹב",
        english: "There is no one doing good."
      },
      alignment: "paul-frames"
    },
    {
      id: "p2",
      verse: "3:11",
      source: "ps14",
      tag: "direct",
      greek: "οὐκ ἔστιν ὁ συνίων, οὐκ ἔστιν ὁ ἐκζητῶν τὸν θεόν",
      english: "No one understands; no one seeks God",
      note: "Direct echo of Psalm 14:2's picture of God looking down to find the wise and the seekers.",
      sourceLxx: {
        ref: "Ps 13(14):2 LXX",
        greek: "τοῦ ἰδεῖν εἰ ἔστι συνίων ἢ ἐκζητῶν τὸν θεόν",
        english: "To see if anyone understands or seeks God."
      },
      sourceHebrew: {
        ref: "Psalm 14:2",
        hebrew: "לִרְאוֹת הֲיֵשׁ מַשְׂכִּיל דֹּרֵשׁ אֶת־אֱלֹהִים",
        english: "To see whether there is any with insight who seeks God."
      },
      alignment: "lxx-close"
    },
    {
      id: "p3",
      verse: "3:12",
      source: "ps14",
      tag: "direct",
      greek: "πάντες ἐξέκλιναν, ἅμα ἠχρεώθησαν",
      english: "All have turned aside; together they have become corrupt",
      note: "This is the clearest anchor phrase. Word-for-word alignment with Psalm 13(14):3 LXX.",
      sourceLxx: {
        ref: "Ps 13(14):3 LXX",
        greek: "πάντες ἐξέκλιναν, ἅμα ἠχρεώθησαν",
        english: "All turned aside; together they were made useless."
      },
      sourceHebrew: {
        ref: "Psalm 14:3",
        hebrew: "הַכֹּל סָר יַחְדָּו נֶאֱלָחוּ",
        english: "All have turned away; together they have become corrupt."
      },
      alignment: "verbatim-lxx"
    },
    {
      id: "p4",
      verse: "3:12",
      source: "ps14",
      tag: "direct",
      greek: "οὐκ ἔστιν ὁ ποιῶν χρηστότητα, οὐκ ἔστιν ἕως ἑνός",
      english: "There is no one who does good, not even one",
      note: "Closes the Psalm 14 block. Paul is still walking verse by verse through Psalm 14 at this point.",
      sourceLxx: {
        ref: "Ps 13(14):3 LXX",
        greek: "οὐκ ἔστι ποιῶν χρηστότητα, οὐκ ἔστιν ἕως ἑνός",
        english: "There is no one doing kindness, not even one."
      },
      sourceHebrew: {
        ref: "Psalm 14:3",
        hebrew: "אֵין עֹשֵׂה־טוֹב אֵין גַּם־אֶחָד",
        english: "There is no one doing good, not even one."
      },
      alignment: "verbatim-lxx"
    },
    {
      id: "p5",
      verse: "3:13",
      source: "ps5",
      tag: "catena-shift",
      greek: "τάφος ἀνεῳγμένος ὁ λάρυγξ αὐτῶν, ταῖς γλώσσαις αὐτῶν ἐδολιοῦσαν",
      english: "Their throat is an open grave; with their tongues they keep deceiving",
      note: "Paul leaves Psalm 14 here. This line is Psalm 5:10 LXX — lifted almost verbatim.",
      sourceLxx: {
        ref: "Ps 5:10 LXX",
        greek: "τάφος ἀνεῳγμένος ὁ λάρυγξ αὐτῶν, ταῖς γλώσσαις αὐτῶν ἐδολιοῦσαν",
        english: "Their throat is an opened grave; with their tongues they were deceiving."
      },
      sourceHebrew: {
        ref: "Psalm 5:10",
        hebrew: "קֶבֶר־פָּתוּחַ גְּרוֹנָם לְשׁוֹנָם יַחֲלִיקוּן",
        english: "Their throat is an open grave; their tongue they make smooth (flatter)."
      },
      alignment: "verbatim-lxx",
      alignmentNote: "Paul's ἐδολιοῦσαν (\"they were deceiving\") tracks the Greek verb, not the Hebrew יַחֲלִיקוּן (\"they flatter / make smooth\")."
    },
    {
      id: "p6",
      verse: "3:13",
      source: "ps140",
      tag: "catena",
      greek: "ἰὸς ἀσπίδων ὑπὸ τὰ χείλη αὐτῶν",
      english: "The venom of asps is under their lips",
      note: "A different Psalm entirely. Paul is now stacking sources.",
      sourceLxx: {
        ref: "Ps 139(140):4 LXX",
        greek: "ἰὸς ἀσπίδων ὑπὸ τὰ χείλη αὐτῶν",
        english: "The venom of asps is under their lips."
      },
      sourceHebrew: {
        ref: "Psalm 140:4",
        hebrew: "חֲמַת עַכְשׁוּב תַּחַת שְׂפָתֵימוֹ",
        english: "The venom of an adder is under their lips."
      },
      alignment: "verbatim-lxx"
    },
    {
      id: "p7",
      verse: "3:14",
      source: "ps10",
      tag: "catena",
      greek: "ὧν τὸ στόμα ἀρᾶς καὶ πικρίας γέμει",
      english: "Whose mouth is full of cursing and bitterness",
      note: "The key diagnostic: πικρίας (\"bitterness\") is the LXX's word. The Hebrew has deceit/oppression instead.",
      sourceLxx: {
        ref: "Ps 9:28 LXX (= MT 10:7)",
        greek: "οὗ ἀρᾶς τὸ στόμα αὐτοῦ γέμει καὶ πικρίας καὶ δόλου",
        english: "Of whom the mouth is full of cursing and bitterness and deceit."
      },
      sourceHebrew: {
        ref: "Psalm 10:7",
        hebrew: "אָלָה פִּיהוּ מָלֵא וּמִרְמוֹת וָתֹךְ",
        english: "His mouth is full of cursing and deceits and oppression."
      },
      alignment: "lxx-only",
      alignmentNote: "πικρίας has no direct Hebrew counterpart in Psalm 10:7 — the Hebrew reads \"deceits and oppression.\" It is the clearest single diagnostic that Paul's wording here follows the Greek text tradition rather than the Hebrew."
    },
    {
      id: "p8",
      verse: "3:15",
      source: "isa59",
      tag: "catena",
      greek: "ὀξεῖς οἱ πόδες αὐτῶν ἐκχέαι αἷμα",
      english: "Their feet are swift to shed blood",
      note: "Paul leaves the Psalms entirely and reaches for Isaiah 59 — compressing its opening indictment.",
      sourceLxx: {
        ref: "Isa 59:7 LXX",
        greek: "οἱ δὲ πόδες αὐτῶν ἐπὶ πονηρίαν τρέχουσι, ταχινοὶ ἐκχέαι αἷμα",
        english: "Their feet run to evil, swift to shed blood."
      },
      sourceHebrew: {
        ref: "Isaiah 59:7",
        hebrew: "רַגְלֵיהֶם לָרַע יָרֻצוּ וִימַהֲרוּ לִשְׁפֹּךְ דָּם נָקִי",
        english: "Their feet run to evil, and they hurry to shed innocent blood."
      },
      alignment: "compressed"
    },
    {
      id: "p9",
      verse: "3:16",
      source: "isa59",
      tag: "catena",
      greek: "σύντριμμα καὶ ταλαιπωρία ἐν ταῖς ὁδοῖς αὐτῶν",
      english: "Ruin and misery mark their paths",
      note: "Continuing Isaiah 59, almost verbatim from the Greek.",
      sourceLxx: {
        ref: "Isa 59:7 LXX",
        greek: "σύντριμμα καὶ ταλαιπωρία ἐν ταῖς ὁδοῖς αὐτῶν",
        english: "Destruction and misery are in their ways."
      },
      sourceHebrew: {
        ref: "Isaiah 59:7",
        hebrew: "שֹׁד וָשֶׁבֶר בִּמְסִלּוֹתָם",
        english: "Devastation and destruction are in their highways."
      },
      alignment: "verbatim-lxx"
    },
    {
      id: "p10",
      verse: "3:17",
      source: "isa59",
      tag: "catena",
      greek: "καὶ ὁδὸν εἰρήνης οὐκ ἔγνωσαν",
      english: "And the way of peace they have not known",
      note: "Paul uses ἔγνωσαν (\"knew\") where the LXX has οἴδασιν (\"they know\") — a small shift, but both map to the same Hebrew יָדָעוּ.",
      sourceLxx: {
        ref: "Isa 59:8 LXX",
        greek: "καὶ ὁδὸν εἰρήνης οὐκ οἴδασι",
        english: "And a way of peace they do not know."
      },
      sourceHebrew: {
        ref: "Isaiah 59:8",
        hebrew: "דֶּרֶךְ שָׁלוֹם לֹא יָדָעוּ",
        english: "The way of peace they do not know."
      },
      alignment: "lxx-close"
    },
    {
      id: "p11",
      verse: "3:18",
      source: "ps36",
      tag: "catena-close",
      greek: "οὐκ ἔστιν φόβος θεοῦ ἀπέναντι τῶν ὀφθαλμῶν αὐτῶν",
      english: "There is no fear of God before their eyes",
      note: "Paul closes the catena by returning to the Psalms — Psalm 36:1 — framing the whole indictment with a diagnosis of the heart.",
      sourceLxx: {
        ref: "Ps 35:2 LXX",
        greek: "οὐκ ἔστι φόβος θεοῦ ἀπέναντι τῶν ὀφθαλμῶν αὐτοῦ",
        english: "There is no fear of God before his eyes."
      },
      sourceHebrew: {
        ref: "Psalm 36:2",
        hebrew: "אֵין־פַּחַד אֱלֹהִים לְנֶגֶד עֵינָיו",
        english: "There is no fear of God before his eyes."
      },
      alignment: "stable"
    }
  ],

  // The short (critical) vs. long (back-absorbed) forms of LXX Psalm 13 at v.3
  backAbsorption: {
    shortForm: {
      ref: "Psalm 13(14):3 LXX — short form (Rahlfs-Hanhart)",
      greek: [
        { text: "πάντες ἐξέκλιναν, ἅμα ἠχρεώθησαν·", en: "All have turned aside, together they have become corrupt;", source: "ps14" },
        { text: "οὐκ ἔστι ποιῶν χρηστότητα, οὐκ ἔστιν ἕως ἑνός.", en: "there is no one doing kindness, not even one.", source: "ps14" }
      ]
    },
    longForm: {
      ref: "Psalm 13(14):3 LXX — expanded form (present inline in Codex Sinaiticus; in the margin of Codex Vaticanus; absent from Codex Alexandrinus and the Lucianic recension)",
      greek: [
        { text: "πάντες ἐξέκλιναν, ἅμα ἠχρεώθησαν·", en: "All have turned aside, together they have become corrupt;", source: "ps14" },
        { text: "οὐκ ἔστι ποιῶν χρηστότητα, οὐκ ἔστιν ἕως ἑνός.", en: "there is no one doing kindness, not even one.", source: "ps14" },
        { text: "τάφος ἀνεῳγμένος ὁ λάρυγξ αὐτῶν,", en: "Their throat is an open grave;", source: "ps5" },
        { text: "ταῖς γλώσσαις αὐτῶν ἐδολιοῦσαν·", en: "with their tongues they were deceiving.", source: "ps5" },
        { text: "ἰὸς ἀσπίδων ὑπὸ τὰ χείλη αὐτῶν,", en: "The venom of asps is under their lips,", source: "ps140" },
        { text: "ὧν τὸ στόμα ἀρᾶς καὶ πικρίας γέμει·", en: "whose mouth is full of cursing and bitterness;", source: "ps10" },
        { text: "ὀξεῖς οἱ πόδες αὐτῶν ἐκχέαι αἷμα,", en: "their feet are swift to shed blood,", source: "isa59" },
        { text: "σύντριμμα καὶ ταλαιπωρία ἐν ταῖς ὁδοῖς αὐτῶν,", en: "ruin and misery mark their paths,", source: "isa59" },
        { text: "καὶ ὁδὸν εἰρήνης οὐκ ἔγνωσαν·", en: "and the way of peace they have not known.", source: "isa59" },
        { text: "οὐκ ἔστι φόβος θεοῦ ἀπέναντι τῶν ὀφθαλμῶν αὐτῶν.", en: "There is no fear of God before their eyes.", source: "ps36" }
      ]
    }
  },

  // Timeline of transmission
  timeline: [
    {
      era: "Pre-exilic / exilic",
      label: "Hebrew Psalm 14 composed",
      body: "The short Hebrew psalm takes shape: God looks down, finds no one seeking him, all have turned aside."
    },
    {
      era: "c. 3rd–2nd c. BC",
      label: "Psalm translated into Greek",
      body: "The Psalter enters Greek as part of the Septuagint project. Greek Psalm 13 preserves the short form found in the Hebrew."
    },
    {
      era: "c. 150 BC",
      label: "Earliest Jewish LXX witnesses",
      body: "Papyrus Rylands 458 (Deuteronomy) survives from roughly this period, the earliest known LXX manuscript fragment — but no Psalm 13/14 material survives from before Paul."
    },
    {
      era: "c. AD 57",
      label: "Paul writes Romans",
      body: "In Romans 3:10–18, Paul opens with a framing thesis, moves through Psalm 14, and then stitches in Psalms 5, 140, 10, Isaiah 59, and Psalm 36 to form one sustained indictment."
    },
    {
      era: "3rd c. AD",
      label: "Origen and the Hexapla",
      body: "Origen annotates Greek OT readings that lack Hebrew counterparts with critical marks — the kind of editorial concern that flags back-absorption when it is present."
    },
    {
      era: "4th c. AD",
      label: "Codex Sinaiticus (ℵ)",
      body: "The expansion matching Romans 3:13–18 appears inline in the body of Psalm 13, not in the margin — as if it were part of the psalm. The earliest surviving continuous Greek Psalter treats it as native."
    },
    {
      era: "4th c. AD",
      label: "Codex Vaticanus (B) — the scribal flag",
      body: "Vaticanus preserves the same expansion, but in the margin alongside Psalm 13 — and beside it a scribal note: 'nusquam exstant in Psalmis; undenam vero Apostolus excerpserit eos quærendum est' — 'these lines appear nowhere in the Psalms; where the Apostle took them from must be a subject of inquiry.' A 4th-century scribe, already flagging the passage as non-native to the psalm."
    },
    {
      era: "5th c. AD",
      label: "Codex Alexandrinus (A)",
      body: "Alexandrinus preserves the short form of Psalm 13 — no expansion. The Lucianic recension likewise transmits the short text. The witnesses split."
    },
    {
      era: "c. AD 384",
      label: "Jerome's Gallican Psalter",
      body: "Jerome's first revision of the Latin Psalter — made from the Greek LXX (Hexapla) — preserves the expanded Psalm 13 with Paul's catena already fused in. This is the Psalter that enters the Vulgate and shapes Western Christian liturgy for more than a millennium."
    },
    {
      era: "c. AD 392",
      label: "Jerome revises from the Hebrew",
      body: "A decade later, Jerome translates the Psalms again — this time directly from the Hebrew (iuxta Hebraeos). The result is a shorter Psalm 13 that matches the Masoretic text, with no catena. Jerome discusses the disparity between Greek and Hebrew psalters in the preface to Book 16 of his commentary on Isaiah."
    },
    {
      era: "5th–16th c. AD",
      label: "Vulgate and its long shadow",
      body: "The Vulgate circulates with Jerome's Gallican (catena-inclusive) Psalter, not his Hebrew revision. For most of Western history, readers of Psalm 13 in Latin are reading Romans 3:13–18 as part of the psalm itself."
    },
    {
      era: "Modern",
      label: "Critical editions",
      body: "Rahlfs-Hanhart prints the short form as original and treats the long form as a secondary addition, explicitly tying the expansion to Romans 3:13–18."
    }
  ],

  // Confidence-tagged claims
  claims: [
    { level: "documented", text: "Romans 3:13–18 reproduces lines from Psalms 5, 140, 10, Isaiah 59, and Psalm 36." },
    { level: "documented", text: "In Romans 3:14, πικρίας matches the LXX of Psalm 9:28 and has no direct counterpart in the Hebrew of Psalm 10:7 — the clearest single diagnostic that Paul's wording here follows the Greek tradition." },
    { level: "documented", text: "The expansion of Psalm 13(14):3 matching Romans 3:13–18 is preserved inline in Codex Sinaiticus, in the margin of Codex Vaticanus, and is absent from Codex Alexandrinus and the Lucianic recension." },
    { level: "documented", text: "A scribal note in Codex Vaticanus beside the marginal expansion observes that these lines appear nowhere else in the Psalms and asks where the Apostle took them from — an ancient witness itself flagging the passage as non-native." },
    { level: "strong-judgment", text: "The expansion is most likely secondary to the original Greek Psalm — Paul's catena absorbed back into the Psalter through scribal transmission." },
    { level: "strong-judgment", text: "For this catena, Paul's wording is most easily explained by a Greek text form rather than fresh translation from the Hebrew." },
    { level: "noted-gap", text: "No Greek manuscript of Psalm 13/14 survives from before Paul. The direction-of-influence argument rests on later manuscripts — including Vaticanus's own scribal flag — rather than a dated pre-Pauline witness." }
  ],

  // Source / attribution
  attribution: [
    { kind: "Greek NT text (Romans)", detail: "Displayed Greek follows the standard critical text tradition (Nestle–Aland / UBS). Ancient wording shown for study." },
    { kind: "Greek OT text (LXX)", detail: "Displayed Greek follows the Rahlfs–Hanhart critical text tradition for reference." },
    { kind: "Hebrew text", detail: "Displayed Hebrew follows the Masoretic tradition (BHS-family editions) for reference." },
    { kind: "English glosses", detail: "All English on this site is paraphrastic summary written for this project. No modern copyrighted translation is quoted." },
    { kind: "Text-critical claims", detail: "Claims about the short/long forms of Psalm 13/14 follow the editorial judgment of Rahlfs–Hanhart and standard text-critical scholarship." },
    { kind: "Manuscript references", detail: "References to Vaticanus, Sinaiticus, Alexandrinus, P.Oxy. 5101, and Papyrus Rylands 458 are drawn from published descriptions. The Vaticanus marginal note is quoted from Montfaucon, Hexaplorum Origenis Quae Supersunt (1713), vol. I, p. 492 — public domain." },
    { kind: "Key secondary sources", detail: "Marika Pulkkinen, 'The Use of the Psalms in Paul and in the Dead Sea Scrolls' (University of Helsinki, 2020; helda.helsinki.fi/handle/10138/314147), for the textual witnesses preserving the short vs. expanded forms of Psalm 13(14):3. Franz Delitzsch, commentary on the Psalms, for the classical statement of the back-absorption hypothesis and the Jerome citation." }
  ]
};
