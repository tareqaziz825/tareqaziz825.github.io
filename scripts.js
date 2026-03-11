/* ============================================================
   TAJ PORTFOLIO — scripts.js
   ============================================================ */

'use strict';

// ── Theme ──────────────────────────────────────────────────
const THEME_KEY = 'taj-theme';

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem(THEME_KEY, t);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const pref  = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  applyTheme(saved || pref);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', () => {
    const curr = document.documentElement.getAttribute('data-theme');
    applyTheme(curr === 'dark' ? 'light' : 'dark');
  });
}

// ── Mobile Nav ─────────────────────────────────────────────
function initMobileNav() {
  const ham = document.getElementById('navHam');
  const mob = document.getElementById('mobileNav');
  if (!ham || !mob) return;
  ham.addEventListener('click', () => {
    const open = mob.classList.toggle('open');
    ham.setAttribute('aria-expanded', open);
    // animate hamburger
    const spans = ham.querySelectorAll('span');
    if (open) {
      spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
      spans[1].style.cssText = 'opacity:0;transform:scaleX(0)';
      spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });
  // close on link click
  mob.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mob.classList.remove('open');
      ham.querySelectorAll('span').forEach(s => s.style.cssText = '');
    })
  );
}

// ── Scroll Progress ────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ── Scrolled Nav ───────────────────────────────────────────
function initScrollNav() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ── Fade-up on scroll ──────────────────────────────────────
function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ── Cursor dot ─────────────────────────────────────────────
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  if (!dot || window.matchMedia('(pointer:coarse)').matches) return;
  let x = 0, y = 0, ax = 0, ay = 0;
  document.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
  const tick = () => {
    ax += (x - ax) * 0.2;
    ay += (y - ay) * 0.2;
    dot.style.left = ax + 'px';
    dot.style.top  = ay + 'px';
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  document.addEventListener('mouseleave', () => dot.style.opacity = '0');
  document.addEventListener('mouseenter', () => dot.style.opacity = '0.85');
}

// ── Hero Canvas Particles ──────────────────────────────────
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;

  const COLORS = ['rgba(0,180,216,', 'rgba(144,224,239,', 'rgba(0,119,182,'];
  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    const n = Math.min(Math.floor(W * H / 12000), 90);
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.8 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      a: 0.15 + Math.random() * 0.4,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const baseAlpha = isDark() ? 1 : 0.55;

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c + (p.a * baseAlpha) + ')';
      ctx.fill();
    });

    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,180,216,${(1 - dist/110) * 0.12 * baseAlpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(() => { resize(); createParticles(); });
  ro.observe(canvas.parentElement);
  resize(); createParticles(); draw();
}

// ── Hero Typewriter ────────────────────────────────────────
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const words = el.dataset.words ? JSON.parse(el.dataset.words) : [];
  if (!words.length) return;
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      ci++;
      el.textContent = word.slice(0, ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 80);
    } else {
      ci--;
      el.textContent = word.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 45);
    }
  }
  setTimeout(tick, 1000);
}

// ── Connect Section Loader ─────────────────────────────────
function loadConnectSection() {
  const container = document.getElementById('connect-section');
  if (!container) return;

  fetch('connect.html')
    .then(r => r.text())
    .then(html => {
      container.innerHTML = html;
      // Re-init EmailJS form if present
      const form = container.querySelector('#contactForm');
      if (form && window.emailjs) {
        initContactForm(form);
      }
    })
    .catch(() => {
      // Fallback: show inline
      container.innerHTML = buildConnectFallback();
    });
}

function initContactForm(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('#sendBtn');
    const status = form.querySelector('#formStatus');
    if (!btn || !status) return;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    status.textContent = '';
    status.className = 'form-status';

    emailjs.sendForm('service_write2justice', 'template_write2justice', form)
      .then(() => {
        status.textContent = '✓ Message sent! I\'ll get back to you soon.';
        status.className = 'form-status success';
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        form.reset();
      }, (err) => {
        status.textContent = '✗ Something went wrong. Please email directly.';
        status.className = 'form-status error';
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        console.error(err);
      });
  });
}

// ── Page Transition ────────────────────────────────────────
function initPageTransitions() {
  const overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) return;

  // Slide out on load
  overlay.classList.add('slide-out');
  setTimeout(() => overlay.classList.remove('slide-out'), 350);

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel') ||
        link.target === '_blank') return;

    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('slide-in');
      setTimeout(() => { window.location.href = href; }, 320);
    });
  });
}

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollProgress();
  initScrollNav();
  initFadeUp();
  initCursor();
  initHeroCanvas();
  initTypewriter();
  loadConnectSection();
  initPageTransitions();
});
