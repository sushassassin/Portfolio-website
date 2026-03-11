document.addEventListener("DOMContentLoaded", () => {
  // Navigation handler
  function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn, .nav-trigger');
    const sections = document.querySelectorAll('.page-section');
    
    navBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if(btn.tagName === 'A' && btn.getAttribute('href')?.startsWith('http')) return;
        e.preventDefault();
        const targetSection = btn.dataset.section;
        if (!targetSection) return;
        
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        if (btn.classList.contains('nav-btn')) {
          btn.classList.add('active');
        } else {
          const tabBtn = document.querySelector(`.nav-btn[data-section="${targetSection}"]`);
          if (tabBtn) tabBtn.classList.add('active');
        }
        
        // Hide all sections
        sections.forEach(s => s.classList.remove('active'));
        
        // Show target section
        const targetEl = document.getElementById(targetSection);
        if (targetEl) targetEl.classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // Certificate functionality
  function initCertificates() {
    // View All Certificates button
    const viewAllBtn = document.getElementById('viewAllCerts');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => {
        loadCertificateGallery();
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        document.getElementById('cert-gallery').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Back button
    const backBtn = document.getElementById('backToCerts');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        const certBtn = document.querySelector('.nav-btn[data-section="certificates"]');
        if (certBtn) certBtn.classList.add('active');
        document.getElementById('certificates').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    
    // Individual PDF buttons in preview
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-pdf-btn')) {
        const certCard = e.target.closest('.certificate-card');
        if (certCard && certCard.dataset.pdf) {
          window.open(certCard.dataset.pdf, '_blank');
        }
      }
    });
  }

  function loadCertificateGallery() {
    const grid = document.getElementById('pdfGrid');
    if (!grid) return;
    
    const certificates = [
      { title: 'Google Data Analytics', file: 'certificates/Google Data analytics.pdf' },
      { title: 'Python for Data Science (IBM)', file: 'certificates/IBM Python.pdf' },
      { title: 'Programming Fundamentals', file: 'certificates/Programming Fundamentals.pdf' },
      { title: 'Coursera COVID', file: 'certificates/Coursera COVID.pdf' },
      { title: 'Coursera English', file: 'certificates/Coursera English.pdf' },
      { title: 'Coursera HTML', file: 'certificates/Coursera HTMl.pdf' },
      { title: 'Coursera Psychology', file: 'certificates/Coursera Psychology.pdf' },
      { title: 'Coursera Python', file: 'certificates/Coursera Python.pdf' },
      { title: 'Coursera Python 2', file: 'certificates/Coursera Python 2.pdf' },
      { title: 'Coursera JavaScript Basics', file: 'certificates/Coursera javascript basics.pdf' },
      { title: 'HTML', file: 'certificates/HTMl.pdf' },
      { title: 'Public Speaking', file: 'certificates/Public speaking.pdf' },
      { title: 'Participant Certificate', file: 'certificates/SUSHANT-KUMAR-19BEC1078-Participant-Certificate.pdf' },
      { title: 'Sensors and Actuators', file: 'certificates/Sensors and Actuators.jpg' },
      { title: 'Techinvent Anchoring', file: 'certificates/Techinvent anchoring.pdf' },
      { title: 'Uber Participation', file: 'certificates/participation-certificate Uber.pdf' },
      { title: 'UAV Workshop', file: 'certificates/Introductory workshop on Un-manned Arial Vehicals (UAVs).pdf' }
    ];

    grid.innerHTML = certificates.map(cert => `
      <div class="pdf-item" data-tilt>
        <div class="pdf-thumbnail">📜</div>
        <div class="pdf-title">${cert.title}</div>
        <a href="${cert.file}" class="pdf-download" target="_blank">View Certificate PDF</a>
      </div>
    `).join('');

    if (typeof VanillaTilt !== 'undefined' && VanillaTilt.init) {
      try {
        VanillaTilt.init(document.querySelectorAll('.pdf-item[data-tilt]'), 
          window.innerWidth > 768 ? 
            { max: 10, speed: 400, glare: true, "max-glare": 0.18, scale: 1.05 } :
            { max: 5, glare: false, scale: 1.02 }
        );
      } catch (e) {
        console.warn("VanillaTilt initialization failed for gallery items:", e);
      }
    }
  }

  // Initialize components
  initNavigation();
  initCertificates();
  
  // AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.init();
  }
  
  // VanillaTilt
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(
      document.querySelectorAll("[data-tilt]"),
      window.innerWidth > 768 ? 
        { max: 10, speed: 400, glare: true, "max-glare": 0.18, scale: 1.05 } :
        { max: 5, glare: false, scale: 1.02 }
    );
  }

  // Dark mode
  const darkModeToggle = document.getElementById('toggleDarkMode');
  if (darkModeToggle) {
    const isDark = localStorage.getItem('darkMode') === 'true';
    darkModeToggle.checked = isDark;
    document.body.classList.toggle('dark-mode', isDark);
    document.querySelector('.tab-nav')?.classList.toggle('dark-mode', isDark);
    
    darkModeToggle.addEventListener('change', e => {
      document.body.classList.toggle('dark-mode', e.target.checked);
      document.querySelector('.tab-nav')?.classList.toggle('dark-mode', e.target.checked);
      localStorage.setItem('darkMode', e.target.checked);
    });
  }

  // Search functionality
  const searchInput = document.getElementById('searchProjects');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.experience-card, .project-card, .certificate-card, .language-card, .pdf-item').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(query) ? 'block' : 'none';
      });
    });
  }

  // Form validation
  window.validateForm = function() {
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    if (!email || !subject || !message || !email.includes('@')) {
      alert('Please fill all fields with a valid email.');
      return false;
    }
    return true;
  };

  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');
  let ticking = false;
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
          ticking = false;
        });
        ticking = true;
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
