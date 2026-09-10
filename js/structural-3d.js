// Three.js 3D Structural Engineering CAD Visualizer

(function() {
  let scene, camera, renderer, bridgeGroup, gridHelper;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let currentMode = 'stress'; // 'wireframe', 'stress', 'solid'
  let trussMaterials = {};

  function init3DVisualizer() {
    const container = document.getElementById('structuralCanvasContainer');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d12);
    scene.fog = new THREE.FogExp2(0x090d12, 0.015);

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(35, 25, 45);
    camera.lookAt(0, 5, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xd7a63d, 1.2);
    dirLight1.position.set(30, 40, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00d2ff, 0.8);
    dirLight2.position.set(-30, 20, -20);
    scene.add(dirLight2);

    // CAD Grid Floor
    gridHelper = new THREE.GridHelper(80, 40, 0xd7a63d, 0x223242);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Build the Parametric 3D Truss Bridge & Viaduct Pylons
    buildStructuralModel();

    // Event Listeners for Rotation & Zoom
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      bridgeGroup.rotation.y += deltaX * 0.008;
      bridgeGroup.rotation.x = Math.max(-0.5, Math.min(0.8, bridgeGroup.rotation.x + deltaY * 0.005));

      previousMousePosition = { x: e.clientX, y: e.clientY };

      // Update live stress telemetry
      updateStressHUD();
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      bridgeGroup.rotation.y += deltaX * 0.008;
      bridgeGroup.rotation.x = Math.max(-0.5, Math.min(0.8, bridgeGroup.rotation.x + deltaY * 0.005));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    // Mode Buttons
    document.querySelectorAll('.vis-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.vis-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setRenderMode(btn.dataset.mode);
      });
    });

    // Resize
    function handleResize() {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 400;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => setTimeout(handleResize, 200));

    // Animation Loop
    animate();
  }

  function buildStructuralModel() {
    bridgeGroup = new THREE.Group();

    // Define materials
    trussMaterials.wire = new THREE.MeshBasicMaterial({ color: 0x00d2ff, wireframe: true });
    trussMaterials.solid = new THREE.MeshStandardMaterial({ color: 0x37444f, roughness: 0.4, metalness: 0.8 });
    trussMaterials.amber = new THREE.MeshStandardMaterial({ color: 0xd7a63d, roughness: 0.3, metalness: 0.6, emissive: 0x5a4110 });
    trussMaterials.stressHigh = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3, emissive: 0x661010 });
    trussMaterials.stressMid = new THREE.MeshStandardMaterial({ color: 0xd7a63d, roughness: 0.3, emissive: 0x443000 });
    trussMaterials.stressLow = new THREE.MeshStandardMaterial({ color: 0x00d2ff, roughness: 0.3, emissive: 0x003344 });

    // 1. Concrete Pier Pylons (Substructure)
    const pylonGeo = new THREE.BoxGeometry(4, 20, 4);
    const pylonMat = new THREE.MeshStandardMaterial({ color: 0x223242, roughness: 0.9 });

    const pylon1 = new THREE.Mesh(pylonGeo, pylonMat);
    pylon1.position.set(-18, 5, 0);
    bridgeGroup.add(pylon1);

    const pylon2 = new THREE.Mesh(pylonGeo, pylonMat);
    pylon2.position.set(18, 5, 0);
    bridgeGroup.add(pylon2);

    // 2. Viaduct Deck (Main Roadway)
    const deckGeo = new THREE.BoxGeometry(64, 1.2, 10);
    const deckMat = new THREE.MeshStandardMaterial({ color: 0x151e27, roughness: 0.7 });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(0, 15, 0);
    bridgeGroup.add(deck);

    // Road lane markings
    const lineGeo = new THREE.BoxGeometry(60, 0.05, 0.3);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xd7a63d });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.set(0, 15.65, 0);
    bridgeGroup.add(line);

    // 3. Warren / Pratt Truss Superstructure Members
    const numBays = 8;
    const bayWidth = 60 / numBays;
    const trussHeight = 10;
    const trussZOffsets = [-4.5, 4.5];

    trussZOffsets.forEach(zOffset => {
      // Top Chord
      const topChordGeo = new THREE.CylinderGeometry(0.35, 0.35, 60, 8);
      const topChord = new THREE.Mesh(topChordGeo, trussMaterials.stressMid);
      topChord.rotation.z = Math.PI / 2;
      topChord.position.set(0, 15 + trussHeight, zOffset);
      bridgeGroup.add(topChord);

      // Bottom Chord
      const botChordGeo = new THREE.CylinderGeometry(0.4, 0.4, 60, 8);
      const botChord = new THREE.Mesh(botChordGeo, trussMaterials.stressHigh);
      botChord.rotation.z = Math.PI / 2;
      botChord.position.set(0, 15, zOffset);
      bridgeGroup.add(botChord);

      // Vertical & Diagonal Truss Members
      for (let i = 0; i <= numBays; i++) {
        const xPos = -30 + i * bayWidth;

        // Vertical post
        const postGeo = new THREE.CylinderGeometry(0.25, 0.25, trussHeight, 8);
        const stressMat = (i === 0 || i === numBays || i === 4) ? trussMaterials.stressHigh : trussMaterials.stressLow;
        const post = new THREE.Mesh(postGeo, stressMat);
        post.position.set(xPos, 15 + trussHeight / 2, zOffset);
        bridgeGroup.add(post);

        // Diagonal web member
        if (i < numBays) {
          const diagLength = Math.sqrt(bayWidth * bayWidth + trussHeight * trussHeight);
          const diagGeo = new THREE.CylinderGeometry(0.22, 0.22, diagLength, 8);
          const diag = new THREE.Mesh(diagGeo, (i % 2 === 0) ? trussMaterials.stressMid : trussMaterials.stressLow);
          diag.position.set(xPos + bayWidth / 2, 15 + trussHeight / 2, zOffset);
          const angle = Math.atan2(trussHeight, bayWidth);
          diag.rotation.z = (i % 2 === 0) ? -angle : angle;
          bridgeGroup.add(diag);
        }
      }
    });

    // 4. Stay Cables from Center Pylon Tower
    const centerTowerGeo = new THREE.BoxGeometry(2, 28, 2);
    const centerTower = new THREE.Mesh(centerTowerGeo, trussMaterials.solid);
    centerTower.position.set(0, 20, 0);
    bridgeGroup.add(centerTower);

    // Radiating stay cables
    const cableAngles = [-20, -14, -8, 8, 14, 20];
    cableAngles.forEach(xAnchor => {
      const start = new THREE.Vector3(0, 32, 0);
      const end = new THREE.Vector3(xAnchor, 15, 0);
      const dir = new THREE.Vector3().subVectors(end, start);
      const len = dir.length();
      
      const cableGeo = new THREE.CylinderGeometry(0.08, 0.08, len, 6);
      const cable = new THREE.Mesh(cableGeo, trussMaterials.amber);
      cable.position.copy(start).add(dir.multiplyScalar(0.5));
      cable.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      bridgeGroup.add(cable);
    });

    // 5. Amber IoT Sensor Node Beacons (Blinking nodes)
    const sensorGeo = new THREE.SphereGeometry(0.5, 12, 12);
    const sensorMat = new THREE.MeshBasicMaterial({ color: 0xd7a63d });

    const sensorPositions = [
      new THREE.Vector3(-18, 15, 4.5),
      new THREE.Vector3(0, 32, 0),
      new THREE.Vector3(18, 15, -4.5),
      new THREE.Vector3(0, 15, 0),
      new THREE.Vector3(25, 15, 4.5)
    ];

    sensorPositions.forEach(pos => {
      const sensor = new THREE.Mesh(sensorGeo, sensorMat);
      sensor.position.copy(pos);
      sensor.userData = { isSensor: true };
      bridgeGroup.add(sensor);
    });

    scene.add(bridgeGroup);
  }

  function setRenderMode(mode) {
    currentMode = mode;
    bridgeGroup.traverse(child => {
      if (child.isMesh && !child.userData.isSensor) {
        if (mode === 'wireframe') {
          child.material = trussMaterials.wire;
        } else if (mode === 'solid') {
          child.material = trussMaterials.solid;
        } else {
          // Default stress mode
          child.material = trussMaterials.stressMid;
        }
      }
    });
  }

  function updateStressHUD() {
    const strainEl = document.getElementById('hudStrain');
    const deflectionEl = document.getElementById('hudDeflection');
    const safetyEl = document.getElementById('hudSafetyFactor');

    if (strainEl) {
      const dynamicStrain = (380 + Math.sin(Date.now() * 0.002) * 24).toFixed(1);
      strainEl.textContent = `${dynamicStrain} µε`;
    }
    if (deflectionEl) {
      const dynamicDeflection = (12.4 + Math.cos(Date.now() * 0.002) * 1.2).toFixed(2);
      deflectionEl.textContent = `${dynamicDeflection} mm`;
    }
    if (safetyEl) {
      safetyEl.textContent = '2.84 [SAFE]';
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    // Subtle ambient idle rotation
    if (!isDragging && bridgeGroup) {
      bridgeGroup.rotation.y += 0.002;
    }

    // Pulse sensor beacons
    if (bridgeGroup) {
      const time = Date.now() * 0.005;
      bridgeGroup.traverse(child => {
        if (child.userData && child.userData.isSensor) {
          const scale = 1 + Math.sin(time) * 0.25;
          child.scale.set(scale, scale, scale);
        }
      });
    }

    updateStressHUD();
    renderer.render(scene, camera);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE !== 'undefined') {
      init3DVisualizer();
    } else {
      console.warn('Three.js not yet available. Retrying...');
      setTimeout(init3DVisualizer, 500);
    }
  });
})();
