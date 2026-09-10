// Engineering Telemetry Rail & HUD Live Feed Controller

(function() {
  const coordLatEl = document.getElementById('railLat');
  const coordLongEl = document.getElementById('railLong');
  const cursorCoordEl = document.getElementById('cursorCoord');
  const loadCapacityEl = document.getElementById('railLoad');
  const activeProjectEl = document.getElementById('railProject');
  const timeUtcEl = document.getElementById('railUtcTime');
  const cursorReticle = document.getElementById('cursorReticle');

  // Base coordinates (Chennai HQ origin: 13.0827° N, 80.2707° E)
  const baseLat = 13.0827;
  const baseLong = 80.2707;

  // Live mouse tracking for engineering coordinates
  window.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

    const dynamicLat = (baseLat + yRatio * 5.4).toFixed(4);
    const dynamicLong = (baseLong + xRatio * 6.2).toFixed(4);

    if (coordLatEl) coordLatEl.textContent = `LAT ${dynamicLat}° N`;
    if (coordLongEl) coordLongEl.textContent = `LONG ${dynamicLong}° E`;
    if (cursorCoordEl) cursorCoordEl.textContent = `X:${e.clientX} Y:${e.clientY}`;

    if (cursorReticle) {
      cursorReticle.style.left = `${e.clientX}px`;
      cursorReticle.style.top = `${e.clientY}px`;
    }
  });

  // Hover effect on clickable elements for reticle
  document.querySelectorAll('a, button, .map-node, .discipline-card, .project-slide-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorReticle && cursorReticle.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorReticle && cursorReticle.classList.remove('active'));
  });

  // Live UTC / IST Clock
  function updateTelemetryClock() {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    if (timeUtcEl) {
      timeUtcEl.textContent = `UTC ${utcHours}:${utcMinutes}:${utcSeconds}Z`;
    }
  }
  setInterval(updateTelemetryClock, 1000);
  updateTelemetryClock();

  // Public method to update rail state when hovering/clicking projects
  window.updateEngineeringRail = function(projectName, loadCapacity, lat, long) {
    if (activeProjectEl && projectName) {
      activeProjectEl.textContent = projectName;
    }
    if (loadCapacityEl && loadCapacity) {
      loadCapacityEl.textContent = loadCapacity;
    }
    if (lat && long) {
      if (coordLatEl) coordLatEl.textContent = `LAT ${lat}° N`;
      if (coordLongEl) coordLongEl.textContent = `LONG ${long}° E`;
    }
  };
})();
