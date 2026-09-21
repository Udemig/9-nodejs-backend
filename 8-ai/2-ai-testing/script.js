/**
 * NOVA — THE FUTURE OF DIGITAL WORKSPACES
 * Interactive Vanilla JavaScript Engine
 * Handcrafted without external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initNavbar();
  initAmbientToggle();
  initHeroTiltAndPrompt();
  initStatsCounters();
  initInteractiveDemo();
  initTestimonialsSlider();
  initPricingToggle();
  initFaqAccordion();
  initNewsletterForm();
  initModals();
  initCardTilts();

  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================
   1. NAVBAR & MOBILE NAVIGATION
   ========================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  // Sticky navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
}

/* ==========================================================
   2. AMBIENT THEME ACCENT TOGGLE
   ========================================================== */
function initAmbientToggle() {
  const toggleBtn = document.getElementById('ambientToggleBtn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('theme-hyperdrive');
    const isHyperdrive = document.body.classList.contains('theme-hyperdrive');
    
    if (isHyperdrive) {
      showToast('⚡ Hyperdrive Neon Mode activated!', 'info');
    } else {
      showToast('🌌 Quantum Cyan Mode restored', 'info');
    }
  });
}

/* ==========================================================
   3. HERO HUD TILT & LIVE PROMPT SIMULATOR
   ========================================================== */
function initHeroTiltAndPrompt() {
  const heroMockup = document.getElementById('heroMockup');
  const promptInput = document.getElementById('heroPromptInput');
  const promptSubmit = document.getElementById('heroPromptSubmit');

  // Interactive 3D Perspective Tilt on Mouse Movement
  if (heroMockup && window.innerWidth > 992) {
    heroMockup.addEventListener('mousemove', (e) => {
      const rect = heroMockup.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4; // Max -4deg to 4deg
      const rotateY = ((x - centerX) / centerX) * 4;

      heroMockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    heroMockup.addEventListener('mouseleave', () => {
      heroMockup.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  // Hero Prompt Input
  if (promptSubmit && promptInput) {
    const handleHeroPrompt = () => {
      const query = promptInput.value.trim();
      if (!query) {
        showToast('Please enter an instruction for Nova AI', 'info');
        return;
      }
      
      promptSubmit.textContent = 'Synthesizing...';
      promptSubmit.disabled = true;

      setTimeout(() => {
        promptSubmit.textContent = 'Executed ✓';
        showToast(`Agent dispatched: "${query.substring(0, 32)}..."`, 'success');
        
        setTimeout(() => {
          promptSubmit.textContent = 'Run Prompt';
          promptSubmit.disabled = false;
        }, 2000);
      }, 850);
    };

    promptSubmit.addEventListener('click', handleHeroPrompt);
    promptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleHeroPrompt();
    });
  }
}

/* ==========================================================
   4. ANIMATED STATISTICS COUNTERS (IntersectionObserver)
   ========================================================== */
function initStatsCounters() {
  const counters = document.querySelectorAll('.metric-counter');
  if (!counters.length) return;

  let hasAnimated = false;

  const animateCounter = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const decimals = parseInt(counter.getAttribute('data-decimals'), 10) || 0;
    const duration = 2000; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easeOutQuad function
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOutProgress * target;

      counter.textContent = currentVal.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target.toFixed(decimals);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => animateCounter(counter));
        obs.disconnect(); // Only animate once
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById('metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================
   5. INTERACTIVE PRODUCT DEMO SANDBOX
   ========================================================== */
function initInteractiveDemo() {
  // Tab Switcher
  const tabBtns = document.querySelectorAll('.demo-tab-btn');
  const tabPanes = document.querySelectorAll('.demo-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update buttons state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panes state
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `pane-${targetTab}`) {
          pane.classList.add('active');
        }
      });
    });
  });

  // --- Sub-Module A: AI Copilot Simulator ---
  initCopilotDemo();

  // --- Sub-Module B: Spatial Canvas Node Inspector ---
  initSpatialCanvasDemo();

  // --- Sub-Module C: Universal Command Palette Filter ---
  initCommandPaletteDemo();

  // --- Sub-Module D: Telemetry Live Data Stream ---
  initTelemetryDemo();
}

/**
 * AI Copilot stream generator with realistic streaming tokens
 */
