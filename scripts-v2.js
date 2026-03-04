/* scripts.js — shared across all pages */
(function () {

  /* ── Theme (Dark default, toggle to light) ── */
  const toggle = document.getElementById('themeToggle');
  const icon   = document.getElementById('themeIcon');

  function applyTheme(isLight) {
    document.body.classList.toggle('light-mode', isLight);
    if (icon) icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
  }

  /* Default is dark; only apply light if explicitly saved */
  const saved = localStorage.getItem('theme');
  applyTheme(saved === 'light');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = !document.body.classList.contains('light-mode');
      applyTheme(isLight);
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  /* ── Hamburger ── */
  const ham   = document.getElementById('navHam');
  const mmenu = document.getElementById('mobileNav');
  if (ham && mmenu) {
    ham.addEventListener('click', (e) => {
      e.stopPropagation();
      mmenu.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!mmenu.contains(e.target) && !ham.contains(e.target))
        mmenu.classList.remove('open');
    });
  }

  /* ── Scroll Fade-up ── */
  const els = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => obs.observe(el));
  } else {
    els.forEach(el => el.classList.add('in-view'));
  }

})();
