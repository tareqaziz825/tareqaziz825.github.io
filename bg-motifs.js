/* ============================================================
   bg-motifs.js — animated SVG background drawings
   ------------------------------------------------------------
   Twenty-six line drawings taken from the stack they stand for:
   networks, kernels, curves, matrices, trees, pipelines.
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

  function rng(seed) {
    var s = seed >>> 0 || 1;
    return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1e5) / 1e5; };
  }

  function build() {
    var host = document.getElementById('bgMotifs');
    if (!host) return;

    var density  = parseFloat(host.getAttribute('data-density'))  || 1;
    var parallax = parseFloat(host.getAttribute('data-parallax'));
    if (isNaN(parallax)) parallax = 0.16;

    var docH = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    var rows = Math.max(8, Math.min(44, Math.round(docH / 340)));
    var cols = window.innerWidth < 760 ? 2 : (window.innerWidth > 1400 ? 4 : 3);
    var r = rng(20261023);

    var out = '', i = 0;
    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        if (r() > 0.70 * density) continue;                // leave gaps
        var m    = MOTIFS[i++ % MOTIFS.length];
        var left = (col * (100 / cols) + 2 + r() * (100 / cols - 14)).toFixed(2);
        var top  = (row * (100 / rows) + r() * (100 / rows * 0.6)).toFixed(3);
        var w    = (96 + r() * 140).toFixed(0);
        var rot  = (r() * 26 - 13).toFixed(1);
        var tint = r() > 0.74 ? ' tint-' + (1 + Math.floor(r() * 4)) : '';
        var dep  = (0.05 + r() * 0.22).toFixed(3);
        out += '<svg class="motif' + tint + '" viewBox="' + m.vb + '" aria-hidden="true" focusable="false"' +
               ' style="left:' + left + '%;top:' + top + '%;width:' + w + 'px"' +
               ' data-rot="' + rot + '" data-depth="' + dep + '">' + m.d + '</svg>';
      }
    }
    host.innerHTML = out;

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

  window.BgMotifs = { build: build, list: MOTIFS };

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
