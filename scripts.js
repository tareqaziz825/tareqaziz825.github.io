/* scripts.js — shared across all pages */
(function () {
  /* ── Dark Mode ── */
  const toggle = document.getElementById('themeToggle');
  const icon   = document.getElementById('themeIcon');

  function applyTheme(dark) {
    document.body.classList.toggle('dark-mode', dark);
    if (icon) icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
  }

  applyTheme(localStorage.getItem('theme') === 'dark');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const dark = !document.body.classList.contains('dark-mode');
      applyTheme(dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
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