function initCopilotDemo() {
  const outputCode = document.getElementById('copilotStreamOutput');
  const chips = document.querySelectorAll('.chip-action');
  const customInput = document.getElementById('demoCustomInput');
  const submitBtn = document.getElementById('demoSubmitPrompt');
  const copyBtn = document.getElementById('copyOutputBtn');
  const latencyDisplay = document.getElementById('simulatedLatency');

  const presetResponses = {
    'Analyze security compliance across microservices and map CVE exposure': {
      status: 'VERIFIED_CLEAN',
      latency: '11ms',
      result: `{\n  "agent": "Nova-Sentinel-Security-Agent",\n  "auditScope": "34 Microservices / 128 Endpoints",\n  "findings": {\n    "criticalVulnerabilities": 0,\n    "highRiskConfig": 0,\n    "pkiRotationDue": "42 days",\n    "zeroTrustMesh": "ENFORCED (WireGuard mTLS)"\n  },\n  "recommendation": "All egress traffic complies with SOC2 Type II & FedRAMP constraints."\n}`
    },
    'Draft architectural technical spec for distributed Redis caching layer': {
      status: 'COMPILED',
      latency: '16ms',
      result: `## Technical Specification: Cluster Cache Layer\n\n- Topology: 6-node Redis Cluster with multi-region replica\n- Eviction Policy: Volatile-LFU (Least Frequently Used)\n- Serialization: FlatBuffers binary (P99 latency < 0.4ms)\n- Consistency Model: CRDT causal write consensus\n- Failover SLA: Automatic election within 300ms`
    },
    'Convert Figma design token exports into Tailwind and WebGL shader code': {
      status: 'SYNCED',
      latency: '9ms',
      result: `// Generated Nova Token Binding\nexport const themeTokens = {\n  brandCyan: "hsl(184, 100%, 50%)",\n  quantumPurple: "hsl(270, 100%, 50%)",\n  spatialBlur: "20px",\n  shaderUniforms: {\n    u_time: { type: "1f", value: 0.0 },\n    u_resolution: { type: "2fv", value: [1920, 1080] }\n  }\n};\nconsole.log("Tokens synced across 14 UI components in 8ms.");`
    }
  };

  let typingInterval = null;

  const streamText = (text, latency) => {
    if (!outputCode) return;
    clearInterval(typingInterval);
    outputCode.textContent = '';
    
    if (latencyDisplay && latency) {
      latencyDisplay.textContent = latency;
    }

    let i = 0;
    const speed = 7; // ms per chunk
    const chunkSize = 3; // chars per tick for smooth streaming

    typingInterval = setInterval(() => {
      if (i < text.length) {
        outputCode.textContent += text.substr(i, chunkSize);
        i += chunkSize;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt');
      if (customInput) customInput.value = promptText;
      const responseObj = presetResponses[promptText];
      if (responseObj) {
        streamText(responseObj.result, responseObj.latency);
      }
    });
  });

  if (submitBtn && customInput) {
    submitBtn.addEventListener('click', () => {
      const val = customInput.value.trim();
      if (!val) {
        showToast('Please enter an instruction prompt', 'info');
        return;
      }

      const randomLatency = Math.floor(Math.random() * 10 + 8) + 'ms';
      const customResponse = `{\n  "query": "${val}",\n  "status": "AUTONOMOUS_SYNTHESIS_COMPLETE",\n  "executionTime": "${randomLatency}",\n  "nodesCoordinated": 12,\n  "summary": "Nova neural parser successfully created dependency graphs and mapped live workspace state."\n}`;
      
      streamText(customResponse, randomLatency);
    });
  }

  // Copy button functionality
  if (copyBtn && outputCode) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(outputCode.textContent).then(() => {
        copyBtn.textContent = 'Copied!';
        showToast('Output copied to clipboard', 'success');
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1800);
      });
    });
  }
}

/**
 * Spatial Canvas Node Inspector
 */
function initSpatialCanvasDemo() {
  const nodes = document.querySelectorAll('.interactive-node');
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorBody = document.getElementById('inspectorBody');

  const nodeData = {
    'Frontend SPA': {
      title: 'Next.js 15 Client',
      desc: 'Connected via WebTransport with binary Protobuf serialization. Real-time DOM diffing synced to canvas viewport.'
    },
    'Nova Core Relay': {
      title: 'Nova CRDT Relay',
      desc: 'High-throughput Rust actor runtime maintaining conflict-free multi-master causality vectors across 32 edge clusters.'
    },
    'Vector Database': {
      title: 'HNSW Vector Store',
      desc: 'Hierarchical Navigable Small World graph indexing 1.8M contextual code embeddings for sub-millisecond retrieval.'
    },
    'Agent Swarm': {
      title: 'Autonomous Swarm',
      desc: 'Orchestrator managing 16 parallel LLM workers executing automated git PR reviews, linting, and design sync.'
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const nodeKey = node.getAttribute('data-node');
      const data = nodeData[nodeKey];
      if (data && inspectorTitle && inspectorBody) {
        inspectorTitle.textContent = data.title;
        inspectorBody.textContent = data.desc;
      }
    });
  });
}

