// Interactive Infrastructure Network Map Controller

const INFRASTRUCTURE_PROJECTS = {
  chennai: {
    id: 'PROJ-CHE-08',
    name: 'Chennai Outer Ring Viaduct & Coastal Expressway',
    city: 'Chennai',
    state: 'Tamil Nadu',
    sector: 'highways',
    type: '8-Lane Elevated Viaduct & Coastal Sea Defense',
    year: '2026',
    scale: '62.4 KM',
    discipline: 'Structural & Marine Civil Engineering',
    loadCapacity: '24.8 kN / m²',
    concreteGrade: 'M60 High-Performance Micro-Silica',
    lat: '13.0827',
    long: '80.2707',
    image: 'image/carissarogers-bridge-2072419_1920.jpg',
    status: 'Operational Phase 1',
    description: 'A critical multi-modal transit corridor engineered to withstand severe cyclonic tidal surge and high-tonnage freight transport along the Coromandel coastline.'
  },
  bengaluru: {
    id: 'PROJ-BLR-14',
    name: 'Bengaluru Smart Metro High-Speed Transit Corridor',
    city: 'Bengaluru',
    state: 'Karnataka',
    sector: 'rail',
    type: 'Automated Elevated Viaduct & Deep Cut Station Box',
    year: '2027',
    scale: '48.2 KM',
    discipline: 'Transportation & Geotechnical Systems',
    loadCapacity: '19.2 kN / m²',
    concreteGrade: 'M55 Pre-Stressed Post-Tensioned',
    lat: '12.9716',
    long: '77.5946',
    image: 'image/pexels-tomfisk-4626415.jpg',
    status: 'Superstructure Erection 88%',
    description: 'Intermodal transit backbone with seismic Class IV elastomeric damping bearings and integrated regenerative braking power capture.'
  },
  hyderabad: {
    id: 'PROJ-HYD-21',
    name: 'Hyderabad Cyber Viaduct & Riverfront Bridge',
    city: 'Hyderabad',
    state: 'Telangana',
    sector: 'bridges',
    type: 'Cable-Stayed Signature Arch & 6-Lane Flyover',
    year: '2025',
    scale: '18.6 KM',
    discipline: 'Advanced Structural & Wind Aerodynamics',
    loadCapacity: '22.0 kN / m²',
    concreteGrade: 'M65 Self-Compacting Concrete',
    lat: '17.3850',
    long: '78.4867',
    image: 'image/derks24-kleve-4719157_1920.jpg',
    status: 'Commissioned & Monitored',
    description: 'Iconic extradosed cable-stayed river span featuring continuous fiber-optic IoT strain gauge sensor arrays embedded in the deck.'
  },
  mumbai: {
    id: 'PROJ-MUM-02',
    name: 'Mumbai Trans-Harbour Deep Ocean Sea Link',
    city: 'Mumbai',
    state: 'Maharashtra',
    sector: 'bridges',
    type: 'Long-Span Orthotropic Steel Deck Marine Link',
    year: '2025',
    scale: '21.8 KM',
    discipline: 'Offshore Foundation & Heavy Civil Systems',
    loadCapacity: '32.5 kN / m²',
    concreteGrade: 'M70 Anti-Sulphate Marine Concrete',
    lat: '19.0760',
    long: '72.8777',
    image: 'image/pexels-kewal-nagda-1669654142-27808651.jpg',
    status: 'Fully Operational',
    description: 'Indias longest sea link, engineered with cathodic corrosion protection, seismic isolation pendulum bearings, and 100-year design life.'
  },
  delhi: {
    id: 'PROJ-DEL-05',
    name: 'Delhi-NCR Express Freight & Logistic Viaduct',
    city: 'Delhi',
    state: 'National Capital Region',
    sector: 'highways',
    type: 'Heavy Axle Dual-Deck Precast Segmental Expressway',
    year: '2026',
    scale: '84.0 KM',
    discipline: 'Highway & Pavement Geotechnics',
    loadCapacity: '28.0 kN / m²',
    concreteGrade: 'M60 Polymer-Modified Mix',
    lat: '28.6139',
    long: '77.2090',
    image: 'image/pexels-tkirkgoz-19408681.jpg',
    status: 'Paving & Smart Tolling Setup',
    description: 'Heavy arterial expressway connecting western freight hubs with integrated intelligent traffic management and automated incident detection.'
  },
  ahmedabad: {
    id: 'PROJ-AMD-11',
    name: 'Sabarmati Smart Riverfront & Storm Barrier',
    city: 'Ahmedabad',
    state: 'Gujarat',
    sector: 'water',
    type: 'Automated Radial Gate Barrier & Retaining Embankment',
    year: '2026',
    scale: '16.5 KM',
    discipline: 'Hydrological & Environmental Civil Engineering',
    loadCapacity: '15.5 kN / m²',
    concreteGrade: 'M50 High Density Hydraulic Concrete',
    lat: '23.0225',
    long: '72.5714',
    image: 'image/pexels-flooriefloor-13787760.jpg',
    status: 'Hydraulic Testing Underway',
    description: 'State-of-the-art hydrological flood defense system with real-time IoT catchment basin modeling and ecological bank stabilization.'
  },
  kolkata: {
    id: 'PROJ-KOL-19',
    name: 'Kolkata Sub-Aqueous River Crossing & Metro Tunnel',
    city: 'Kolkata',
    state: 'West Bengal',
    sector: 'rail',
    type: 'Twin-Bore Hydroshield TBM Subterranean Crossing',
    year: '2025',
    scale: '14.2 KM',
    discipline: 'Subterranean Geotechnics & Slurry TBM',
    loadCapacity: '26.4 kN / m²',
    concreteGrade: 'M60 Gasketed Precast Segments',
    lat: '22.5726',
    long: '88.3639',
    image: 'image/pexels-alqasim-sadiq-458113001-20817774.jpg',
    status: 'Commissioned',
    description: 'Groundbreaking underwater transit tunnel beneath the Hooghly river with pressurized airlocks and hydrophilic gasket seals.'
  },
  kochi: {
    id: 'PROJ-KOC-07',
    name: 'Kochi Deepwater Container Terminal & Marine Quay',
    city: 'Kochi',
    state: 'Kerala',
    sector: 'water',
    type: 'Heavy Pile Quay Wall & Dredged Navigation Channel',
    year: '2027',
    scale: '9.8 KM',
    discipline: 'Maritime Geotechnical & Coastal Engineering',
    loadCapacity: '45.0 kN / m²',
    concreteGrade: 'M65 Silica-Fume Marine Grout',
    lat: '9.9312',
    long: '76.2673',
    image: 'image/pexels-tomfisk-4626415.jpg',
    status: 'Piling & Deck Casting',
    description: 'Post-Panamax vessel berth engineered for high-energy tidal currents and deep alluvial soft clay soil conditions.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const nodeElements = document.querySelectorAll('.map-node');
  const filterButtons = document.querySelectorAll('.map-filter-btn');

  // Inspector Card UI elements
  const inspTag = document.getElementById('inspTag');
  const inspTitle = document.getElementById('inspTitle');
  const inspType = document.getElementById('inspType');
  const inspYear = document.getElementById('inspYear');
  const inspScale = document.getElementById('inspScale');
  const inspDiscipline = document.getElementById('inspDiscipline');
  const inspLoad = document.getElementById('inspLoad');
  const inspImg = document.getElementById('inspImg');
  const inspDesc = document.getElementById('inspDesc');
  const inspCta = document.getElementById('inspCta');

  // Function to render a project into the Inspector card
  function selectProject(key) {
    const data = INFRASTRUCTURE_PROJECTS[key];
    if (!data) return;

    // Update Node active styles
    nodeElements.forEach(n => {
      if (n.dataset.city === key) {
        n.classList.add('active');
      } else {
        n.classList.remove('active');
      }
    });

    // Update connector lines
    document.querySelectorAll('.svg-truss-line').forEach(line => {
      const connects = line.dataset.connects || '';
      if (connects.includes(key)) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });

    // Update Inspector UI with smooth text reveal
    if (inspTag) inspTag.textContent = `${data.id} / ${data.city.toUpperCase()}`;
    if (inspTitle) inspTitle.textContent = data.name;
    if (inspType) inspType.textContent = data.type;
    if (inspYear) inspYear.textContent = data.year;
    if (inspScale) inspScale.textContent = data.scale;
    if (inspDiscipline) inspDiscipline.textContent = data.discipline;
    if (inspLoad) inspLoad.textContent = data.loadCapacity;
    if (inspDesc) inspDesc.textContent = data.description;
    if (inspImg) {
      inspImg.src = data.image;
      inspImg.alt = data.name;
    }

    if (inspCta) {
      inspCta.onclick = () => {
        if (window.openCaseStudyModal) {
          window.openCaseStudyModal(key);
        }
      };
    }

    // Sync continuous Engineering Data Rail
    if (window.updateEngineeringRail) {
      window.updateEngineeringRail(
        `${data.id} / ${data.discipline.split('&')[0].trim().toUpperCase()} / ${data.year}`,
        `LOAD CAPACITY / ${data.loadCapacity}`,
        data.lat,
        data.long
      );
    }
  }

  // Bind clicks on SVG nodes
  nodeElements.forEach(node => {
    node.addEventListener('click', () => {
      const city = node.dataset.city;
      selectProject(city);
    });
  });

  // Filter Buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      let firstMatch = null;

      nodeElements.forEach(node => {
        const city = node.dataset.city;
        const proj = INFRASTRUCTURE_PROJECTS[city];
        if (filter === 'all' || proj.sector === filter) {
          node.style.opacity = '1';
          node.style.pointerEvents = 'all';
          if (!firstMatch) firstMatch = city;
        } else {
          node.style.opacity = '0.2';
          node.style.pointerEvents = 'none';
        }
      });

      if (firstMatch) {
        selectProject(firstMatch);
      }
    });
  });

  // Default selection: Chennai HQ
  selectProject('chennai');
});
