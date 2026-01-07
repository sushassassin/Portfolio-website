document.addEventListener("DOMContentLoaded", () => {
  // Error-handled libs
  try { AOS.init(); } catch (e) { console.warn('AOS failed'); }
  try {
    VanillaTilt.init(
      document.querySelectorAll(".experience-card, .project-card, .certificate-card, .skill-item, .social-icon"),
      window.innerWidth > 768 ? 
        { max: 10, speed: 400, glare: true, "max-glare": 0.18, scale: 1.05 } :
        { max: 5, glare: false, scale: 1.02 }
    );
  } catch (e) { console.warn('Tilt failed'); }

  // Smooth scrolling (existing)
  document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  //back-to-top
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

  // Dark mode with localStorage
  const darkModeToggle = document.getElementById('toggleDarkMode');
  if (darkModeToggle) {
    const isDark = localStorage.getItem('darkMode') === 'true';
    darkModeToggle.checked = isDark;
    document.body.classList.toggle('dark-mode', isDark);
    
    darkModeToggle.addEventListener('change', e => {
      document.body.classList.toggle('dark-mode', e.target.checked);
      localStorage.setItem('darkMode', e.target.checked);
    });
  }

  // Search functionality
  const searchInput = document.getElementById('searchProjects');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.experience-card, .project-card, .certificate-card').forEach(card => {
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

  // Remove unused read-more code
});
