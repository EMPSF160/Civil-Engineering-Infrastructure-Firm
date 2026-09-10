// Main Application & Interaction Controller

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Universal Navigation Drawer (Full-Screen Slide Overlay)
  const mobileToggle = document.getElementById('mobileToggle');
  const navDrawer = document.getElementById('mainNav');
  const hamburgerIconBox = mobileToggle ? mobileToggle.querySelector('.hamburger-icon-box') : null;
  const hamburgerLabel = mobileToggle ? mobileToggle.querySelector('.hamburger-label') : null;

  if (mobileToggle && navDrawer) {
    function toggleNavDrawer(forceClose) {
      if (forceClose === true) {
        navDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        navDrawer.classList.toggle('open');
        mobileToggle.classList.toggle('active');
        const isOpenNow = navDrawer.classList.contains('open');
        mobileToggle.setAttribute('aria-expanded', isOpenNow ? 'true' : 'false');
      }
      
      const isOpen = navDrawer.classList.contains('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (hamburgerLabel) {
        hamburgerLabel.textContent = isOpen ? 'CLOSE' : 'MENU';
      }

      if (hamburgerIconBox) {
        hamburgerIconBox.innerHTML = isOpen 
          ? '<i data-lucide="x" style="width: 18px; height: 18px; stroke: var(--amber);"></i>' 
          : '<i data-lucide="menu" style="width: 18px; height: 18px; stroke: var(--amber);"></i>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    }

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNavDrawer();
    });

    // Close menu when clicking any nav link or button inside drawer
    navDrawer.querySelectorAll('a, .drawer-cta').forEach(item => {
      item.addEventListener('click', () => {
        toggleNavDrawer(true);
      });
    });

    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
        toggleNavDrawer(true);
      }
    });

    // Language pills interactive switcher inside drawer
    const langPills = navDrawer.querySelectorAll('.lang-pill');
    langPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        langPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  }

  // 3. Header Scroll Glassmorphism
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header && header.classList.add('scrolled');
    } else {
      header && header.classList.remove('scrolled');
    }
  });

  // 4. Statistics Count-Up Animation with Intersection Observer
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'), 10);
        if (!isNaN(target)) {
          animateValue(entry.target, 0, target, 2000);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => statsObserver.observe(stat));

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo formula
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      obj.innerHTML = Math.floor(easeProgress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // 5. Initialize Swiper for Featured Projects Carousel
  if (typeof Swiper !== 'undefined') {
    const projectSwiper = new Swiper('.project-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-btn-next',
        prevEl: '.swiper-btn-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 28,
        }
      }
    });
  }

  // 6. Interactive Tender / RFP Scope Estimator Calculator
  const calcForm = document.getElementById('tenderCalcForm');
  const estCostEl = document.getElementById('estCost');
  const estTimelineEl = document.getElementById('estTimeline');
  const estConcreteEl = document.getElementById('estConcrete');

  function calculateTenderEstimate() {
    const sector = document.getElementById('calcSector')?.value || 'bridges';
    const scaleKm = parseFloat(document.getElementById('calcScale')?.value) || 15;
    const soilType = document.getElementById('calcSoil')?.value || 'alluvial';
    const seismicZone = document.getElementById('calcSeismic')?.value || 'zone3';

    let costPerKm = 8.5; // in Million USD
    let monthsPerKm = 0.4;
    let concretePerKm = 6200; // in m³

    if (sector === 'bridges') {
      costPerKm = 14.2;
      monthsPerKm = 0.6;
      concretePerKm = 12000;
    } else if (sector === 'rail') {
      costPerKm = 18.0;
      monthsPerKm = 0.75;
      concretePerKm = 9800;
    } else if (sector === 'water') {
      costPerKm = 11.5;
      monthsPerKm = 0.5;
      concretePerKm = 8500;
    }

    if (soilType === 'marine') {
      costPerKm *= 1.35;
      monthsPerKm *= 1.25;
    } else if (soilType === 'rock') {
      costPerKm *= 1.15;
    }

    if (seismicZone === 'zone4') {
      costPerKm *= 1.18;
    } else if (seismicZone === 'zone5') {
      costPerKm *= 1.3;
    }

    const totalCost = (costPerKm * scaleKm).toFixed(1);
    const totalMonths = Math.max(12, Math.round(monthsPerKm * scaleKm + 8));
    const totalConcrete = Math.round(concretePerKm * scaleKm).toLocaleString();

    if (estCostEl) estCostEl.textContent = `$${totalCost}M USD`;
    if (estTimelineEl) estTimelineEl.textContent = `${totalMonths} Months`;
    if (estConcreteEl) estConcreteEl.textContent = `${totalConcrete} m³`;
  }

  if (calcForm) {
    calcForm.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('input', calculateTenderEstimate);
      input.addEventListener('change', calculateTenderEstimate);
    });
    calculateTenderEstimate();
  }

  // 7. Contact & Tender Form Submission Simulation
  const tenderForm = document.getElementById('projectInquiryForm');
  const formSuccess = document.getElementById('formSuccessMessage');
  if (tenderForm) {
    tenderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = tenderForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = `TRANSMITTING SPECIFICATION...`;
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (submitBtn) submitBtn.innerHTML = `PROPOSAL TRANSMITTED`;
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        tenderForm.reset();
      }, 1200);
    });
  }

  // 8. Video Player & HUD Camera Feed Controller with Universal Git LFS / GitHub CDN Fallback
  const GITHUB_MEDIA_BASE = 'https://media.githubusercontent.com/media/EMPSF160/Civil-Engineering-Infrastructure-Firm/main/';

  function resolveVideoSrc(src) {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    
    // Automatically use GitHub Media CDN when hosted on GitHub Pages
    const isHostedOnGitHub = window.location.hostname.includes('github.io') || window.location.hostname.includes('github.com');
    if (isHostedOnGitHub) {
      const cleanPath = src.replace(/^\.\//, '').replace(/^\//, '');
      return GITHUB_MEDIA_BASE + cleanPath;
    }
    return src;
  }

  function setupVideoAutoFallback(video) {
    if (!video) return;
    video.addEventListener('error', () => {
      const currentSrc = video.currentSrc || video.src || '';
      if (currentSrc && !currentSrc.includes('media.githubusercontent.com') && currentSrc.includes('videos/')) {
        const filename = currentSrc.substring(currentSrc.lastIndexOf('videos/'));
        const fallbackUrl = GITHUB_MEDIA_BASE + filename;
        if (video.src !== fallbackUrl) {
          console.warn(`[Video Fallback] Swapping to GitHub Media stream: ${fallbackUrl}`);
          video.src = fallbackUrl;
          video.muted = true;
          video.load();
          video.play().catch(() => {});
        }
      }
    }, true);
  }

  // Pre-bind error fallback to all videos on the page
  document.querySelectorAll('video').forEach(setupVideoAutoFallback);

  // If on GitHub Pages, adjust thumbnail video sources to direct media stream
  if (window.location.hostname.includes('github.io') || window.location.hostname.includes('github.com')) {
    document.querySelectorAll('.channel-thumb-video source, #heroVideoPlayer source, #theatreMainVideo source').forEach(source => {
      const current = source.getAttribute('src');
      if (current && !current.startsWith('http')) {
        source.setAttribute('src', resolveVideoSrc(current));
      }
    });
    document.querySelectorAll('video').forEach(v => {
      try { v.load(); v.play().catch(() => {}); } catch(e) {}
    });
  }

  const videoElem = document.getElementById('heroVideoPlayer');
  const camButtons = document.querySelectorAll('.cam-btn[data-src]');
  const playPauseBtn = document.getElementById('heroPlayPauseBtn');

  if (videoElem) {
    setupVideoAutoFallback(videoElem);
    videoElem.muted = true;
    const playPromise = videoElem.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: try on first user interaction
        const triggerPlay = () => {
          videoElem.muted = true;
          videoElem.play();
          window.removeEventListener('click', triggerPlay);
          window.removeEventListener('scroll', triggerPlay);
        };
        window.addEventListener('click', triggerPlay, { once: true });
        window.addEventListener('scroll', triggerPlay, { once: true });
      });
    }

    // Camera Switch Buttons
    camButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        camButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const rawSrc = btn.getAttribute('data-src');
        if (rawSrc) {
          videoElem.src = resolveVideoSrc(rawSrc);
          videoElem.muted = true;
          videoElem.play().catch(() => {});
        }
      });
    });

    // Storymap Floating Play/Pause Toggle & Header Play/Pause
    const floatingPlayBtn = document.getElementById('heroFloatingPlayBtn');
    
    function toggleVideoPlay() {
      if (videoElem.paused) {
        videoElem.play();
        if (floatingPlayBtn) floatingPlayBtn.innerHTML = '<i data-lucide="pause" style="width: 16px; height: 16px;"></i>';
        if (playPauseBtn) playPauseBtn.innerHTML = '<i data-lucide="pause" style="width: 12px; height: 12px;"></i>';
      } else {
        videoElem.pause();
        if (floatingPlayBtn) floatingPlayBtn.innerHTML = '<i data-lucide="play" style="width: 16px; height: 16px;"></i>';
        if (playPauseBtn) playPauseBtn.innerHTML = '<i data-lucide="play" style="width: 12px; height: 12px;"></i>';
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if (floatingPlayBtn) {
      floatingPlayBtn.addEventListener('click', toggleVideoPlay);
    }
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', toggleVideoPlay);
    }
  }

  // 9. 4K Aerial Video Mission Control & Tactical Matrix Controller
  const theatreVideo = document.getElementById('theatreMainVideo');
  const channelCards = document.querySelectorAll('.video-channel-card');
  const theatrePlayToggle = document.getElementById('theatrePlayToggle');
  const theatrePlayIcon = document.getElementById('theatrePlayIcon');
  const theatreMuteBtn = document.getElementById('theatreMuteBtn');
  const theatreMuteIcon = document.getElementById('theatreMuteIcon');
  const theatreFullBtn = document.getElementById('theatreFullBtn');
  const theatreScreenFrame = document.getElementById('theatreScreenContainer');
  const droneTargetReticle = document.getElementById('droneTargetReticle');

  const theatreChannelTag = document.getElementById('theatreChannelTag');
  const theatreCoords = document.getElementById('theatreCoords');
  const theatreProjId = document.getElementById('theatreProjId');
  const theatreTitle = document.getElementById('theatreTitle');
  const theatreDesc = document.getElementById('theatreDesc');

  // Sensor Filter Mode Buttons (RGB / Thermal / LiDAR / Night Vision)
  const sensorBtns = document.querySelectorAll('.sensor-btn');
  sensorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sensorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      if (theatreScreenFrame) {
        if (filter === 'normal') {
          theatreScreenFrame.removeAttribute('data-active-filter');
        } else {
          theatreScreenFrame.setAttribute('data-active-filter', filter);
        }
      }
    });
  });

  // Dynamic Mouse Reticle Target Tracking inside Master Screen
  if (theatreScreenFrame && droneTargetReticle) {
    theatreScreenFrame.addEventListener('mousemove', (e) => {
      const rect = theatreScreenFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      droneTargetReticle.style.left = `${x}px`;
      droneTargetReticle.style.top = `${y}px`;
    });
  }

  // Sector Category Filter Pills for Matrix Rack
  const matrixPills = document.querySelectorAll('.matrix-pill');
  matrixPills.forEach(pill => {
    pill.addEventListener('click', () => {
      matrixPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const sec = pill.getAttribute('data-sec');
      channelCards.forEach(card => {
        if (sec === 'all' || card.getAttribute('data-sec') === sec) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Snapshot CAD Photo Simulation
  const snapshotBtn = document.getElementById('captureSnapshotBtn');
  if (snapshotBtn) {
    snapshotBtn.addEventListener('click', () => {
      const origText = snapshotBtn.innerHTML;
      snapshotBtn.innerHTML = '<i data-lucide="check"></i> <span>CAD SNAPSHOT SAVED</span>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
      
      if (theatreScreenFrame) {
        theatreScreenFrame.style.filter = 'brightness(2) contrast(1.5)';
        setTimeout(() => {
          theatreScreenFrame.style.filter = '';
        }, 150);
      }

      setTimeout(() => {
        snapshotBtn.innerHTML = origText;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 2000);
    });
  }

  if (theatreVideo && channelCards.length > 0) {
    setupVideoAutoFallback(theatreVideo);
    theatreVideo.muted = true;

    // Channel Switching Handler
    channelCards.forEach(card => {
      card.addEventListener('click', () => {
        channelCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const rawSrc = card.getAttribute('data-src');
        const id = card.getAttribute('data-id');
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const tag = card.getAttribute('data-tag');
        const coords = card.getAttribute('data-coords');

        if (rawSrc && theatreVideo) {
          theatreVideo.src = resolveVideoSrc(rawSrc);
          theatreVideo.muted = true;
          theatreVideo.play().catch(() => {});
        }

        if (theatreProjId && id) theatreProjId.textContent = `PROJECT ID: ${id}`;
        if (theatreTitle && title) theatreTitle.textContent = title;
        if (theatreDesc && desc) theatreDesc.textContent = desc;
        if (theatreChannelTag && tag) theatreChannelTag.textContent = `${tag} • LIVE TELEMETRY`;
        if (theatreCoords && coords) theatreCoords.textContent = coords;

        if (theatrePlayIcon) {
          theatrePlayToggle.innerHTML = '<i data-lucide="pause"></i>';
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
      });
    });

    // Master Theatre Play/Pause Toggle
    if (theatrePlayToggle) {
      theatrePlayToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (theatreVideo.paused) {
          theatreVideo.play();
          theatrePlayToggle.innerHTML = '<i data-lucide="pause"></i>';
        } else {
          theatreVideo.pause();
          theatrePlayToggle.innerHTML = '<i data-lucide="play"></i>';
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    }

    // Audio Mute/Unmute Toggle
    if (theatreMuteBtn) {
      theatreMuteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        theatreVideo.muted = !theatreVideo.muted;
        theatreMuteBtn.innerHTML = theatreVideo.muted 
          ? '<i data-lucide="volume-x"></i>' 
          : '<i data-lucide="volume-2" style="color: var(--amber);"></i>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    }

    // Fullscreen Toggle
    if (theatreFullBtn && theatreScreenFrame) {
      theatreFullBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
          if (theatreScreenFrame.requestFullscreen) {
            theatreScreenFrame.requestFullscreen();
          } else if (theatreVideo.requestFullscreen) {
            theatreVideo.requestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }
  }
});
