document.addEventListener("DOMContentLoaded", () => {
  // Navigation handler
  function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn, .nav-trigger');
    const sections = document.querySelectorAll('.page-section');
    
    navBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = btn.dataset.section;
        
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Hide all sections
        sections.forEach(s => s.classList.remove('active'));
        
        // Show target section
        document.getElementById(targetSection).classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // Certificate functionality (WORKS WITHOUT PDFs for now)
  function initCertificates() {
    // View All Certificates button
    document.getElementById('viewAllCerts')?.addEventListener('click', () => {
      loadCertificateGallery();
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('cert-gallery').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Back button
    document.getElementById('backToCerts')?.addEventListener('click', () => {
      document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
      document.getElementById('certificates').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function loadCertificateGallery() {
    const grid = document.getElementById('pdfGrid');
    const certificates = [
      { title: 'Google Data Analytics Professional Certificate', file: 'certificates/google-data-analytics.pdf' },
      { title: 'Python for Data Science, AI & Development (IBM)', file: 'certificates/python-data-science.pdf' },
      { title: 'Programming for Everybody (University of Michigan)', file: 'certificates/programming-everybody.pdf' }
    ];

    grid.innerHTML = certificates.map(cert => `
      <div class="pdf-item" data-tilt>
        <div class="pdf-thumbnail">📜</div>
        <div class="pdf-title">${cert.title}</div>
        <a href="${cert.file}" class="pdf-download" target="_blank">View Certificate PDF</a>
      </div>
    `).join('');

    // Re-init tilt on new elements
    VanillaTilt.init(document.querySelectorAll('.pdf-item[data-tilt]'));
  }

  // Initialize everything
  initNavigation();
  initCertificates();
  
  // AOS animations
  AOS.init();
  
  // VanillaTilt
  VanillaTilt.init(
    document.querySelectorAll("[data-tilt]"),
    window.innerWidth > 768 ? 
      { max: 10, speed: 400, glare: true, "max-glare": 0.18, scale: 1.05 } :
      { max: 5, glare: false, scale: 1.02 }
  );

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

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navigation
  document.querySelectorAll('.nav-btn, .nav-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.section;
      
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
      document.getElementById(target).classList.add('active');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // 2. CERTIFICATE BUTTONS (THIS FIXES YOUR PROBLEM)
  document.getElementById('viewAllCerts').addEventListener('click', () => {
    // Hide all sections first
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    
    // Load gallery and show it
    loadCertificateGallery();
    document.getElementById('cert-gallery').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('backToCerts').addEventListener('click', () => {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById('certificates').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Individual PDF buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-pdf-btn')) {
      const pdfUrl = e.target.closest('.certificate-card').dataset.pdf;
      window.open(pdfUrl, '_blank');
    }
  });

function loadCertificateGallery() {
  const grid = document.getElementById('pdfGrid');
  const certificates = [
    { title: 'Google Data Analytics', file: 'certificates/Google_Data_Analytics.pdf' },
    { title: 'Python for Data Science IBM', file: 'certificates/Python_Data_Science_IBM.pdf' },
    { title: 'Programming Fundamentals', file: 'certificates/Programming_Fundamentals.pdf' },
    { title: 'Introduction Web Analysis', file: 'certificates/Introduction_Web_Analysis.pdf' },
    { title: 'Introduction HTML', file: 'certificates/Introduction_HTML.pdf' },
    { title: 'HTML Public Speaking', file: 'certificates/HTML_Public_Speaking.pdf' },
    { title: 'HTML Participant Certificate', file: 'certificates/HTML_Participant.pdf' },
    { title: 'Coursera COVID', file: 'certificates/Coursera_COVID.pdf' },
    { title: 'Coursera English 1', file: 'certificates/Coursera_English_1.pdf' },
    { title: 'Coursera English 2', file: 'certificates/Coursera_English_2.pdf' },
    { title: 'Coursera JavaScript Basics', file: 'certificates/Coursera_JavaScript_Basics.pdf' },
    { title: 'Coursera Kaggle Python', file: 'certificates/Coursera_Kaggle_Python.pdf' },
    { title: 'Coursera Psychology', file: 'certificates/Coursera_Psychology.pdf' },
    { title: 'Coursera Python 2', file: 'certificates/Coursera_Python_2.pdf' },
    { title: 'Coursera Python FAQ', file: 'certificates/Coursera_Python_FAQ.pdf' },
    { title: 'Coursera SQL', file: 'certificates/Coursera_SQL.pdf' },
    { title: 'Sushant Kumar JavaScript', file: 'certificates/Sushant_Kumar_JavaScript.pdf' }
  ];

  grid.innerHTML = certificates.map(cert => `
    <div class="pdf-item" data-tilt>
      <div class="pdf-thumbnail">📜</div>
      <div class="pdf-title">${cert.title}</div>
      <a href="${cert.file}" class="pdf-download" target="_blank">View Certificate PDF</a>
    </div>
  `).join('');

  VanillaTilt.init(document.querySelectorAll('.pdf-item[data-tilt]'));
}


  // 3. AOS + Tilt
  AOS.init();
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: window.innerWidth > 768 ? 10 : 5,
    speed: 400, glare: window.innerWidth > 768
  });

  // 4. Dark mode
  const toggle = document.getElementById('toggleDarkMode');
  if (toggle) {
    const isDark = localStorage.getItem('darkMode') === 'true';
    toggle.checked = isDark;
    document.body.classList.toggle('dark-mode', isDark);
    
    toggle.addEventListener('change', e => {
      document.body.classList.toggle('dark-mode', e.target.checked);
      localStorage.setItem('darkMode', e.target.checked);
    });
  }

  // 5. Form validation
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
});