/**
 * Universal Command Palette Sandbox
 */
function initCommandPaletteDemo() {
  const paletteInput = document.getElementById('paletteSearchInput');
  const resultsContainer = document.getElementById('paletteResults');

  const commandItems = [
    { title: 'Create new Spatial Workspace', category: 'CANVAS', icon: '✦', action: 'Created new canvas' },
    { title: 'Deploy Swarm Agent to review PR #1042', category: 'AGENTS', icon: '🤖', action: 'Dispatched reviewer agent' },
    { title: 'Export Workspace to OpenAPI 3.1 & TypeScript', category: 'TOOLS', icon: '⚡', action: 'Generated schemas' },
    { title: 'Toggle End-to-End Zero Knowledge Encryption', category: 'SECURITY', icon: '🔒', action: 'Encryption keys rotated' },
    { title: 'Invite team member to collaborative session', category: 'COLLAB', icon: '👥', action: 'Invite link generated' },
    { title: 'Sync Figma variable tokens with CSS Variables', category: 'DESIGN', icon: '🎨', action: 'Figma tokens synced' },
    { title: 'Switch consensus region to Frankfurt (fra1)', category: 'NETWORK', icon: '🌐', action: 'Region switched to fra1' }
  ];

  const renderResults = (filterText = '') => {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = '';

    const filtered = commandItems.filter(item => 
      item.title.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.88rem;">No matching commands found. Press ESC to clear.</div>`;
      return;
    }

    filtered.forEach((cmd, idx) => {
      const itemEl = document.createElement('div');
      itemEl.className = `palette-item ${idx === 0 ? 'active' : ''}`;
      itemEl.innerHTML = `
        <div class="palette-item-left">
          <span class="palette-item-icon">${cmd.icon}</span>
          <span class="palette-item-title">${cmd.title}</span>
        </div>
        <span class="palette-item-category">${cmd.category}</span>
      `;

      itemEl.addEventListener('click', () => {
        showToast(`Executed: ${cmd.title}`, 'success');
      });

      resultsContainer.appendChild(itemEl);
    });
  };

  if (paletteInput) {
    paletteInput.addEventListener('input', (e) => {
      renderResults(e.target.value);
    });

    paletteInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        paletteInput.value = '';
        renderResults('');
      }
    });

    // Initial render
    renderResults('');
  }
}

/**
 * Live Telemetry Dynamic Numbers Simulator
 */
function initTelemetryDemo() {
  const throughputEl = document.getElementById('telThroughput');
  const pingEl = document.getElementById('telPing');
  const barChart = document.getElementById('barChart');

  if (!throughputEl || !pingEl) return;

  // Periodically fluctuate values for futuristic live dashboard feel
  setInterval(() => {
    // Random throughput between 1,245,000 and 1,259,000
    const randomThroughput = Math.floor(1245000 + Math.random() * 14000);
    throughputEl.textContent = randomThroughput.toLocaleString();

    // Latency around 5.8 - 6.8ms
    const randomPing = (5.8 + Math.random() * 1.0).toFixed(1);
    pingEl.innerHTML = `${randomPing} <span class="unit">ms</span>`;

    // Subtle bar chart animation
    if (barChart) {
      const bars = barChart.querySelectorAll('.bar');
      bars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 55 + 45) + '%';
        bar.style.height = randomHeight;
      });
    }
  }, 2400);
}

/* ==========================================================
   6. CUSTOMER TESTIMONIALS SLIDER
   ========================================================== */
function initTestimonialsSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (!cards.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  const showSlide = (index) => {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;
    currentIndex = index;

    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === currentIndex);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(targetIndex);
      resetAutoplay();
    });
  });

  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 7000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  startAutoplay();
}

/* ==========================================================
   7. PRICING BILLING TOGGLE (Monthly / Annual)
   ========================================================== */
function initPricingToggle() {
  const toggle = document.getElementById('pricingBillingToggle');
  const labelMonthly = document.getElementById('labelMonthly');
  const labelAnnual = document.getElementById('labelAnnual');
  const priceValues = document.querySelectorAll('.price-value');
  const planButtons = document.querySelectorAll('.select-plan-btn');

  if (!toggle) return;

  const updatePrices = (isAnnual) => {
    if (isAnnual) {
      labelAnnual.classList.add('active');
      labelMonthly.classList.remove('active');
    } else {
      labelMonthly.classList.add('active');
      labelAnnual.classList.remove('active');
    }

    priceValues.forEach(el => {
      const targetVal = isAnnual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
      
      // Animate price change
      el.style.opacity = '0';
      el.style.transform = 'translateY(-6px)';
      
      setTimeout(() => {
        el.textContent = targetVal;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 150);
    });
  };

  toggle.addEventListener('change', () => {
    updatePrices(toggle.checked);
  });

  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => {
      toggle.checked = false;
      updatePrices(false);
    });
  }

  if (labelAnnual) {
    labelAnnual.addEventListener('click', () => {
      toggle.checked = true;
      updatePrices(true);
    });
  }

  // Plan select buttons trigger modal
  planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      openAccessModal(`Selected Plan: ${plan}`);
    });
  });
}

