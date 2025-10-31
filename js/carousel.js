document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');

  if (!carousel || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval;

  // Función para actualizar el carrusel
  function updateCarousel(index) {
    // Remover active de todos
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Agregar active al actual
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    // Mover el track
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  // Función para ir al siguiente slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel(currentIndex);
  }

  // Función para ir al slide anterior
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel(currentIndex);
  }

  // Función para ir a un slide específico
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel(currentIndex);
    resetAutoplay();
  }

  // Autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Event listeners para botones
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  // Event listeners para indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Pausar autoplay al pasar el mouse
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Soporte para swipe en móviles
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - siguiente
        nextSlide();
      } else {
        // Swipe right - anterior
        prevSlide();
      }
      resetAutoplay();
    }
  }

  // Soporte para teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    }
  });

  // Inicializar
  updateCarousel(0);
  startAutoplay();
});