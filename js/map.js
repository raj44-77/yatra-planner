(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var urlParams = new URLSearchParams(window.location.search);
  var destination = urlParams.get('dest') || 'kedarnath';

  function showMap(dest) {
    var kedarMap = document.getElementById('map-kedarnath');
    var badriMap = document.getElementById('map-badrinath');
    var trekSection = document.getElementById('trekSection');
    var locKedar = document.getElementById('locationsKedarnath');
    var locBadri = document.getElementById('locationsBadrinath');
    var btns = document.querySelectorAll('.map-toggle-btn');
    
    if (kedarMap) kedarMap.style.display = dest === 'kedarnath' ? 'block' : 'none';
    if (badriMap) badriMap.style.display = dest === 'badrinath' ? 'block' : 'none';
    if (trekSection) trekSection.style.display = dest === 'kedarnath' ? 'block' : 'none';
    if (locKedar) locKedar.style.display = dest === 'kedarnath' ? 'block' : 'none';
    if (locBadri) locBadri.style.display = dest === 'badrinath' ? 'block' : 'none';
    
    btns.forEach(function(b) {
      b.classList.remove('active');
      if (b.getAttribute('data-dest') === dest) b.classList.add('active');
    });
    
    var heroTitle = document.querySelector('.map-hero-title');
    if (heroTitle) heroTitle.innerHTML = (dest === 'badrinath' ? 'Badrinath' : 'Kedarnath') + ' <em>Yatra Map</em>';
    
    var heroSub = document.querySelector('.map-hero-sub');
    if (heroSub) heroSub.textContent = dest === 'badrinath' ? 'Complete road route from Haridwar to Badrinath Temple. Road all the way — no trekking!' : 'Complete route from Haridwar to Kedarnath Temple with every landmark. Save offline.';
    
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', window.location.pathname + '?dest=' + dest);
    }

    // Reset "You are here" markers for visible map
    var visibleMarkers = document.querySelectorAll((dest === 'kedarnath' ? '#map-kedarnath' : '#map-badrinath') + ' .stop-marker');
    if (visibleMarkers.length > 0) {
      visibleMarkers.forEach(function(m) { m.classList.remove('current'); });
      visibleMarkers[0].classList.add('current');
    }
  }

  showMap(destination);

  // Attach click handlers to toggle buttons
  document.querySelectorAll('.map-toggle-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      showMap(this.getAttribute('data-dest'));
    });
  });

  // Print map
  var printBtn = document.getElementById('printMapBtn');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

  var savePdfBtn = document.getElementById('savePdfBtn');
  if (savePdfBtn) savePdfBtn.addEventListener('click', function () { window.print(); });

  // "You are here" markers
  function initMarkers() {
    var allMarkers = document.querySelectorAll('#map-kedarnath .stop-marker, #map-badrinath .stop-marker');
    allMarkers.forEach(function(marker) {
      marker.addEventListener('click', function() {
        var parentMap = this.closest('[id^="map-"]');
        if (parentMap) {
          parentMap.querySelectorAll('.stop-marker').forEach(function(m) { m.classList.remove('current'); });
        }
        this.classList.add('current');
        var stop = this.closest('.timeline-stop');
        if (stop) stop.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      marker.style.cursor = 'pointer';
      marker.title = 'Click to mark as your location';
    });
    
    // Highlight first marker
    var firstMarker = document.querySelector('#map-kedarnath .stop-marker');
    if (firstMarker) firstMarker.classList.add('current');
  }

  initMarkers();
})();