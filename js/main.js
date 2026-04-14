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

  // --- Contact Form Submission ---
  document.querySelectorAll('.contact-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      const service = form.dataset.service || 'couples';
      
      // Basic validation
      if (!data.name || !data.phone || !data.email) {
        alert('Please fill in all required fields.');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Send to your backend / form handler
      // Replace this URL with your actual form endpoint (Formspree, Netlify Forms, etc.)
      fetch(form.action || '#', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function() {
        window.location.href = '/thank-you/' + service + '.html';
      })
      .catch(function() {
        // Redirect to thank you even on demo (replace with real error handling)
        window.location.href = '/thank-you/' + service + '.html';
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
