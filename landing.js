document.addEventListener('DOMContentLoaded', function () {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = 'opacity 1.2s';
    document.body.style.opacity = 1;
  }, 100);
});
