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
    var footerHTML = '<footer><div class="container"><div class="brand" style="justify-content:center;margin-bottom:14px;"><span class="brand-mark"></span>Yatra</div><div style="margin-bottom:10px;"><a href="privacy.html" style="color:var(--ice);opacity:0.7;margin:0 10px;font-size:12px;text-decoration:none;">Privacy</a><a href="terms.html" style="color:var(--ice);opacity:0.7;margin:0 10px;font-size:12px;text-decoration:none;">Terms</a><a href="faq.html" style="color:var(--ice);opacity:0.7;margin:0 10px;font-size:12px;text-decoration:none;">FAQ</a><a href="contact.html" style="color:var(--ice);opacity:0.7;margin:0 10px;font-size:12px;text-decoration:none;">Contact</a></div><div style="margin-bottom:10px;"><a href="https://www.facebook.com/profile.php?id=61592118287403" target="_blank" rel="noopener" style="color:var(--ice);opacity:0.6;font-size:11px;text-decoration:none;">📘 Facebook</a></div><div>Crafted for families who travel the Himalayas with heart · © <span id="year"></span></div></div></footer>';
  
  var oldFooter = document.querySelector('footer');
  if (oldFooter) {
    oldFooter.outerHTML = footerHTML;
  }
  
  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();