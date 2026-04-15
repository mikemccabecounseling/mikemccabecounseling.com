/* ============================================
   MIKE McCABE COUNSELING — Site JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // --- Mobile Nav Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      toggle.classList.toggle('active');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
      });
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function(i) {
        i.classList.remove('open');
      });
      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });

  // --- Contact Form Submission (via Formspree) ---
  document.querySelectorAll('.contact-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const service = form.dataset.service || 'couples';
      
      // Basic validation
      if (!formData.get('name') || !formData.get('phone') || !formData.get('email')) {
        alert('Please fill in all required fields.');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(function(response) {
        if (response.ok) {
          window.location.href = '/thank-you/' + service + '.html';
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again or call (512) 270-9864.');
      });
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
