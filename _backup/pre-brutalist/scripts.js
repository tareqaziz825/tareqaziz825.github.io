/* scripts.js — shared across all pages · v3 Motion-Rich */
(function () {
  'use strict';

  /* ── Theme ── */
  const toggle = document.getElementById('themeToggle');
  const icon   = document.getElementById('themeIcon');
  function applyTheme(isLight) {
    document.body.classList.toggle('light-mode', isLight);
    if (icon) icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
  }
  const saved = localStorage.getItem('theme');
  applyTheme(saved === 'light');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = !document.body.classList.contains('light-mode');
      applyTheme(isLight);
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  /* ── Navbar scroll effect ── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ── Scroll progress bar ── */
  let progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
  }
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll > 0 ? scrolled / maxScroll : 0;
    progressBar.style.transform = `scaleX(${pct})`;
  }, { passive: true });

  /* ── Hamburger ── */
  const ham   = document.getElementById('navHam');
  const mmenu = document.getElementById('mobileNav');
  if (ham && mmenu) {
    ham.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = mmenu.classList.toggle('open');
      ham.classList.toggle('open', open);
    });
    document.addEventListener('click', (e) => {
      if (!mmenu.contains(e.target) && !ham.contains(e.target)) {
        mmenu.classList.remove('open');
        ham.classList.remove('open');
      }
    });
  }

  /* ── Intersection Observer for all scroll animations ── */
  const animTargets = document.querySelectorAll('.fade-up, .fade-left, .scale-in, .stagger-children');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
    animTargets.forEach(el => obs.observe(el));
  } else {
    animTargets.forEach(el => el.classList.add('in-view'));
  }

  /* ── Load shared connect section ── */
  const placeholder = document.getElementById('connect-placeholder');
  if (placeholder) {
    // Detect if we're in a subdirectory (blogs/) and adjust path accordingly
    const connectPath = window.location.pathname.includes('/blogs/') ? '../connect.html' : 'connect.html';
    fetch(connectPath)
      .then(r => r.text())
      .then(html => {
        placeholder.outerHTML = html;
        // Re-init scroll animations for newly injected elements
        const newFadeEls = document.querySelectorAll('#connect-section .fade-up, #connect-section .stagger-children');
        if ('IntersectionObserver' in window) {
          const obs2 = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs2.unobserve(e.target); } });
          }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
          newFadeEls.forEach(el => obs2.observe(el));
        } else {
          newFadeEls.forEach(el => el.classList.add('in-view'));
        }
      })
      .catch(() => {
        // fallback: hide placeholder gracefully
        if (placeholder) placeholder.remove();
      });
  }

  /* ── Typewriter animation for hero ── */
  function typewriter(el, strings, speed = 80, pause = 2200) {
    if (!el) return;
    let si = 0, ci = 0, deleting = false;
    function tick() {
      const current = strings[si];
      if (!deleting) {
        el.textContent = current.slice(0, ++ci);
        if (ci === current.length) {
          deleting = true;
          setTimeout(tick, pause);
          return;
        }
      } else {
        el.textContent = current.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          si = (si + 1) % strings.length;
        }
      }
      setTimeout(tick, deleting ? speed / 2 : speed);
    }
    tick();
  }

  const twEl = document.querySelector('.typewriter-text');
  if (twEl) {
    const strings = twEl.dataset.strings
      ? JSON.parse(twEl.dataset.strings)
      : ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Anomaly Detection'];
    twEl.textContent = '';
    setTimeout(() => typewriter(twEl, strings), 1200);
  }

  /* ── Resume request link ──────────────────────────────────────────
     A mailto: works on phones, which always have a mail app registered.
     On desktop, Chrome and friends often have no mailto handler at all,
     so the link silently does nothing. There, rewrite it to Gmail's web
     compose window — same recipient, subject and body.
     Runs before the page-transition handler below so that handler sees
     the final href and leaves the link alone either way.            */
  (function () {
    var links = document.querySelectorAll('a[data-mail="gmail-fallback"]');
    if (!links.length) return;
    if (/Android|iPhone|iPad|iPod|Windows Phone|Mobile/i.test(navigator.userAgent)) return;

    Array.prototype.forEach.call(links, function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('mailto:') !== 0) return;
      var rest = href.slice(7);
      var qi   = rest.indexOf('?');
      var to   = qi === -1 ? rest : rest.slice(0, qi);
      var p    = new URLSearchParams(qi === -1 ? '' : rest.slice(qi + 1));

      a.setAttribute('href',
        'https://mail.google.com/mail/?view=cm&fs=1' +
        '&to='   + encodeURIComponent(decodeURIComponent(to)) +
        '&su='   + encodeURIComponent(p.get('subject') || '') +
        '&body=' + encodeURIComponent(p.get('body') || ''));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  })();

  /* ── Smooth page transition on link click ── */
  let overlay = document.querySelector('.page-transition');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);
  }
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
    if (link.target === '_blank') return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      overlay.style.transition = 'opacity .25s ease';
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'all';
      setTimeout(() => { window.location.href = href; }, 260);
    });
  });
  // Fade in on load
  window.addEventListener('pageshow', () => {
    overlay.style.transition = 'opacity .35s ease';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  });

  /* ── Subtle cursor glow on desktop ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

  /* ── Hero orbs (inject if missing) ── */
  const heroSection = document.querySelector('.hero-section');
  if (heroSection && !heroSection.querySelector('.hero-orb')) {
    [1,2,3].forEach(n => {
      const orb = document.createElement('div');
      orb.className = `hero-orb hero-orb-${n}`;
      heroSection.appendChild(orb);
    });
  }

})();
