// global.js - efecto al hacer scroll
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 100;
  document.body.classList.toggle('scrolled', scrolled);
});