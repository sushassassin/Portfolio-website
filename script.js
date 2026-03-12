    // ============================================
    // PARTICLES
    // ============================================
    (function() {
      const container = document.getElementById('particles');
      const count = 25;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const x = Math.random() * 100;
        const dur = 8 + Math.random() * 15;
        const delay = Math.random() * -20;
        const drift = (Math.random() - 0.5) * 200;
        p.style.cssText = `left:${x}%;animation-duration:${dur}s;animation-delay:${delay}s;--drift:${drift}px;opacity:0`;
        // Alternate gold / cyan
        p.style.background = i % 3 === 0 ? '#c9a84c' : '#63b3ed';
        container.appendChild(p);
      }
    })();

    // ============================================
    // NAVIGATION
    // ============================================
    (function() {
      const navBtns = document.querySelectorAll('.nav-btn, .nav-trigger');
      const sections = document.querySelectorAll('.page-section');

      function goToSection(targetSection) {
        if (!targetSection) return;
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll(`.nav-btn[data-section="${targetSection}"]`).forEach(b => b.classList.add('active'));
        sections.forEach(s => s.classList.remove('active'));
        const el = document.getElementById(targetSection);
        if (el) el.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (btn.tagName === 'A' && btn.getAttribute('href')?.startsWith('http')) return;
          e.preventDefault();
          goToSection(btn.dataset.section);
        });
      });

      // Certificates
      const viewAllBtn = document.getElementById('viewAllCerts');
      if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
          loadCertificateGallery();
          sections.forEach(s => s.classList.remove('active'));
          document.getElementById('cert-gallery').classList.add('active');
          document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
      const backBtn = document.getElementById('backToCerts');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          goToSection('certificates');
        });
      }

      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-pdf-btn')) {
          const card = e.target.closest('[data-pdf]');
          if (card?.dataset.pdf) window.open(card.dataset.pdf, '_blank');
        }
      });

      // AOS
      if (typeof AOS !== 'undefined') AOS.init({ once: true, duration: 600, offset: 50 });

      // VanillaTilt
      if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), { max: 8, speed: 400, glare: false, scale: 1.03 });
      }

      // Dark mode
      const toggle = document.getElementById('toggleDarkMode');
      const savedLight = localStorage.getItem('lightMode') === 'true';
      toggle.checked = savedLight;
      document.body.classList.toggle('light-mode', savedLight);
      toggle.addEventListener('change', e => {
        document.body.classList.toggle('light-mode', e.target.checked);
        localStorage.setItem('lightMode', e.target.checked);
      });

      // Search
      const searchInput = document.getElementById('searchProjects');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          const q = e.target.value.toLowerCase();
          document.querySelectorAll('.project-card').forEach(card => {
            card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
          });
        });
      }

      // Back to top
      const topBtn = document.getElementById('backToTop');
      if (topBtn) {
        topBtn.style.display = 'none';
        window.addEventListener('scroll', () => {
          topBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });
        topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      }
    })();

    // ============================================
    // CERTIFICATE GALLERY
    // ============================================
    function loadCertificateGallery() {
      const grid = document.getElementById('pdfGrid');
      if (!grid || grid.children.length > 0) return;
      const certs = [
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
      grid.innerHTML = certs.map(c => `
        <div class="pdf-item">
          <div class="pdf-thumbnail">📜</div>
          <div class="pdf-title">${c.title}</div>
          <a href="${c.file}" class="pdf-download" target="_blank">View PDF →</a>
        </div>
      `).join('');
    }

    // ============================================
    // FORM VALIDATION
    // ============================================
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
