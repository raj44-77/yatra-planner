(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Read destination from URL
  var urlParams = new URLSearchParams(window.location.search);
  var destination = urlParams.get('dest') || 'kedarnath';

  // Show correct map
  function showMap(dest) {
    var kedarMap = document.getElementById('map-kedarnath');
    var badriMap = document.getElementById('map-badrinath');
    var btns = document.querySelectorAll('.dest-toggle-btn');
    
    if (kedarMap) kedarMap.style.display = dest === 'kedarnath' ? 'block' : 'none';
    if (badriMap) badriMap.style.display = dest === 'badrinath' ? 'block' : 'none';
    
    btns.forEach(function(b) {
      b.classList.remove('active');
      if (b.getAttribute('data-dest') === dest) b.classList.add('active');
    });
    
    // Update hero
    var heroTitle = document.querySelector('.map-hero-title');
    if (heroTitle) heroTitle.innerHTML = (dest === 'badrinath' ? 'Badrinath' : 'Kedarnath') + ' <em>Yatra Map</em>';
    
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', window.location.pathname + '?dest=' + dest);
    }
  }

  showMap(destination);

  window.switchMapDest = function(dest) {
    showMap(dest);
  };

  // Print map
  var printBtn = document.getElementById('printMapBtn');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

  var savePdfBtn = document.getElementById('savePdfBtn');
  if (savePdfBtn) savePdfBtn.addEventListener('click', function () { window.print(); });

  // "You are here" markers
  var allMarkers = document.querySelectorAll('.stop-marker');
  if (allMarkers.length > 0) {
    allMarkers[0].classList.add('current');
    allMarkers.forEach(function(marker) {
      marker.addEventListener('click', function() {
        allMarkers.forEach(function(m) { m.classList.remove('current'); });
        this.classList.add('current');
        var stop = this.closest('.timeline-stop');
        if (stop) stop.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      marker.style.cursor = 'pointer';
      marker.title = 'Click to mark as your location';
    });
  }
})();