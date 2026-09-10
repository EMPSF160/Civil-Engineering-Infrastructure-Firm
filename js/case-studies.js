// Case Studies & Interactive Modal Controller

const CASE_STUDIES_DATA = {
  chennai: {
    title: 'Chennai Outer Ring Viaduct & Cyclone Surge Protection',
    subtitle: '62.4 KM Elevated Maritime Corridor with Anti-Corrosion Cathodic Protection',
    discipline: 'Structural, Marine & Geotechnical Engineering',
    timeline: '2022 - 2026',
    client: 'National Highways & Coastal Infrastructure Authority',
    heroImage: 'image/carissarogers-bridge-2072419_1920.jpg',
    beforeImage: 'image/memorycatcher-bulldozer-410118_1920.jpg',
    afterImage: 'image/carissarogers-bridge-2072419_1920.jpg',
    metrics: {
      loadCapacity: '24.8 kN / m²',
      spanLength: '1,420 m Continuous Deck',
      concreteVolume: '410,000 m³ Micro-Silica Mix',
      seismicStandard: 'Zone III Dynamic Damping',
      designLife: '120 Years Operational'
    },
    narrative: `Designed to alleviate chronic port congestion and withstand severe Bay of Bengal cyclonic storm surges, the Chennai Outer Ring Viaduct features 120-meter precast segmental spans erected using twin 450-tonne automated launching gantries. The marine piers employ advanced sacrificial zinc anodes with epoxy-coated rebar to resist aggressive saline penetration.`
  },
  mumbai: {
    title: 'Mumbai Trans-Harbour Deep Ocean Sea Link',
    subtitle: '21.8 KM Open Sea Orthotropic Steel Deck Infrastructure',
    discipline: 'Offshore Foundation & Heavy Civil Systems',
    timeline: '2020 - 2025',
    client: 'Metropolitan Region Development Authority',
    heroImage: 'image/pexels-kewal-nagda-1669654142-27808651.jpg',
    beforeImage: 'image/pexels-dh-tang-455909087-34095344.jpg',
    afterImage: 'image/pexels-kewal-nagda-1669654142-27808651.jpg',
    metrics: {
      loadCapacity: '32.5 kN / m²',
      spanLength: '180 m Orthotropic Spans',
      concreteVolume: '890,000 m³ Marine Grade',
      seismicStandard: 'Zone IV Base Isolation',
      designLife: '100 Years Operational'
    },
    narrative: `Spanning across fragile intertidal mudflats and deep maritime navigation channels, this landmark project deployed reverse circulation drilling rigs with 3.0-meter diameter rock-socketed monopiles. Noise attenuation bubble curtains were deployed during offshore piling to protect local flamingos and marine life.`
  },
  bengaluru: {
    title: 'Bengaluru Smart Metro High-Speed Transit Backbone',
    subtitle: '48.2 KM Automated Elevated Viaduct with BIM 5D Coordination',
    discipline: 'Transportation & Geotechnical Systems',
    timeline: '2023 - 2027',
    client: 'Bangalore Metro Rail Corporation',
    heroImage: 'image/pexels-tomfisk-4626415.jpg',
    beforeImage: 'image/memorycatcher-bulldozer-410115_1920.jpg',
    afterImage: 'image/pexels-tomfisk-4626415.jpg',
    metrics: {
      loadCapacity: '19.2 kN / m²',
      spanLength: '36 m U-Girder Precast',
      concreteVolume: '320,000 m³ Self-Compacting',
      seismicStandard: 'Zone II Multi-Span Elastomeric',
      designLife: '100 Years Operational'
    },
    narrative: `Integrating 28 elevated stations with high-capacity U-girders manufactured in robotic casting yards. The alignment navigates tight urban radii using post-tensioned straddle bents, minimizing ground footprint while delivering 45,000 PPHPD capacity.`
  },
  hyderabad: {
    title: 'Hyderabad Cyber Viaduct & Riverfront Bridge',
    subtitle: '18.6 KM Cable-Stayed Signature Arch with Real-Time IoT Health Monitoring',
    discipline: 'Advanced Structural & Wind Aerodynamics',
    timeline: '2021 - 2025',
    client: 'Telangana Urban Infrastructure Corp',
    heroImage: 'image/derks24-kleve-4719157_1920.jpg',
    beforeImage: 'image/pexels-enes-erdemli-649062305-26985331.jpg',
    afterImage: 'image/derks24-kleve-4719157_1920.jpg',
    metrics: {
      loadCapacity: '22.0 kN / m²',
      spanLength: '240 m Cable Stayed Arch',
      concreteVolume: '275,000 m³ High-Strength',
      seismicStandard: 'Zone III Tuned Mass Dampers',
      designLife: '100 Years Operational'
    },
    narrative: `Featuring aerodynamic twin steel box girders tested in boundary-layer wind tunnels for wind speeds up to 180 km/h. 140 stay cables are continuously monitored by laser vibrometers and fiber Bragg grating strain sensors.`
  }
};

