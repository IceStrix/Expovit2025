// acercaDe.js - Animación de contadores para las estadísticas

document.addEventListener('DOMContentLoaded', () => {
  // Función para animar los números
  function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    const isDecimal = target % 1 !== 0;
    
    const timer = setInterval(() => {
      start += increment;
      
      if (start >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        if (isDecimal) {
          element.textContent = start.toFixed(1) + suffix;
        } else {
          element.textContent = Math.floor(start) + suffix;
        }
      }
    }, 16);
  }

  // Configuración del Intersection Observer
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statCards = entry.target.querySelectorAll('.stat-card');
        
        statCards.forEach((card, index) => {
          const numberElement = card.querySelector('.stat-number');
          const text = numberElement.textContent.trim();
          
          // Extraer número y sufijo
          let target, suffix = '';
          
          if (text.includes('+')) {
            target = parseInt(text.replace('+', ''));
            suffix = '+';
          } else {
            target = parseInt(text);
          }
          
          // Limpiar el contenido inicial
          numberElement.textContent = '0' + suffix;
          
          // Iniciar animación con delay escalonado
          setTimeout(() => {
            animateCounter(numberElement, target, 2000, suffix);
          }, index * 200);
        });
        
        // Dejar de observar después de animar
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar la sección de estadísticas
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Animación de partículas en el fondo (opcional)
  createParticles();
});

// Función para crear partículas flotantes decorativas
function createParticles() {
  const particleCount = 20;
  const body = document.body;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: fixed;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(181, 23, 255, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
      box-shadow: 0 0 10px rgba(181, 23, 255, 0.5);
    `;
    body.appendChild(particle);
  }
  
  // Añadir keyframes para las partículas si no existen
  if (!document.querySelector('#particle-animation')) {
    const style = document.createElement('style');
    style.id = 'particle-animation';
    style.textContent = `
      @keyframes float-particle {
        0% {
          transform: translateY(0) translateX(0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}