(function () {
  'use strict';

  // ── Set current year in footer ──
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Nav scroll effect ──
  const nav = document.getElementById('y-nav');
  const heroBg = document.getElementById('y-hero-bg');

  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (heroBg) heroBg.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.05)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Reveal on scroll ──
  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    io.observe(el);
  });

  // ── Snowfall canvas ──
  const canvas = document.getElementById('snow');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let flakes = [];
    let w = 0, h = 0;

    function resize() {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const count = Math.min(90, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 14000));
      flakes = Array.from({ length: count }, function () {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 2 + 0.6) * window.devicePixelRatio,
          d: Math.random() * 0.6 + 0.2,
          o: Math.random() * 0.6 + 0.3
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      flakes.forEach(function (f) {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(248,250,252,' + f.o + ')';
        ctx.fill();
        f.y += f.d * 1.2 * window.devicePixelRatio;
        f.x += Math.sin(f.y * 0.008) * 0.4;
        if (f.y > h) {
          f.y = -5;
          f.x = Math.random() * w;
        }
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  // ── Live destinations ──
  var LIVE_DESTINATIONS = ['Kedarnath', 'Badrinath', 'Manali'];

  // ── Toast notification ──
  function showToast(message) {
    var existing = document.querySelector('.yatra-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'yatra-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      background: rgba(212, 160, 23, 0.95);
      color: #1a1305;
      padding: 14px 24px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 12px 40px rgba(0,0,0,0.4);
      animation: toastIn 0.4s ease, toastOut 0.4s ease 3s forwards;
      max-width: 90vw;
      text-align: center;
      line-height: 1.4;
    `;

    if (!document.getElementById('toast-styles')) {
      var style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes toastOut { from { opacity: 1; transform: translateX(-50%) translateY(0); } to { opacity: 0; transform: translateX(-50%) translateY(-20px); } }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(function () { if (toast.parentNode) toast.remove(); }, 3500);
  }

  // ── Helper: get plan page and base days for a destination ──
  function getPlanPage(destination) {
    if (destination === 'Badrinath') return 'badrinath.html';
    if (destination === 'Manali') return 'manali.html';
    return 'plan.html';
  }

  function getBaseDays(destination, tier) {
    if (destination === 'Badrinath') return tier === 'premium' ? 2 : 3;
    if (destination === 'Manali') return tier === 'premium' ? 2 : 3;
    return tier === 'premium' ? 2 : 4;
  }

  // ── Planner form submit ──
  var plannerForm = document.getElementById('planner');
  if (plannerForm) {
    plannerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var origin = document.getElementById('origin').value;
      var destination = document.getElementById('dest').value;
      var family = document.getElementById('family').value;
      var days = document.getElementById('days').value;

      if (LIVE_DESTINATIONS.indexOf(destination) === -1) {
        showToast('🚧 ' + destination + ' is coming soon! Try Kedarnath, Badrinath, or Manali.');
        document.getElementById('dest').value = 'Kedarnath';
        return;
      }

      var daysNum = parseInt(days) || 6;
      var extraDays = Math.max(0, daysNum - getBaseDays(destination, 'basic'));
      var planPage = getPlanPage(destination);

      window.location.href = planPage + '?tier=basic&people=' + family + '&origin=' + encodeURIComponent(origin) + '&days=' + extraDays;
    });
  }

  // ── Plan "Build this plan" buttons ──
  document.querySelectorAll('.plan-btn-sm').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var planCard = this.closest('.plan');
      var planName = planCard.querySelector('.plan-name').textContent.trim().toLowerCase();

      var tier = 'basic';
      if (planCard.classList.contains('featured')) {
        tier = 'comfort';
      } else if (planName === 'premium') {
        tier = 'premium';
      } else if (planName === 'comfort') {
        tier = 'comfort';
      }

      var familyInput = document.getElementById('family');
      var originInput = document.getElementById('origin');
      var destInput = document.getElementById('dest');
      var daysInput = document.getElementById('days');
      var people = familyInput ? familyInput.value : 1;
      var origin = originInput ? originInput.value : 'Bhagalpur';
      var destination = destInput ? destInput.value : 'Kedarnath';
      var daysNum = daysInput ? parseInt(daysInput.value) : 6;
      var extraDays = Math.max(0, daysNum - getBaseDays(destination, tier));
      var planPage = getPlanPage(destination);

      window.location.href = planPage + '?tier=' + tier + '&people=' + people + '&origin=' + encodeURIComponent(origin) + '&days=' + extraDays;
    });
  });

  // ── Destination chip click ──
  document.querySelectorAll('.dest-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var destName = this.textContent.trim();
      const destSelect = document.getElementById('dest');
      if (destSelect) {
        if (LIVE_DESTINATIONS.indexOf(destName) === -1) {
          showToast('🚧 ' + destName + ' is coming soon! Stay tuned.');
        }
        destSelect.value = destName;
        const planner = document.getElementById('planner');
        if (planner) {
          planner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

})();