window.openCaseStudyModal = function(key) {
  const data = CASE_STUDIES_DATA[key] || CASE_STUDIES_DATA['chennai'];
  const modal = document.getElementById('caseStudyModal');
  if (!modal) return;

  // Populate Modal Content
  const modalHero = document.getElementById('modalHeroImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalDiscipline = document.getElementById('modalDiscipline');
  const modalTimeline = document.getElementById('modalTimeline');
  const modalClient = document.getElementById('modalClient');
  const modalNarrative = document.getElementById('modalNarrative');
  
  // Spec grids
  const mLoad = document.getElementById('modalLoad');
  const mSpan = document.getElementById('modalSpan');
  const mConcrete = document.getElementById('modalConcrete');
  const mSeismic = document.getElementById('modalSeismic');
  const mLife = document.getElementById('modalLife');

  // Before / After elements
  const beforeImg = document.getElementById('modalBeforeImg');
  const afterImg = document.getElementById('modalAfterImg');

  if (modalHero) modalHero.src = data.heroImage;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
  if (modalDiscipline) modalDiscipline.textContent = data.discipline;
  if (modalTimeline) modalTimeline.textContent = data.timeline;
  if (modalClient) modalClient.textContent = data.client;
  if (modalNarrative) modalNarrative.textContent = data.narrative;

  if (mLoad) mLoad.textContent = data.metrics.loadCapacity;
  if (mSpan) mSpan.textContent = data.metrics.spanLength;
  if (mConcrete) mConcrete.textContent = data.metrics.concreteVolume;
  if (mSeismic) mSeismic.textContent = data.metrics.seismicStandard;
  if (mLife) mLife.textContent = data.metrics.designLife;

  if (beforeImg) beforeImg.src = data.beforeImage;
  if (afterImg) afterImg.src = data.afterImage;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeCaseStudyModal = function() {
  const modal = document.getElementById('caseStudyModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// Before / After Interactive Slider Logic
document.addEventListener('DOMContentLoaded', () => {
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', window.closeCaseStudyModal);
  }

  const modalBackdrop = document.getElementById('caseStudyModal');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) window.closeCaseStudyModal();
    });
  }

  // Handle ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeCaseStudyModal();
  });

  // Slider interactive drag
  const sliderContainers = document.querySelectorAll('.before-after-wrapper');
  sliderContainers.forEach(container => {
    const layerAfter = container.querySelector('.layer-after');
    const handle = container.querySelector('.slider-handle');
    let isSliding = false;

    function setPosition(x) {
      const rect = container.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      pos = Math.max(0.05, Math.min(0.95, pos));
      const pct = (pos * 100).toFixed(1) + '%';
      if (layerAfter) layerAfter.style.width = pct;
      if (handle) handle.style.left = pct;
    }

    container.addEventListener('mousedown', (e) => {
      isSliding = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => { isSliding = false; });
    window.addEventListener('mousemove', (e) => {
      if (isSliding) setPosition(e.clientX);
    });

    // Touch
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isSliding = true;
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => { isSliding = false; });
    window.addEventListener('touchmove', (e) => {
      if (isSliding && e.touches.length === 1) {
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });
  });
});
