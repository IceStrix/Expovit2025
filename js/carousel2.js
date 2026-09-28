document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-track-saturday');
  const slides = document.querySelectorAll('.carousel-slide-saturday');
  const indicators = document.querySelectorAll('.carousel-indicator-saturday');
  const prevBtn = document.querySelector('.carousel-nav-saturday.prev');
  const nextBtn = document.querySelector('.carousel-nav-saturday.next');

  if (!carousel || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval;

  function updateCarousel(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel(currentIndex);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); clearInterval(autoplayInterval); autoplayInterval = setInterval(nextSlide, 4000); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); clearInterval(autoplayInterval); autoplayInterval = setInterval(nextSlide, 4000); });
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel(currentIndex);
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, 4000);
    });
  });

  updateCarousel(0);
  autoplayInterval = setInterval(nextSlide, 4000);
});