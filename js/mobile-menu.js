// Mobile Menu Toggle + Footer Injection — shared across all pages
(function() {
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
  var footerHTML = '<footer><div class="container"><div class="brand" style="justify-content:center;margin-bottom:14px;"><span class="brand-mark"></span>Yatra</div><div style="margin-bottom:10px;"><a href="privacy.html" style="color:var(--ice);opacity:0.7;margin:0 10px;font-size:12px;text-decoration:none;">Privacy Policy</a><a href="terms.html" style="color:var(--ice);opacity:0.7;margin:0 10px;font-size:12px;text-decoration:none;">Terms</a><a href="contact.html" style="color:var(--ice);opacity:0.7;margin:0 10px;font-size:12px;text-decoration:none;">Contact</a></div><div>Crafted for families who travel the Himalayas with heart · © <span id="year"></span></div></div></footer>';
  
  var oldFooter = document.querySelector('footer');
  if (oldFooter) {
    oldFooter.outerHTML = footerHTML;
  }
  
  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
    // ── Cookie Consent Banner ──
  if (!localStorage.getItem('yatra-cookie-consent')) {
    var banner = document.createElement('div');
    banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;background:rgba(8,27,51,0.97);border-top:1px solid var(--line);padding:16px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:12px;color:var(--ice);';
    banner.innerHTML = '<span>🍪 Yatra uses only essential Google Fonts. No tracking, no ads, no data collection. <a href="privacy.html" style="color:var(--gold);">Learn more</a></span><button id="cookieAccept" style="padding:8px 18px;border-radius:8px;border:1px solid var(--gold);background:rgba(212,160,23,0.1);color:var(--gold);cursor:pointer;font-family:inherit;font-size:12px;white-space:nowrap;">Got it</button>';
    document.body.appendChild(banner);
    
    document.getElementById('cookieAccept').addEventListener('click', function() {
      localStorage.setItem('yatra-cookie-consent', 'true');
      banner.remove();
    });
  }
})();