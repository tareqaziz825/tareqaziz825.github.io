/* ── scripts.js — Shared across all pages ── */

(function () {

  /* ─── Dark Mode ─── */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const body        = document.body;

  const applyTheme = (dark) => {
    if (dark) {
      body.classList.add('dark');
      if (themeIcon) { themeIcon.className = 'fas fa-sun'; }
    } else {
      body.classList.remove('dark');
      if (themeIcon) { themeIcon.className = 'fas fa-moon'; }
    }
  };

  // Apply saved preference immediately
  const saved = localStorage.getItem('theme');
  applyTheme(saved === 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.contains('dark');
      applyTheme(!isDark);
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  }

  /* ─── Mobile Menu / Hamburger ─── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }

  /* ─── Fade-in on Scroll ─── */
  const faders = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    faders.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    faders.forEach(el => el.classList.add('visible'));
  }

  /* ─── Smooth scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
