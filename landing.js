// Optionally add a little animation or interactivity for the landing page
// For now, just a cozy fade-in effect

document.addEventListener('DOMContentLoaded', function () {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = 'opacity 1.2s';
    document.body.style.opacity = 1;
  }, 100);
});
