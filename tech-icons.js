/* ============================================================
   tech-icons.js — reusable animated tech emblems
   ------------------------------------------------------------
   Original geometric SVG emblems (no third-party logo artwork),
   drawn in one consistent visual language and animated with CSS.

   USAGE — drop this anywhere on any page:

     <div class="tech-badges"
          data-tech-badges="python,pytorch,git,docker"
          data-badge-label="Technologies I work with"></div>

   Optional attributes on the container:
     data-badge-label="..."   small heading above the grid (omit for none)
     data-badge-size="sm"     compact badges
     data-badge-style="plain" no card background, emblem + name only

   Then include, before scripts.js:
     <link rel="stylesheet" href="tech-icons.css">
     <script src="tech-icons.js"></script>

   Available ids are listed in TECH below. Add your own by
   appending an entry: id: { name, accent, art }.
   ============================================================ */
(function () {
  'use strict';

  /* palette keys map to the CSS custom properties already in styles.css */
  var TECH = {
    /* ── languages ── */
    python: { name: 'Python', accent: 'blue', art:
      '<path class="ti-draw" d="M24 8h-6a6 6 0 0 0-6 6v4h12a6 6 0 0 1 6 6v6"/>' +
      '<path class="ti-draw" d="M24 40h6a6 6 0 0 0 6-6v-4H24a6 6 0 0 1-6-6v-6"/>' +
      '<circle class="ti-dot" cx="17" cy="13.5" r="1.7"/>' +
      '<circle class="ti-dot" cx="31" cy="34.5" r="1.7"/>' },

    cpp: { name: 'C / C++', accent: 'purple', art:
      '<path class="ti-draw" d="M19 9c-4 0-5 2.2-5 6.5S13 22 10 24c3 2 4 4.2 4 8.5S15 39 19 39"/>' +
      '<path class="ti-draw" d="M29 9c4 0 5 2.2 5 6.5S35 22 38 24c-3 2-4 4.2-4 8.5S33 39 29 39"/>' +
      '<path class="ti-draw" d="M24 19v10M19 24h10"/>' },

    java: { name: 'Java', accent: 'orange', art:
      '<path class="ti-draw" d="M14 23h18v9a6 6 0 0 1-6 6h-6a6 6 0 0 1-6-6z"/>' +
      '<path class="ti-draw" d="M32 26h3.5a4 4 0 0 1 0 8H32"/>' +
      '<path class="ti-draw" d="M19 17c2.2-2-1-3.8 1-5.8M26 17c2.2-2-1-3.8 1-5.8"/>' +
      '<path class="ti-draw" d="M12 42h22"/>' },

    php: { name: 'PHP', accent: 'purple', art:
      '<path class="ti-draw" d="M17 16l-7 8 7 8M31 16l7 8-7 8"/>' +
      '<path class="ti-draw" d="M27 13l-6 22"/>' },

    /* ── databases ── */
    mysql: { name: 'MySQL', accent: 'blue', art:
      '<ellipse class="ti-draw" cx="24" cy="13" rx="12" ry="5"/>' +
      '<path class="ti-draw" d="M12 13v22c0 2.8 5.4 5 12 5s12-2.2 12-5V13"/>' +
      '<path class="ti-draw" d="M12 24c0 2.8 5.4 5 12 5s12-2.2 12-5"/>' +
      '<path class="ti-dot" d="M26 16l-5.5 8H24l-1.5 6 6-8.5h-3.5z"/>' },

    postgresql: { name: 'PostgreSQL', accent: 'green', art:
      '<ellipse class="ti-draw" cx="24" cy="13" rx="12" ry="5"/>' +
      '<path class="ti-draw" d="M12 13v22c0 2.8 5.4 5 12 5s12-2.2 12-5V13"/>' +
      '<path class="ti-draw" d="M12 21c0 2.8 5.4 5 12 5s12-2.2 12-5"/>' +
      '<path class="ti-draw" d="M12 29c0 2.8 5.4 5 12 5s12-2.2 12-5"/>' },

    /* ── ML / data ── */
    pytorch: { name: 'PyTorch', accent: 'orange', art:
      '<path class="ti-draw" d="M24 6.5l13.5 7.8v15.4L24 37.5 10.5 29.7V14.3z"/>' +
      '<path class="ti-draw" d="M24 15.5c4 4.2 6 6.4 6 9.2a6 6 0 0 1-12 0c0-2 .9-3.6 2.4-5.2"/>' },

    tensorflow: { name: 'TensorFlow', accent: 'yellow', art:
      '<path class="ti-draw" d="M24 7.5l13 7.5-13 7.5-13-7.5z"/>' +
      '<path class="ti-draw" d="M11 22.5L24 30l13-7.5"/>' +
      '<path class="ti-draw" d="M11 30L24 37.5 37 30"/>' },

    sklearn: { name: 'Scikit-learn', accent: 'orange', art:
      '<path class="ti-draw" d="M9 8v32h32"/>' +
      '<path class="ti-draw" d="M13 35C21 29 26 20 41 13"/>' +
      '<circle class="ti-dot" cx="17" cy="29" r="2.1"/>' +
      '<circle class="ti-dot" cx="23" cy="34" r="2.1"/>' +
      '<circle class="ti-dot" cx="30" cy="17" r="2.1"/>' +
      '<circle class="ti-dot" cx="35" cy="23" r="2.1"/>' },

    numpy: { name: 'NumPy', accent: 'blue', art:
      '<path class="ti-draw" d="M15 10h-5v28h5M33 10h5v28h-5"/>' +
      '<circle class="ti-dot" cx="19" cy="17" r="2.7"/>' +
      '<circle class="ti-dot" cx="29" cy="17" r="2.7"/>' +
      '<circle class="ti-dot" cx="19" cy="24" r="2.7"/>' +
      '<circle class="ti-dot" cx="29" cy="24" r="2.7"/>' +
      '<circle class="ti-dot" cx="19" cy="31" r="2.7"/>' +
      '<circle class="ti-dot" cx="29" cy="31" r="2.7"/>' },

    pandas: { name: 'Pandas', accent: 'purple', art:
      '<rect class="ti-draw" x="8" y="11" width="32" height="26" rx="3.5"/>' +
      '<path class="ti-draw" d="M8 19h32M19 19v18M30 19v18"/>' },

    matplotlib: { name: 'Matplotlib', accent: 'green', art:
      '<path class="ti-draw" d="M9 8v32h32"/>' +
      '<path class="ti-draw" d="M14 33l7-10 6 5 10-14"/>' +
      '<path class="ti-draw" d="M15 40v-5M22 40v-9M29 40v-6M36 40v-12"/>' },

    opencv: { name: 'OpenCV', accent: 'green', art:
      '<circle class="ti-draw" cx="24" cy="24" r="14"/>' +
      '<path class="ti-draw" d="M24 10l8 14M38 24H22M30 36l-8-14M24 38l-8-14M10 24h16M18 12l8 14"/>' },

    neuralnet: { name: 'Deep Learning', accent: 'purple', art:
      '<path class="ti-draw" d="M13 13l12 5M13 24l12-6M13 35l12-5M13 24l12 6M25 18l11 6M25 30l11-6"/>' +
      '<circle class="ti-dot" cx="13" cy="13" r="2.9"/>' +
      '<circle class="ti-dot" cx="13" cy="24" r="2.9"/>' +
      '<circle class="ti-dot" cx="13" cy="35" r="2.9"/>' +
      '<circle class="ti-dot" cx="25" cy="18" r="2.9"/>' +
      '<circle class="ti-dot" cx="25" cy="30" r="2.9"/>' +
      '<circle class="ti-dot" cx="36" cy="24" r="2.9"/>' },

    transformer: { name: 'Transformers', accent: 'blue', art:
      '<rect class="ti-draw" x="10" y="10" width="28" height="28" rx="4"/>' +
      '<path class="ti-draw" d="M19.3 10v28M28.6 10v28M10 19.3h28M10 28.6h28"/>' +
      '<rect class="ti-dot" x="20.3" y="11" width="7.3" height="7.3" rx="1.4"/>' +
      '<rect class="ti-dot" x="29.6" y="20.3" width="7.4" height="7.3" rx="1.4"/>' +
      '<rect class="ti-dot" x="11" y="29.6" width="7.3" height="7.4" rx="1.4"/>' },

    /* ── tools & platforms ── */
    git: { name: 'Git &amp; GitHub', accent: 'orange', art:
      '<path class="ti-draw" d="M16 15v18"/>' +
      '<path class="ti-draw" d="M16 23h7a5 5 0 0 1 5 5v3"/>' +
      '<circle class="ti-dot" cx="16" cy="11" r="3.4"/>' +
      '<circle class="ti-dot" cx="16" cy="37" r="3.4"/>' +
      '<circle class="ti-dot" cx="28" cy="34.5" r="3.4"/>' },

    docker: { name: 'Docker', accent: 'blue', art:
      '<path class="ti-draw" d="M11 25h6v6h-6zM19 25h6v6h-6zM27 25h6v6h-6zM19 18h6v6h-6z"/>' +
      '<path class="ti-draw" d="M7 35c3 0 4.5-2 6.5-2s3.5 2 6.5 2 4.5-2 6.5-2 3.5 2 6.5 2 4.5-2 6.5-2"/>' },

    vscode: { name: 'VS Code', accent: 'blue', art:
      '<rect class="ti-draw" x="8" y="10" width="32" height="28" rx="4"/>' +
      '<path class="ti-draw" d="M8 17h32"/>' +
      '<path class="ti-draw" d="M20 23l-4 4.5 4 4.5M28 23l4 4.5-4 4.5"/>' },

    jupyter: { name: 'Jupyter', accent: 'orange', art:
      '<rect class="ti-draw" x="8" y="10" width="32" height="28" rx="4"/>' +
      '<path class="ti-draw" d="M15 15.5l4 3-4 3"/>' +
      '<path class="ti-draw" d="M23 18.5h12M15 26h20M15 32h13"/>' },

    colab: { name: 'Google Colab', accent: 'yellow', art:
      '<path class="ti-draw" d="M16 35a8 8 0 0 1-.7-16 11 11 0 0 1 20.9 2.7A7 7 0 0 1 34 35z"/>' +
      '<path class="ti-draw" d="M21 22l8.5 4.8-8.5 4.8z"/>' },

    gcp: { name: 'Google Cloud', accent: 'blue', art:
      '<path class="ti-draw" d="M15 32a7 7 0 0 1-.5-13.9 10 10 0 0 1 19 2.3A6 6 0 0 1 32 32z"/>' +
      '<path class="ti-draw" d="M24 32v7M17 39h14"/>' +
      '<circle class="ti-dot" cx="24" cy="24" r="2.6"/>' },

    wordpress: { name: 'WordPress', accent: 'purple', art:
      '<rect class="ti-draw" x="8" y="10" width="32" height="28" rx="4"/>' +
      '<path class="ti-draw" d="M8 17.5h32"/>' +
      '<rect class="ti-draw" x="13" y="22" width="9" height="11" rx="2"/>' +
      '<path class="ti-draw" d="M27 23h8M27 27.5h8M27 32h5"/>' },

    moodle: { name: 'Moodle', accent: 'orange', art:
      '<path class="ti-draw" d="M24 10l15 6.5L24 23 9 16.5z"/>' +
      '<path class="ti-draw" d="M16 20v8.5c0 2.6 3.6 4.5 8 4.5s8-1.9 8-4.5V20"/>' +
      '<path class="ti-draw" d="M39 16.5v10"/>' },

    h5p: { name: 'H5P', accent: 'green', art:
      '<rect class="ti-draw" x="8" y="10" width="32" height="22" rx="4"/>' +
      '<path class="ti-draw" d="M20 16l8 5-8 5z"/>' +
      '<path class="ti-draw" d="M24 32v6M16 38h16"/>' },

    kobo: { name: 'KoboToolbox', accent: 'green', art:
      '<rect class="ti-draw" x="11" y="12" width="26" height="29" rx="4"/>' +
      '<path class="ti-draw" d="M19 8h10a2 2 0 0 1 2 2v5H17v-5a2 2 0 0 1 2-2z"/>' +
      '<path class="ti-draw" d="M17 24l2.5 2.5L24 21M17 33l2.5 2.5L24 30"/>' +
      '<path class="ti-draw" d="M28 24.5h4M28 33.5h4"/>' }
  };

  var ACCENTS = { yellow: 'var(--yellow)', orange: 'var(--orange)',
                  purple: 'var(--purple)', blue: 'var(--blue)', green: 'var(--green)' };

  function emblem(id) {
    var t = TECH[id];
    if (!t) return null;
    var fig = document.createElement('figure');
    fig.className = 'tech-badge';
    fig.setAttribute('data-ti', id);
    fig.style.setProperty('--ti-accent', ACCENTS[t.accent] || 'var(--blue)');
    fig.innerHTML =
      '<span class="tech-badge-art">' +
        '<svg class="ti" viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false">' +
          t.art +
        '</svg>' +
      '</span>' +
      '<figcaption class="tech-badge-name">' + t.name + '</figcaption>';
    return fig;
  }

  function render(container) {
    var ids = (container.getAttribute('data-tech-badges') || '')
      .split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!ids.length) return;

    var label = container.getAttribute('data-badge-label');
    if (label) {
      var h = document.createElement('p');
      h.className = 'tech-badges-label';
      h.textContent = label;
      container.appendChild(h);
    }

    var grid = document.createElement('div');
    grid.className = 'tech-badges-grid';
    if (container.getAttribute('data-badge-size') === 'sm') grid.classList.add('is-sm');
    if (container.getAttribute('data-badge-style') === 'plain') grid.classList.add('is-plain');

    var n = 0;
    ids.forEach(function (id) {
      var el = emblem(id);
      if (!el) { console.warn('[tech-icons] unknown id:', id); return; }
      el.style.setProperty('--ti-i', n++);
      grid.appendChild(el);
    });
    container.appendChild(grid);

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      obs.observe(grid);
    } else {
      grid.classList.add('in-view');
    }
  }

  function init() {
    document.querySelectorAll('[data-tech-badges]').forEach(render);
  }

  // expose for dynamic use elsewhere
  window.TechIcons = { render: render, init: init, emblem: emblem, list: Object.keys(TECH) };

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
