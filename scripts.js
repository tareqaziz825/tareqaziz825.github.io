'use strict';
/* ============================================================
   TAJ PORTFOLIO v3 — scripts.js
   ============================================================ */

// ── Theme ──────────────────────────────────────────────────
function initTheme() {
  const K = 'taj-v3-theme';
  const apply = t => {
    document.documentElement.setAttribute('data-theme', t);
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem(K, t);
  };
  const saved = localStorage.getItem(K);
  const pref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  apply(saved || pref);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    apply(cur === 'dark' ? 'light' : 'dark');
  });
}

// ── Scroll Progress ─────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-bar');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
}

// ── Scrolled Nav ────────────────────────────────────────────
function initScrolledNav() {
  const nav = document.querySelector('.pill-nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ── Custom Cursor ───────────────────────────────────────────
function initCursor() {
  const ring = document.getElementById('cur-ring');
  const dot  = document.getElementById('cur-dot');
  if (!ring || !dot) return;
  if (window.matchMedia('(pointer:coarse)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  let af;
  const tick = () => {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    af = requestAnimationFrame(tick);
  };
  af = requestAnimationFrame(tick);

  document.querySelectorAll('a, button, .proj-card, .blog-card, .bc, .photo-wrap').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
  });
}

// ── Mobile Drawer ───────────────────────────────────────────
function initMobileNav() {
  const btn   = document.getElementById('navHam');
  const close = document.getElementById('drawerClose');
  const drawer = document.getElementById('mobileDrawer');
  if (!btn || !drawer) return;

  const open = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const shut = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };
  btn.addEventListener('click', open);
  if (close) close.addEventListener('click', shut);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
}

// ── Reveal on Scroll ────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
  els.forEach(el => io.observe(el));
}

// ── Typewriter ──────────────────────────────────────────────
function initTypewriter() {
  const el = document.getElementById('tw');
  if (!el) return;
  const words = JSON.parse(el.dataset.words || '[]');
  if (!words.length) return;
  let wi = 0, ci = 0, del = false;
  const tick = () => {
    const w = words[wi];
    if (!del) {
      ci++;
      el.textContent = w.slice(0, ci);
      if (ci === w.length) { del = true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 80);
    } else {
      ci--;
      el.textContent = w.slice(0, ci);
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; setTimeout(tick, 380); return; }
      setTimeout(tick, 44);
    }
  };
  setTimeout(tick, 1000);
}

// ── Stat Counter Animations ─────────────────────────────────
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dec = el.dataset.dec ? parseInt(el.dataset.dec) : 0;
      const dur = 1400;
      const start = performance.now();
      const step = ts => {
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
}

// ── Magnetic Buttons ────────────────────────────────────────
function initMagnetic() {
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ── Load Connect Section ────────────────────────────────────
function loadConnect() {
  const el = document.getElementById('connect-section');
  if (!el) return;
  // Determine path based on current page location
  const depth = window.location.pathname.includes('/blogs/') ? '../' : '';
  fetch(depth + 'connect.html')
    .then(r => r.text())
    .then(html => {
      el.innerHTML = html;
      // Wire up EmailJS form
      const form = el.querySelector('#contactForm');
      if (form && window.emailjs) wireForm(form);
      // Re-init reveal for injected elements
      const newRevs = el.querySelectorAll('.reveal');
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
      }, { threshold: 0.1 });
      newRevs.forEach(el => io.observe(el));
    })
    .catch(() => {});
}

function wireForm(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('#sendBtn');
    const status = form.querySelector('#formStatus');
    if (!btn || !status) return;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    status.textContent = ''; status.className = 'fs';
    emailjs.sendForm('service_write2justice', 'template_write2justice', form)
      .then(() => {
        status.textContent = '✓ Message sent! I\'ll get back to you soon.';
        status.className = 'fs ok';
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false; form.reset();
      }, err => {
        status.textContent = '✗ Something went wrong. Please email directly.';
        status.className = 'fs err';
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false; console.error(err);
      });
  });
}

// ── Page Transitions ────────────────────────────────────────
function initTransitions() {
  const curtain = document.querySelector('.curtain');
  if (!curtain) return;
  curtain.classList.add('out');
  setTimeout(() => curtain.classList.remove('out'), 400);

  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel') ||
        a.target === '_blank') return;
    a.addEventListener('click', e => {
      e.preventDefault();
      curtain.classList.add('in');
      setTimeout(() => window.location.href = href, 360);
    });
  });
}

// ── Hero Particles Canvas ───────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts, raf;

  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    makePts();
  }

  function makePts() {
    const n = Math.min(Math.floor(W * H / 14000), 80);
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      r: .6 + Math.random() * 1.8,
      a: .12 + Math.random() * .35,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const alpha = isDark() ? 1 : .5;
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,180,216,${p.a * alpha})`;
      ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,180,216,${(1 - d/100) * .09 * alpha})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);
  resize(); draw();
}

// ── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initScrolledNav();
  initCursor();
  initMobileNav();
  initReveal();
  initTypewriter();
  initCounters();
  initMagnetic();
  loadConnect();
  initTransitions();
  initParticles();
});
