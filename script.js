document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
  VanillaTilt.init(
    document.querySelectorAll(".experience-card, .project-card, .certificate-card, .skill-item, .social-icon"),
    { max: 10, speed: 400, glare: true, "max-glare": 0.18, scale: 1.05 }
  );

  document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const darkModeToggle = document.getElementById('toggleDarkMode');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', e => {
      document.body.classList.toggle('dark-mode', e.target.checked);
    });
  }

  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const moreText = btn.previousElementSibling;
      if (moreText) {
        if (moreText.style.display === 'none' || moreText.style.display === '') {
          moreText.style.display = 'inline';
          btn.textContent = 'Read Less';
        } else {
          moreText.style.display = 'none';
          btn.textContent = 'Read More';
        }
      }
    });
  });
});
