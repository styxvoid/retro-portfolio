/* ═══════════════════════════════
   NAVIGATION
═══════════════════════════════ */
(function () {
  'use strict';

  const sections   = document.querySelectorAll('.section');
  const navLinks   = document.querySelectorAll('.nav-link');
  const statusPath = document.getElementById('status-path');

  function showSection(id) {
    // Hide all sections
    sections.forEach(s => {
      s.classList.remove('active');
      s.setAttribute('aria-hidden', 'true');
    });

    // Show target
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      target.removeAttribute('aria-hidden');
      // Re-trigger fade-in animations inside the section
      target.querySelectorAll('.fade-in').forEach((el, i) => {
        el.style.animation = 'none';
        el.offsetHeight; // reflow
        el.style.animation = '';
        el.style.animationDelay = (i * 0.12) + 's';
      });
    }

    // Update nav links
    navLinks.forEach(link => {
      const isActive = link.dataset.section === id;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    // Update status bar
    if (statusPath) statusPath.textContent = '/' + id;

    // Update URL hash without scroll
    history.replaceState(null, '', '#' + id);
  }

  // Nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });

  // Inline data-section buttons (e.g. "GET IN TOUCH")
  document.querySelectorAll('[data-section]').forEach(el => {
    if (!el.classList.contains('nav-link')) {
      el.addEventListener('click', e => {
        e.preventDefault();
        showSection(el.dataset.section);
      });
    }
  });

  // Handle initial hash
  const hash = window.location.hash.replace('#', '');
  const validSections = Array.from(sections).map(s => s.id);
  if (hash && validSections.includes(hash)) {
    showSection(hash);
  }

  // Keyboard nav on cards/blog items
  document.querySelectorAll('.work-card, .blog-item, .gallery-item').forEach(el => {
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

})();