/* ==========================================================
   8. FAQ ACCORDION
   ========================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================
   9. NEWSLETTER CTA FORM
   ========================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('emailInput');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
      feedback.textContent = 'Please enter a valid work email address.';
      feedback.className = 'form-feedback error';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Processing...</span>';

    setTimeout(() => {
      feedback.textContent = '✓ Access invitation reserved! Check your inbox shortly.';
      feedback.className = 'form-feedback success';
      emailInput.value = '';
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Request Early Access</span>';
      showToast('Early access invite dispatched!', 'success');
    }, 900);
  });
}

/* ==========================================================
   10. INTERACTIVE MODALS & TOAST NOTIFICATIONS
   ========================================================== */
let openAccessModal = () => {};

function initModals() {
  const accessModal = document.getElementById('accessModal');
  const tourModal = document.getElementById('tourModal');
  
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeTourModalBtn = document.getElementById('closeTourModalBtn');
  const modalSuccessDoneBtn = document.getElementById('modalSuccessDoneBtn');
  
  const modalForm = document.getElementById('modalForm');
  const modalSuccessState = document.getElementById('modalSuccessState');
  const modalTitle = document.getElementById('modalTitle');

  // Trigger buttons
  const heroStartBtn = document.getElementById('heroStartBtn');
  const heroTourBtn = document.getElementById('heroTourBtn');
  const openSignInBtn = document.getElementById('openSignInBtn');
  const openGetStartedBtn = document.getElementById('openGetStartedBtn');
  const openSignInMobileBtn = document.getElementById('openSignInMobileBtn');
  const openGetStartedMobileBtn = document.getElementById('openGetStartedMobileBtn');
  const tourPlayBtn = document.getElementById('tourPlayBtn');

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openAccessModal = (customTitle) => {
    if (modalForm && modalSuccessState) {
      modalForm.style.display = 'flex';
      modalSuccessState.classList.remove('active');
    }
    if (customTitle && modalTitle) {
      modalTitle.textContent = customTitle;
    } else if (modalTitle) {
      modalTitle.textContent = 'Deploy Your Nova Workspace';
    }
    openModal(accessModal);
  };

  // Bind Openers
  if (heroStartBtn) heroStartBtn.addEventListener('click', () => openAccessModal());
  if (openGetStartedBtn) openGetStartedBtn.addEventListener('click', () => openAccessModal());
  if (openGetStartedMobileBtn) openGetStartedMobileBtn.addEventListener('click', () => openAccessModal());
  if (openSignInBtn) openSignInBtn.addEventListener('click', () => openAccessModal('Sign In to Nova Workspace'));
  if (openSignInMobileBtn) openSignInMobileBtn.addEventListener('click', () => openAccessModal('Sign In to Nova Workspace'));

  if (heroTourBtn) heroTourBtn.addEventListener('click', () => openModal(tourModal));
  if (tourPlayBtn) {
    tourPlayBtn.addEventListener('click', () => {
      showToast('Connecting to 4K WebRTC simulation feed...', 'info');
    });
  }

  // Bind Closers
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => closeModal(accessModal));
  if (closeTourModalBtn) closeTourModalBtn.addEventListener('click', () => closeModal(tourModal));
  if (modalSuccessDoneBtn) modalSuccessDoneBtn.addEventListener('click', () => closeModal(accessModal));

  // Close on backdrop click
  [accessModal, tourModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(accessModal);
      closeModal(tourModal);
    }
  });

  // Modal Form Submission
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('modalSubmitBtn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Provisioning Neural Cluster...</span>';

      setTimeout(() => {
        modalForm.style.display = 'none';
        modalSuccessState.classList.add('active');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Provision Instant Sandbox</span>`;
        showToast('Workspace initialized successfully!', 'success');
      }, 1200);
    });
  }
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? '✓' : '✦';
  toast.innerHTML = `
    <span style="color: var(--accent-cyan); font-weight: 700;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

/* ==========================================================
   11. CARD HOVER TILT EFFECTS
   ========================================================== */
function initCardTilts() {
  if (window.innerWidth <= 992) return;

  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* Utility Helpers */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
