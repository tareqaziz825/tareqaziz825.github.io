/* ============================================================
   bg-motifs.js — animated SVG background drawings
   ------------------------------------------------------------
   Twenty-six line drawings taken from the stack they stand for
   (networks, kernels, curves, matrices, trees, pipelines), mixed
   with twenty-three smaller marks for the languages, databases
   and tools.
   Placed deterministically across the whole page (same layout
   on every reload) and drifting on a gentle parallax.

   USAGE — on any page, right after <body>:

     <link rel="stylesheet" href="bg-motifs.css">
     <div class="bg" aria-hidden="true"><div class="bg-motifs" id="bgMotifs"></div></div>
     ...
     <script src="bg-motifs.js"></script>

   Tune density/strength from CSS: --motif-op, or data attributes
   on #bgMotifs: data-density="0.8" data-parallax="0.12"
   ============================================================ */
(function () {
  'use strict';

  var MOTIFS = [

  /* 1 · neural network — three dense layers */
  {vb:'0 0 120 90', d:
    '<path class="dim" d="M22 18 L60 15 M22 18 L60 45 M22 18 L60 75 M22 45 L60 15 M22 45 L60 45' +
    ' M22 45 L60 75 M22 72 L60 15 M22 72 L60 45 M22 72 L60 75' +
    ' M60 15 L98 30 M60 15 L98 60 M60 45 L98 30 M60 45 L98 60' +
    ' M60 75 L98 30 M60 75 L98 60"/>' +
    '<circle cx="22" cy="18" r="4.5"/><circle cx="22" cy="45" r="4.5"/><circle cx="22" cy="72" r="4.5"/>' +
    '<circle cx="60" cy="15" r="4.5"/><circle cx="60" cy="45" r="4.5"/><circle cx="60" cy="75" r="4.5"/>' +
    '<circle cx="98" cy="30" r="4.5"/><circle cx="98" cy="60" r="4.5"/>'},

  /* 2 · convolution kernel sliding over a feature map */
  {vb:'0 0 96 96', d:
    '<path class="dim" d="M8 8h80v80H8z M24 8v80 M40 8v80 M56 8v80 M72 8v80' +
    ' M8 24h80 M8 40h80 M8 56h80 M8 72h80"/>' +
    '<path d="M24 24h48v48H24z" stroke-width="1.9"/>' +
    '<path d="M40 24v48 M56 24v48 M24 40h48 M24 56h48"/>' +
    '<path d="M72 72l14 14 M80 86h6v-6" stroke-width="1.5"/>'},

  /* 3 · scatter plot with a fitted regression line */
  {vb:'0 0 110 90', d:
    '<path d="M14 8v70h84" stroke-width="1.6"/>' +
    '<path d="M18 70 L96 20" stroke-width="1.7"/>' +
    '<circle class="fillx" cx="26" cy="68" r="2.4"/><circle class="fillx" cx="36" cy="58" r="2.4"/>' +
    '<circle class="fillx" cx="44" cy="62" r="2.4"/><circle class="fillx" cx="52" cy="48" r="2.4"/>' +
    '<circle class="fillx" cx="60" cy="42" r="2.4"/><circle class="fillx" cx="68" cy="46" r="2.4"/>' +
    '<circle class="fillx" cx="76" cy="32" r="2.4"/><circle class="fillx" cx="86" cy="26" r="2.4"/>' +
    '<circle class="fillx" cx="32" cy="50" r="2.4"/><circle class="fillx" cx="70" cy="56" r="2.4"/>'},

  /* 4 · training loss curve, train vs validation */
  {vb:'0 0 110 80', d:
    '<path d="M14 6v62h86" stroke-width="1.6"/>' +
    '<path d="M18 14 C34 48, 48 58, 62 61 S86 64, 94 64" stroke-width="1.8"/>' +
    '<path class="dim" d="M18 18 C34 52, 48 59, 62 58 S86 56, 94 52" stroke-dasharray="4 4"/>' +
    '<path class="dim" d="M14 64h86"/>'},

  /* 5 · transformer attention arcs over a token row */
  {vb:'0 0 120 62', d:
    '<path d="M14 50h92" stroke-width="1.5"/>' +
    '<path d="M22 50v-6 M40 50v-6 M58 50v-6 M76 50v-6 M94 50v-6"/>' +
    '<path d="M22 44 Q40 10 58 44"/><path d="M40 44 Q58 6 76 44"/>' +
    '<path class="dim" d="M22 44 Q58 2 94 44"/><path class="dim" d="M58 44 Q76 14 94 44"/>' +
    '<rect x="17" y="50" width="10" height="7" rx="1.5"/><rect x="35" y="50" width="10" height="7" rx="1.5"/>' +
    '<rect x="53" y="50" width="10" height="7" rx="1.5"/><rect x="71" y="50" width="10" height="7" rx="1.5"/>' +
    '<rect x="89" y="50" width="10" height="7" rx="1.5"/>'},

  /* 6 · tensor — stacked isometric matrices */
  {vb:'0 0 100 90', d:
    '<path d="M18 30 L50 14 L82 30 L50 46 Z"/>' +
    '<path class="dim" d="M18 46 L50 30 L82 46 L50 62 Z"/>' +
    '<path class="dim" d="M18 62 L50 46 L82 62 L50 78 Z"/>' +
    '<path d="M18 30v32 M82 30v32 M50 46v32"/>' +
    '<path class="dim" d="M34 22 L66 38 M34 38 L66 22"/>'},

  /* 7 · decision tree */
  {vb:'0 0 110 86', d:
    '<circle cx="55" cy="12" r="5"/>' +
    '<path d="M51 16 L30 32 M59 16 L80 32"/>' +
    '<circle cx="28" cy="38" r="5"/><circle cx="82" cy="38" r="5"/>' +
    '<path d="M24 42 L14 60 M32 42 L42 60 M78 42 L68 60 M86 42 L96 60"/>' +
    '<rect x="8" y="62" width="13" height="11" rx="2"/>' +
    '<rect x="36" y="62" width="13" height="11" rx="2"/>' +
    '<rect x="62" y="62" width="13" height="11" rx="2"/>' +
    '<rect x="90" y="62" width="13" height="11" rx="2"/>'},

  /* 8 · confusion matrix */
  {vb:'0 0 86 86', d:
    '<path d="M22 22h56v56H22z"/>' +
    '<path d="M50 22v56 M22 50h56"/>' +
    '<path class="fillx" d="M24 24h24v24H24z" opacity=".32"/>' +
    '<path class="fillx" d="M52 52h24v24H52z" opacity=".32"/>' +
    '<path class="dim" d="M14 22v56 M22 14h56"/>' +
    '<path class="dim" d="M8 34h8 M8 62h8 M34 8v8 M62 8v8"/>'},

  /* 9 · k-means clustering with hulls */
  {vb:'0 0 104 90', d:
    '<circle class="dim" cx="30" cy="28" r="17"/><circle class="dim" cx="72" cy="36" r="15"/>' +
    '<circle class="dim" cx="50" cy="68" r="16"/>' +
    '<circle class="fillx" cx="24" cy="24" r="2.3"/><circle class="fillx" cx="34" cy="22" r="2.3"/>' +
    '<circle class="fillx" cx="28" cy="34" r="2.3"/><circle class="fillx" cx="38" cy="33" r="2.3"/>' +
    '<circle class="fillx" cx="68" cy="30" r="2.3"/><circle class="fillx" cx="78" cy="34" r="2.3"/>' +
    '<circle class="fillx" cx="70" cy="43" r="2.3"/>' +
    '<circle class="fillx" cx="45" cy="63" r="2.3"/><circle class="fillx" cx="55" cy="66" r="2.3"/>' +
    '<circle class="fillx" cx="49" cy="74" r="2.3"/>' +
    '<path d="M27 28l4 0 M70 36l4 0 M48 68l4 0"/>'},

  /* 10 · bounding box with corner ticks (OpenCV) */
  {vb:'0 0 104 80', d:
    '<path class="dim" d="M6 6h92v68H6z"/>' +
    '<path d="M30 24h44v34H30z" stroke-width="1.8"/>' +
    '<path d="M30 32V24h8 M66 24h8v8 M74 50v8h-8 M38 58h-8v-8" stroke-width="2"/>' +
    '<path class="dim" d="M44 38h16 M44 46h10"/>' +
    '<circle class="dim" cx="52" cy="41" r="13"/>'},

  /* 11 · git branch graph */
  {vb:'0 0 90 100', d:
    '<path d="M24 10v80"/>' +
    '<path class="dim" d="M24 34 C24 46, 62 40, 62 52 L62 72 C62 84, 24 78, 24 90"/>' +
    '<circle cx="24" cy="18" r="4"/><circle cx="24" cy="34" r="4"/>' +
    '<circle cx="62" cy="52" r="4"/><circle cx="62" cy="72" r="4"/>' +
    '<circle cx="24" cy="62" r="4"/><circle cx="24" cy="90" r="4"/>'},

  /* 12 · histogram with density curve */
  {vb:'0 0 104 80', d:
    '<path d="M12 8v62h84" stroke-width="1.6"/>' +
    '<rect x="20" y="52" width="10" height="18"/><rect x="33" y="42" width="10" height="28"/>' +
    '<rect x="46" y="26" width="10" height="44"/><rect x="59" y="36" width="10" height="34"/>' +
    '<rect x="72" y="50" width="10" height="20"/>' +
    '<path class="dim" d="M20 56 C34 40, 44 22, 51 22 S70 38, 82 54" stroke-width="1.6"/>'},

  /* 13 · container stack on a wave (Docker) */
  {vb:'0 0 100 76', d:
    '<rect x="18" y="40" width="14" height="12" rx="1.5"/><rect x="34" y="40" width="14" height="12" rx="1.5"/>' +
    '<rect x="50" y="40" width="14" height="12" rx="1.5"/><rect x="34" y="26" width="14" height="12" rx="1.5"/>' +
    '<rect x="50" y="26" width="14" height="12" rx="1.5"/><rect x="50" y="12" width="14" height="12" rx="1.5"/>' +
    '<path class="dim" d="M10 56 C24 66, 44 68, 62 62 C74 58, 84 50, 90 42"/>' +
    '<path class="dim" d="M70 44h18"/>'},

  /* 14 · signal / time-series window (TimeSformer, DPC-RNN) */
  {vb:'0 0 120 60', d:
    '<path d="M6 30 Q16 8 26 30 T46 30 T66 30 T86 30 T106 30" stroke-width="1.7"/>' +
    '<path class="dim" d="M6 30 Q16 44 26 30 T46 30 T66 30 T86 30 T106 30" stroke-dasharray="3 5"/>' +
    '<rect class="dim" x="40" y="8" width="30" height="44" rx="3"/>' +
    '<path d="M110 30h6"/>'},

  /* 15 · dataframe (Pandas) */
  {vb:'0 0 112 84', d:
    '<rect x="10" y="12" width="92" height="62" rx="3"/>' +
    '<path d="M10 28h92"/>' +
    '<path class="dim" d="M10 43h92 M10 58h92 M40 12v62 M70 12v62"/>' +
    '<path class="fillx" d="M12 14h26v12H12z" opacity=".28"/>' +
    '<path class="dim" d="M16 35h16 M46 35h16 M76 35h16 M16 50h12 M46 50h18 M76 50h10 M16 65h18 M46 65h12 M76 65h16"/>'},

  /* 16 · relational database — cylinder with a query */
  {vb:'0 0 96 100', d:
    '<ellipse cx="42" cy="20" rx="26" ry="9"/>' +
    '<path d="M16 20v46c0 5 11.6 9 26 9s26-4 26-9V20"/>' +
    '<path class="dim" d="M16 38c0 5 11.6 9 26 9s26-4 26-9"/>' +
    '<path class="dim" d="M16 54c0 5 11.6 9 26 9s26-4 26-9"/>' +
    '<circle class="dim" cx="72" cy="78" r="12"/><path class="dim" d="M81 87l9 9"/>'},

  /* 17 · gradient descent on a loss surface */
  {vb:'0 0 110 84', d:
    '<path d="M10 14 C34 86, 72 86, 100 16" stroke-width="1.7"/>' +
    '<path class="dim" d="M18 30 C38 78, 70 78, 92 32"/>' +
    '<circle class="fillx" cx="22" cy="36" r="3"/><circle class="fillx" cx="34" cy="56" r="3"/>' +
    '<circle class="fillx" cx="46" cy="68" r="3"/><circle class="fillx" cx="56" cy="72" r="3"/>' +
    '<path class="dim" d="M25 39l6 13 M37 59l6 7 M49 70l4 2"/>' +
    '<path class="dim" d="M10 74h92"/>'},

  /* 18 · ROC curve against the chance diagonal */
  {vb:'0 0 92 88', d:
    '<path d="M14 8v66h72" stroke-width="1.6"/>' +
    '<path class="dim" d="M14 74 L80 16" stroke-dasharray="4 4"/>' +
    '<path d="M14 74 C22 34, 40 20, 80 16" stroke-width="1.8"/>' +
    '<path class="fillx dim" d="M14 74 C22 34, 40 20, 80 16 L80 74 Z" opacity=".16"/>'},

  /* 19 · patch embedding — image split into tokens (ViT) */
  {vb:'0 0 120 72', d:
    '<rect x="8" y="12" width="48" height="48" rx="2"/>' +
    '<path class="dim" d="M24 12v48 M40 12v48 M8 28h48 M8 44h48"/>' +
    '<path d="M58 36h12" class="dim"/><path d="M66 32l5 4-5 4"/>' +
    '<rect x="76" y="18" width="9" height="9" rx="1.5"/><rect x="89" y="18" width="9" height="9" rx="1.5"/>' +
    '<rect x="102" y="18" width="9" height="9" rx="1.5"/>' +
    '<rect class="dim" x="76" y="31" width="9" height="9" rx="1.5"/><rect class="dim" x="89" y="31" width="9" height="9" rx="1.5"/>' +
    '<rect class="dim" x="102" y="31" width="9" height="9" rx="1.5"/>' +
    '<rect class="dim" x="76" y="44" width="9" height="9" rx="1.5"/><rect class="dim" x="89" y="44" width="9" height="9" rx="1.5"/>' +
    '<rect class="dim" x="102" y="44" width="9" height="9" rx="1.5"/>'},

  /* 20 · dual encoder with a similarity matrix (CLIP) */
  {vb:'0 0 116 92', d:
    '<rect x="10" y="16" width="26" height="20" rx="3"/>' +
    '<rect x="10" y="54" width="26" height="20" rx="3"/>' +
    '<path class="dim" d="M14 22h8 M14 27h14 M14 60h12 M14 65h8"/>' +
    '<path d="M36 26h14 M36 64h14" class="dim"/>' +
    '<path d="M46 22l5 4-5 4 M46 60l5 4-5 4"/>' +
    '<rect x="58" y="26" width="42" height="42" rx="2"/>' +
    '<path class="dim" d="M72 26v42 M86 26v42 M58 40h42 M58 54h42"/>' +
    '<path class="fillx" d="M60 28h10v10H60z" opacity=".3"/>' +
    '<path class="fillx" d="M74 42h10v10H74z" opacity=".3"/>' +
    '<path class="fillx" d="M88 56h10v10H88z" opacity=".3"/>'},

  /* 21 · boosting ensemble — weak learners summed */
  {vb:'0 0 116 78', d:
    '<rect x="8" y="12" width="22" height="18" rx="2"/><rect x="8" y="40" width="22" height="18" rx="2"/>' +
    '<rect class="dim" x="38" y="12" width="22" height="18" rx="2"/><rect class="dim" x="38" y="40" width="22" height="18" rx="2"/>' +
    '<path class="dim" d="M30 21h8 M30 49h8 M60 21h10 M60 49h10"/>' +
    '<circle cx="82" cy="35" r="10"/><path d="M82 29v12 M76 35h12"/>' +
    '<path d="M92 35h12" class="dim"/><path d="M100 31l5 4-5 4"/>' +
    '<path class="dim" d="M14 18h10 M14 23h6 M44 46h10 M44 51h6"/>'},

  /* 22 · class imbalance resampled (SMOTE) */
  {vb:'0 0 104 86', d:
    '<path d="M12 10v64h82" stroke-width="1.6"/>' +
    '<circle class="fillx" cx="26" cy="60" r="2.6"/><circle class="fillx" cx="36" cy="52" r="2.6"/>' +
    '<circle class="fillx" cx="30" cy="44" r="2.6"/><circle class="fillx" cx="44" cy="60" r="2.6"/>' +
    '<circle class="fillx" cx="22" cy="50" r="2.6"/><circle class="fillx" cx="40" cy="40" r="2.6"/>' +
    '<circle cx="70" cy="30" r="3.4"/><circle cx="82" cy="44" r="3.4"/>' +
    '<circle class="dim" cx="76" cy="37" r="3.4"/>' +
    '<path class="dim" d="M70 30 L82 44" stroke-dasharray="3 3"/>' +
    '<circle class="dim" cx="64" cy="52" r="3.4"/><path class="dim" d="M70 30 L64 52" stroke-dasharray="3 3"/>'},

  /* 23 · course module tree (Moodle / H5P) */
  {vb:'0 0 100 92', d:
    '<path d="M50 10 L84 24 L50 38 L16 24 Z"/>' +
    '<path class="dim" d="M30 31v12c0 5 9 9 20 9s20-4 20-9V31"/>' +
    '<rect class="dim" x="14" y="62" width="30" height="20" rx="3"/>' +
    '<rect class="dim" x="56" y="62" width="30" height="20" rx="3"/>' +
    '<path class="dim" d="M50 52v6 M29 58v4 M71 58v4 M29 58h42"/>' +
    '<path d="M25 69l6 3-6 3"/><path d="M66 72h12 M66 77h8" class="dim"/>'},

  /* 24 · survey form with ticks (KoboToolbox) */
  {vb:'0 0 84 100', d:
    '<rect x="12" y="16" width="60" height="76" rx="4"/>' +
    '<path d="M30 8h24a3 3 0 0 1 3 3v9H27v-9a3 3 0 0 1 3-3z"/>' +
    '<path d="M22 38l4 4 7-8"/><path d="M22 58l4 4 7-8"/>' +
    '<path class="dim" d="M22 76h8"/>' +
    '<path class="dim" d="M40 40h22 M40 60h18 M40 78h22"/>'},

  /* 25 · cloud compute with worker nodes (GCP) */
  {vb:'0 0 112 86', d:
    '<path d="M34 44a14 14 0 0 1-1-27.8 19 19 0 0 1 36.4 4.4A12 12 0 0 1 68 44z"/>' +
    '<path class="dim" d="M50 44v12 M24 68v-6h52v6 M50 56v6"/>' +
    '<rect x="14" y="68" width="20" height="14" rx="2"/>' +
    '<rect x="40" y="68" width="20" height="14" rx="2"/>' +
    '<rect x="66" y="68" width="20" height="14" rx="2"/>' +
    '<path class="dim" d="M18 75h6 M44 75h6 M70 75h6"/>'},

  /* 26 · terminal with a prompt and code braces */
  {vb:'0 0 116 80', d:
    '<rect x="8" y="10" width="100" height="60" rx="4"/>' +
    '<path d="M8 24h100"/>' +
    '<circle class="fillx dim" cx="18" cy="17" r="2.2"/><circle class="fillx dim" cx="26" cy="17" r="2.2"/>' +
    '<circle class="fillx dim" cx="34" cy="17" r="2.2"/>' +
    '<path d="M20 36l7 6-7 6"/><path class="dim" d="M32 48h22"/>' +
    '<path class="dim" d="M70 34c-5 0-6 2.5-6 7s-1 6-5 7c4 1 5 2.5 5 7s1 7 6 7"/>' +
    '<path class="dim" d="M86 34c5 0 6 2.5 6 7s1 6 5 7c-4 1-5 2.5-5 7s-1 7-6 7"/>'}
  ];

  /* Smaller marks for the languages, databases and tools — the same original
     emblems the Skills page uses (tech-icons.js), extracted from there so the
     two sets can never drift apart. 48x48 viewBox; tagged .glyph so they get
     a slightly heavier stroke to hold up at background size. */
  var GLYPHS = [
    {id:"python", d:"<path class=\"ti-draw\" d=\"M24 8h-6a6 6 0 0 0-6 6v4h12a6 6 0 0 1 6 6v6\"/><path class=\"ti-draw\" d=\"M24 40h6a6 6 0 0 0 6-6v-4H24a6 6 0 0 1-6-6v-6\"/><circle class=\"ti-dot\" cx=\"17\" cy=\"13.5\" r=\"1.7\"/><circle class=\"ti-dot\" cx=\"31\" cy=\"34.5\" r=\"1.7\"/>"},
    {id:"cpp", d:"<path class=\"ti-draw\" d=\"M19 9c-4 0-5 2.2-5 6.5S13 22 10 24c3 2 4 4.2 4 8.5S15 39 19 39\"/><path class=\"ti-draw\" d=\"M29 9c4 0 5 2.2 5 6.5S35 22 38 24c-3 2-4 4.2-4 8.5S33 39 29 39\"/><path class=\"ti-draw\" d=\"M24 19v10M19 24h10\"/>"},
    {id:"java", d:"<path class=\"ti-draw\" d=\"M14 23h18v9a6 6 0 0 1-6 6h-6a6 6 0 0 1-6-6z\"/><path class=\"ti-draw\" d=\"M32 26h3.5a4 4 0 0 1 0 8H32\"/><path class=\"ti-draw\" d=\"M19 17c2.2-2-1-3.8 1-5.8M26 17c2.2-2-1-3.8 1-5.8\"/><path class=\"ti-draw\" d=\"M12 42h22\"/>"},
    {id:"php", d:"<path class=\"ti-draw\" d=\"M17 16l-7 8 7 8M31 16l7 8-7 8\"/><path class=\"ti-draw\" d=\"M27 13l-6 22\"/>"},
    {id:"mysql", d:"<ellipse class=\"ti-draw\" cx=\"24\" cy=\"13\" rx=\"12\" ry=\"5\"/><path class=\"ti-draw\" d=\"M12 13v22c0 2.8 5.4 5 12 5s12-2.2 12-5V13\"/><path class=\"ti-draw\" d=\"M12 24c0 2.8 5.4 5 12 5s12-2.2 12-5\"/><path class=\"ti-dot\" d=\"M26 16l-5.5 8H24l-1.5 6 6-8.5h-3.5z\"/>"},
    {id:"postgresql", d:"<ellipse class=\"ti-draw\" cx=\"24\" cy=\"13\" rx=\"12\" ry=\"5\"/><path class=\"ti-draw\" d=\"M12 13v22c0 2.8 5.4 5 12 5s12-2.2 12-5V13\"/><path class=\"ti-draw\" d=\"M12 21c0 2.8 5.4 5 12 5s12-2.2 12-5\"/><path class=\"ti-draw\" d=\"M12 29c0 2.8 5.4 5 12 5s12-2.2 12-5\"/>"},
    {id:"pytorch", d:"<path class=\"ti-draw\" d=\"M24 6.5l13.5 7.8v15.4L24 37.5 10.5 29.7V14.3z\"/><path class=\"ti-draw\" d=\"M24 15.5c4 4.2 6 6.4 6 9.2a6 6 0 0 1-12 0c0-2 .9-3.6 2.4-5.2\"/>"},
    {id:"tensorflow", d:"<path class=\"ti-draw\" d=\"M24 7.5l13 7.5-13 7.5-13-7.5z\"/><path class=\"ti-draw\" d=\"M11 22.5L24 30l13-7.5\"/><path class=\"ti-draw\" d=\"M11 30L24 37.5 37 30\"/>"},
    {id:"sklearn", d:"<path class=\"ti-draw\" d=\"M9 8v32h32\"/><path class=\"ti-draw\" d=\"M13 35C21 29 26 20 41 13\"/><circle class=\"ti-dot\" cx=\"17\" cy=\"29\" r=\"2.1\"/><circle class=\"ti-dot\" cx=\"23\" cy=\"34\" r=\"2.1\"/><circle class=\"ti-dot\" cx=\"30\" cy=\"17\" r=\"2.1\"/><circle class=\"ti-dot\" cx=\"35\" cy=\"23\" r=\"2.1\"/>"},
    {id:"numpy", d:"<path class=\"ti-draw\" d=\"M15 10h-5v28h5M33 10h5v28h-5\"/><circle class=\"ti-dot\" cx=\"19\" cy=\"17\" r=\"2.7\"/><circle class=\"ti-dot\" cx=\"29\" cy=\"17\" r=\"2.7\"/><circle class=\"ti-dot\" cx=\"19\" cy=\"24\" r=\"2.7\"/><circle class=\"ti-dot\" cx=\"29\" cy=\"24\" r=\"2.7\"/><circle class=\"ti-dot\" cx=\"19\" cy=\"31\" r=\"2.7\"/><circle class=\"ti-dot\" cx=\"29\" cy=\"31\" r=\"2.7\"/>"},
    {id:"pandas", d:"<rect class=\"ti-draw\" x=\"8\" y=\"11\" width=\"32\" height=\"26\" rx=\"3.5\"/><path class=\"ti-draw\" d=\"M8 19h32M19 19v18M30 19v18\"/>"},
    {id:"matplotlib", d:"<path class=\"ti-draw\" d=\"M9 8v32h32\"/><path class=\"ti-draw\" d=\"M14 33l7-10 6 5 10-14\"/><path class=\"ti-draw\" d=\"M15 40v-5M22 40v-9M29 40v-6M36 40v-12\"/>"},
    {id:"opencv", d:"<circle class=\"ti-draw\" cx=\"24\" cy=\"24\" r=\"14\"/><path class=\"ti-draw\" d=\"M24 10l8 14M38 24H22M30 36l-8-14M24 38l-8-14M10 24h16M18 12l8 14\"/>"},
    {id:"git", d:"<path class=\"ti-draw\" d=\"M16 15v18\"/><path class=\"ti-draw\" d=\"M16 23h7a5 5 0 0 1 5 5v3\"/><circle class=\"ti-dot\" cx=\"16\" cy=\"11\" r=\"3.4\"/><circle class=\"ti-dot\" cx=\"16\" cy=\"37\" r=\"3.4\"/><circle class=\"ti-dot\" cx=\"28\" cy=\"34.5\" r=\"3.4\"/>"},
    {id:"docker", d:"<path class=\"ti-draw\" d=\"M11 25h6v6h-6zM19 25h6v6h-6zM27 25h6v6h-6zM19 18h6v6h-6z\"/><path class=\"ti-draw\" d=\"M7 35c3 0 4.5-2 6.5-2s3.5 2 6.5 2 4.5-2 6.5-2 3.5 2 6.5 2 4.5-2 6.5-2\"/>"},
    {id:"vscode", d:"<rect class=\"ti-draw\" x=\"8\" y=\"10\" width=\"32\" height=\"28\" rx=\"4\"/><path class=\"ti-draw\" d=\"M8 17h32\"/><path class=\"ti-draw\" d=\"M20 23l-4 4.5 4 4.5M28 23l4 4.5-4 4.5\"/>"},
    {id:"jupyter", d:"<rect class=\"ti-draw\" x=\"8\" y=\"10\" width=\"32\" height=\"28\" rx=\"4\"/><path class=\"ti-draw\" d=\"M15 15.5l4 3-4 3\"/><path class=\"ti-draw\" d=\"M23 18.5h12M15 26h20M15 32h13\"/>"},
    {id:"colab", d:"<path class=\"ti-draw\" d=\"M16 35a8 8 0 0 1-.7-16 11 11 0 0 1 20.9 2.7A7 7 0 0 1 34 35z\"/><path class=\"ti-draw\" d=\"M21 22l8.5 4.8-8.5 4.8z\"/>"},
    {id:"gcp", d:"<path class=\"ti-draw\" d=\"M15 32a7 7 0 0 1-.5-13.9 10 10 0 0 1 19 2.3A6 6 0 0 1 32 32z\"/><path class=\"ti-draw\" d=\"M24 32v7M17 39h14\"/><circle class=\"ti-dot\" cx=\"24\" cy=\"24\" r=\"2.6\"/>"},
    {id:"wordpress", d:"<rect class=\"ti-draw\" x=\"8\" y=\"10\" width=\"32\" height=\"28\" rx=\"4\"/><path class=\"ti-draw\" d=\"M8 17.5h32\"/><rect class=\"ti-draw\" x=\"13\" y=\"22\" width=\"9\" height=\"11\" rx=\"2\"/><path class=\"ti-draw\" d=\"M27 23h8M27 27.5h8M27 32h5\"/>"},
    {id:"moodle", d:"<path class=\"ti-draw\" d=\"M24 10l15 6.5L24 23 9 16.5z\"/><path class=\"ti-draw\" d=\"M16 20v8.5c0 2.6 3.6 4.5 8 4.5s8-1.9 8-4.5V20\"/><path class=\"ti-draw\" d=\"M39 16.5v10\"/>"},
    {id:"h5p", d:"<rect class=\"ti-draw\" x=\"8\" y=\"10\" width=\"32\" height=\"22\" rx=\"4\"/><path class=\"ti-draw\" d=\"M20 16l8 5-8 5z\"/><path class=\"ti-draw\" d=\"M24 32v6M16 38h16\"/>"},
    {id:"kobo", d:"<rect class=\"ti-draw\" x=\"11\" y=\"12\" width=\"26\" height=\"29\" rx=\"4\"/><path class=\"ti-draw\" d=\"M19 8h10a2 2 0 0 1 2 2v5H17v-5a2 2 0 0 1 2-2z\"/><path class=\"ti-draw\" d=\"M17 24l2.5 2.5L24 21M17 33l2.5 2.5L24 30\"/><path class=\"ti-draw\" d=\"M28 24.5h4M28 33.5h4\"/>"}
  ];

  function rng(seed) {
    var s = seed >>> 0 || 1;
    return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1e5) / 1e5; };
  }

  /* Widths are authored against a ~1280px-wide viewport, then expressed
     as a vw ratio so every drawing grows and shrinks with the screen.
     The clamp keeps it between half and 1.5x the authored size, so the
     set still reads on a 360px phone and never bloats on an ultrawide. */
  var REF_W = 1280;
  function sizeFor(base) {
    var vw  = (base / REF_W * 100).toFixed(2);
    var lo  = (base * 0.52).toFixed(0);
    var hi  = (base * 1.5).toFixed(0);
    return 'clamp(' + lo + 'px, ' + vw + 'vw, ' + hi + 'px)';
  }


  /* ---- a sparse set inside each page sheet ----
     Count and size both follow the panel's own box, so a tall sheet
     gets more marks than a short one and every mark keeps its
     proportion to the screen. */
  function buildPanels() {
    var sheets = document.querySelectorAll('.sheet.app-panel');
    var pr = rng(20261025);

    for (var p = 0; p < sheets.length; p++) {
      var sheet = sheets[p];
      var old = sheet.querySelector(':scope > .panel-motifs');
      if (old) old.parentNode.removeChild(old);

      var h = sheet.offsetHeight, w = sheet.offsetWidth;
      if (!h || !w) continue;
      // roughly one mark per 260x300 of panel, capped so it stays quiet
      var n = Math.max(2, Math.min(14, Math.round((h * w) / 95000)));

      var html = '', k = 0;
      for (var i = 0; i < n; i++) {
        var vb, d, base, cls;
        if (pr() < 0.5) {
          vb = '0 0 48 48';
          d = GLYPHS[(gpi++) % GLYPHS.length].d;
          base = 52 + pr() * 40;
          cls = 'motif glyph';
        } else {
          var m = MOTIFS[(dpi++) % MOTIFS.length];
          vb = m.vb; d = m.d;
          base = 110 + pr() * 120;
          cls = 'motif';
        }
        var left = (3 + pr() * 82).toFixed(2);
        var top  = (2 + (i / n) * 94 + pr() * (70 / n)).toFixed(2);
        var rot  = (pr() * 26 - 13).toFixed(1);
        html += '<svg class="' + cls + '" viewBox="' + vb + '" aria-hidden="true" focusable="false"' +
                ' style="left:' + left + '%;top:' + top + '%;width:' + sizeFor(base) +
                ';--m-i:' + (k++) + ';transform:rotate(' + rot + 'deg)">' + d + '</svg>';
      }
      var layer = document.createElement('div');
      layer.className = 'panel-motifs';
      layer.setAttribute('aria-hidden', 'true');
      layer.innerHTML = html;
      sheet.insertBefore(layer, sheet.firstChild);
    }
  }
  var gpi = 7, dpi = 3;   // offset so panels don't echo the page layer

  function build() {
    var host = document.getElementById('bgMotifs');
    if (!host) return;

    var density  = parseFloat(host.getAttribute('data-density'))  || 1;
    var parallax = parseFloat(host.getAttribute('data-parallax'));
    if (isNaN(parallax)) parallax = 0.16;

    var docH = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    var rows = Math.max(10, Math.min(60, Math.round(docH / 250)));
    var cols = window.innerWidth < 760 ? 2 : (window.innerWidth > 1400 ? 4 : 3);
    var r = rng(20261023);

    var out = '', di = 0, gi = 0;
    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        if (r() > 0.74 * density) continue;                // leave gaps

        // a few small tech marks for every larger diagram
        var vb, d, base, cls;
        if (r() < 0.58) {
          vb   = '0 0 48 48';
          d    = GLYPHS[gi++ % GLYPHS.length].d;
          base = 44 + r() * 44;            // reads well at ~1280px wide
          cls  = 'motif glyph';
        } else {
          var m = MOTIFS[di++ % MOTIFS.length];
          vb   = m.vb;
          d    = m.d;
          base = 96 + r() * 140;
          cls  = 'motif';
        }
        // size is a ratio of the viewport, bounded so it never gets
        // lost on a phone or cartoonish on an ultrawide
        var w = sizeFor(base);

        var left = (col * (100 / cols) + 2 + r() * (100 / cols - 12)).toFixed(2);
        var top  = (row * (100 / rows) + r() * (100 / rows * 0.7)).toFixed(3);
        var rot  = (r() * 30 - 15).toFixed(1);
        var tint = r() > 0.74 ? ' tint-' + (1 + Math.floor(r() * 4)) : '';
        var dep  = (0.05 + r() * 0.22).toFixed(3);
        out += '<svg class="' + cls + tint + '" viewBox="' + vb + '" aria-hidden="true" focusable="false"' +
               ' style="left:' + left + '%;top:' + top + '%;width:' + w + '"' +
               ' data-rot="' + rot + '" data-depth="' + dep + '">' + d + '</svg>';
      }
    }
    host.innerHTML = out;

    buildPanels();

    els = [].slice.call(host.querySelectorAll('.motif'));
    els.forEach(function (el, n) {
      el.style.transform = 'rotate(' + el.dataset.rot + 'deg)';
      el.style.setProperty('--m-i', n);
    });
    host.classList.add('ready');

    depthScale = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : parallax;
    bindScroll();
    run();
  }

  /* ---- parallax: one listener for the life of the page ---- */
  var els = [], depthScale = 0, ticking = false, bound = false;

  function run() {
    var y = window.scrollY;
    for (var k = 0; k < els.length; k++) {
      var el = els[k];
      el.style.transform = depthScale
        ? 'translate3d(0,' + (-y * el.dataset.depth * depthScale).toFixed(1) + 'px,0) rotate(' + el.dataset.rot + 'deg)'
        : 'rotate(' + el.dataset.rot + 'deg)';
    }
    ticking = false;
  }

  function bindScroll() {
    if (bound) return;
    bound = true;
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(run); }
    }, { passive: true });
  }

  window.BgMotifs = { build: build, diagrams: MOTIFS, glyphs: GLYPHS };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();

  // re-place once images settle the page height, and on a real resize
  window.addEventListener('load', build);
  var rt, lastW = window.innerWidth;
  window.addEventListener('resize', function () {
    if (Math.abs(window.innerWidth - lastW) < 60) return;   // ignore mobile URL-bar jitter
    lastW = window.innerWidth;
    clearTimeout(rt); rt = setTimeout(build, 220);
  }, { passive: true });
})();
