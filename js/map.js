(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var urlParams = new URLSearchParams(window.location.search);
  var destination = urlParams.get('dest') || 'kedarnath';

  function showMap(dest) {
    var kedarMap = document.getElementById('map-kedarnath');
    var badriMap = document.getElementById('map-badrinath');
    var manaliMap = document.getElementById('map-manali');
    var trekSection = document.getElementById('trekSection');
    var locKedar = document.getElementById('locationsKedarnath');
    var locBadri = document.getElementById('locationsBadrinath');
    var locManali = document.getElementById('locationsManali');
    var btns = document.querySelectorAll('.map-toggle-btn');
    
    if (kedarMap) kedarMap.style.display = dest === 'kedarnath' ? 'block' : 'none';
    if (badriMap) badriMap.style.display = dest === 'badrinath' ? 'block' : 'none';
    if (manaliMap) manaliMap.style.display = dest === 'manali' ? 'block' : 'none';
    if (trekSection) trekSection.style.display = dest === 'kedarnath' ? 'block' : 'none';
    if (locKedar) locKedar.style.display = dest === 'kedarnath' ? 'block' : 'none';
    if (locBadri) locBadri.style.display = dest === 'badrinath' ? 'block' : 'none';
    if (locManali) locManali.style.display = dest === 'manali' ? 'block' : 'none';
    
    btns.forEach(function(b) {
      b.classList.remove('active');
      if (b.getAttribute('data-dest') === dest) b.classList.add('active');
    });
    
    var heroTitle = document.querySelector('.map-hero-title');
    var titles = { kedarnath: 'Kedarnath <em>Yatra Map</em>', badrinath: 'Badrinath <em>Yatra Map</em>', manali: 'Manali <em>Route Map</em>' };
    if (heroTitle) heroTitle.innerHTML = titles[dest] || titles['kedarnath'];
    
    var heroSub = document.querySelector('.map-hero-sub');
    var subs = { kedarnath: 'Complete route with every landmark. Save offline.', badrinath: 'Road all the way to the temple. Save offline.', manali: 'Delhi to Manali road trip. Save offline.' };
    if (heroSub) heroSub.textContent = subs[dest] || subs['kedarnath'];
    
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', window.location.pathname + '?dest=' + dest);
    }
  }

  showMap(destination);

  document.querySelectorAll('.map-toggle-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      showMap(this.getAttribute('data-dest'));
    });
  });

  var printBtn = document.getElementById('printMapBtn');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
  var savePdfBtn = document.getElementById('savePdfBtn');
  if (savePdfBtn) savePdfBtn.addEventListener('click', function () { window.print(); });

  function initMarkers() {
    var allMarkers = document.querySelectorAll('#map-kedarnath .stop-marker, #map-badrinath .stop-marker, #map-manali .stop-marker');
    allMarkers.forEach(function(marker) {
      marker.addEventListener('click', function() {
        var parentMap = this.closest('[id^="map-"]');
        if (parentMap) parentMap.querySelectorAll('.stop-marker').forEach(function(m) { m.classList.remove('current'); });
        this.classList.add('current');
        var stop = this.closest('.timeline-stop');
        if (stop) stop.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      marker.style.cursor = 'pointer';
      marker.title = 'Click to mark as your location';
    });
    var firstMarker = document.querySelector('#map-kedarnath .stop-marker');
    if (firstMarker) firstMarker.classList.add('current');
  }

  initMarkers();
})();