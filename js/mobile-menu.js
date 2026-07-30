// Mobile Menu Toggle + Footer + Favicon Injection — shared across all pages
(function() {
  
  // ── Inject Favicon & Icons ──
  var head = document.head || document.getElementsByTagName('head')[0];
  
  var favicon32 = document.createElement('link');
  favicon32.rel = 'icon';
  favicon32.type = 'image/png';
  favicon32.sizes = '32x32';
  favicon32.href = 'assets/images/yatra-logo.png';
  head.appendChild(favicon32);

  var favicon192 = document.createElement('link');
  favicon192.rel = 'icon';
  favicon192.type = 'image/png';
  favicon192.sizes = '192x192';
  favicon192.href = 'assets/images/yatra-logo.png';
  head.appendChild(favicon192);

  var appleIcon = document.createElement('link');
  appleIcon.rel = 'apple-touch-icon';
  appleIcon.sizes = '180x180';
  appleIcon.href = 'assets/images/yatra-logo.png';
  head.appendChild(appleIcon);

  // Google Search Logo (Schema)
  var logoSchema = document.createElement('script');
  logoSchema.type = 'application/ld+json';
  logoSchema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Yatra Planner",
    "url": "https://yatra-planner.onrender.com",
    "logo": "https://yatra-planner.onrender.com/assets/images/yatra-logo.png"
  });
  head.appendChild(logoSchema);

  // ── Mobile Menu Toggle ──
  var menuBtn = document.getElementById('mobileMenuBtn');
  var menuLinks = document.getElementById('navLinks');
  
  if (menuBtn && menuLinks) {
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      menuLinks.classList.toggle('mobile-open');
    });
    
    menuLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuLinks.classList.remove('mobile-open');
      });
    });
    
    document.addEventListener('click', function(e) {
      if (!menuLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        menuLinks.classList.remove('mobile-open');
      }
    });
  }

  // ── Shared Footer Injection ──
    var footerHTML = '<footer><div class="container"><div class="brand" style="justify-content:center;margin-bottom:14px;"><span class="brand-mark"></span>Yatra</div><div class="footer-resources" style="display:flex;flex-wrap:wrap;justify-content:center;gap:24px;margin-bottom:16px;text-align:center;"><div style="min-width:120px;"><strong style="color:var(--snow);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Explore</strong><div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;"><a href="blog/patna-to-kedarnath.html" style="color:var(--ice);opacity:0.65;font-size:11px;text-decoration:none;">📝 Travel Guides</a><a href="plan.html" style="color:var(--ice);opacity:0.65;font-size:11px;text-decoration:none;">🧮 Budget Planner</a><a href="weather.html" style="color:var(--ice);opacity:0.65;font-size:11px;text-decoration:none;">🌦️ Weather</a><a href="directory.html" style="color:var(--ice);opacity:0.65;font-size:11px;text-decoration:none;">🏨 Directory</a></div></div><div style="min-width:120px;"><strong style="color:var(--snow);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Support</strong><div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;"><a href="faq.html" style="color:var(--ice);opacity:0.65;font-size:11px;text-decoration:none;">❓ FAQ</a><a href="about.html" style="color:var(--ice);opacity:0.65;font-size:11px;text-decoration:none;">📖 About</a><a href="contact.html" style="color:var(--ice);opacity:0.65;font-size:11px;text-decoration:none;">📧 Contact</a><a href="privacy.html" style="color:var(--ice);opacity:0.65;font-size:11px;text-decoration:none;">🔒 Privacy</a></div></div><div style="min-width:120px;"><strong style="color:var(--snow);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Destinations</strong><div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;"><a href="plan.html" style="color:var(--ice);opacity:0.65;font-size:11px;text-decoration:none;">🕉️ Kedarnath</a><a href="badrinath.html" style="color:var(--ice);opacity:0.65;font-size:11px;text-decoration:none;">🛕 Badrinath</a><span style="color:var(--ice);opacity:0.35;font-size:10px;">More coming soon</span></div></div></div><div style="margin-top:12px;font-size:11px;opacity:0.5;">Crafted for families who travel the Himalayas with heart · © <span id="year"></span></div></div></footer>';
  
  var oldFooter = document.querySelector('footer');
  if (oldFooter) {
    oldFooter.outerHTML = footerHTML;
  }
  
  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();