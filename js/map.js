(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Print map
  var printBtn = document.getElementById('printMapBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function () { window.print(); });
  }

  var savePdfBtn = document.getElementById('savePdfBtn');
  if (savePdfBtn) {
    savePdfBtn.addEventListener('click', function () { window.print(); });
  }

  // "You are here" — highlight the first stop marker as starting point
  var allMarkers = document.querySelectorAll('.stop-marker');
  if (allMarkers.length > 0) {
    allMarkers[0].classList.add('current'); // Haridwar is the starting point
    
    // Click any marker to highlight it as "current location"
    allMarkers.forEach(function(marker) {
      marker.addEventListener('click', function() {
        allMarkers.forEach(function(m) { m.classList.remove('current'); });
        this.classList.add('current');
        
        // Scroll the stop into view
        var stop = this.closest('.timeline-stop');
        if (stop) {
          stop.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
      marker.style.cursor = 'pointer';
      marker.title = 'Click to mark as your location';
    });
  }

})();