// Margot — Mountain Meadow Systems
// Smooth scroll + navbar shadow. Nothing else.

(function () {
  'use strict';

  // Smooth scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 64,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar shadow on scroll
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 1px 3px 0 rgb(0 0 0 / 0.08)'
        : 'none';
    });
  }
})();
