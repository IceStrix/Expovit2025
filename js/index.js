document.addEventListener('DOMContentLoaded', () => {
  // Crear partículas flotantes de fondo (estrellas)
  createParticles();
  
  // Animación de entrada para las cards de eventos
  animateEventCards();
});

// Función para crear partículas flotantes decorativas (estrellas)
function createParticles() {
  const particleCount = 30; // Más partículas para el index
  const body = document.body;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const endX = startX + (Math.random() * 200 - 100);
    
    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: rgba(181, 23, 255, ${Math.random() * 0.6 + 0.3});
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      left: ${startX}vw;
      top: ${startY}vh;
      box-shadow: 0 0 ${size * 3}px rgba(181, 23, 255, 0.8),
                  0 0 ${size * 5}px rgba(255, 0, 255, 0.4);
      animation: float-particle-${i} ${duration}s linear infinite;
      animation-delay: ${delay}s;
    `;
    
    body.appendChild(particle);
    
    // Crear keyframe único para cada partícula
    const keyframes = `
      @keyframes float-particle-${i} {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translate(${endX - startX}px, -100vh) scale(0);
          opacity: 0;
        }
      }
    `;
    
    // Agregar keyframe al documento
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
  }
}

// Animación de entrada para las cards de eventos
function animateEventCards() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.event');
        
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            
            // Trigger animation
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          }, index * 50);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar las secciones de eventos
  const eventGrids = document.querySelectorAll('.event-grid');
  eventGrids.forEach(grid => observer.observe(grid));
}

// Efecto de parallax suave en el hero banner
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBanner = document.querySelector('.hero--banner');
  const mainImage = document.querySelector('.main-image');
  
  if (heroBanner && scrolled < 800) {
    heroBanner.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroBanner.style.opacity = 1 - (scrolled / 800);
  }
  
  if (mainImage && scrolled < 800) {
    mainImage.style.transform = `translateY(${scrolled * 0.2}px) scale(${1 - scrolled / 4000})`;
  }
});

// Animación de las tabs del itinerario con efecto de brillo
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    // Remover efecto de todas las tabs
    tabs.forEach(t => {
      t.classList.remove('tab-clicked');
    });
    
    // Agregar efecto a la tab clickeada
    this.classList.add('tab-clicked');
    
    // Crear efecto de onda
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Agregar efecto de hover mejorado a los botones
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('mouseenter', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      left: ${x}px;
      top: ${y}px;
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Agregar keyframes para el efecto ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-animation {
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
  
  .tab-clicked {
    animation: tab-pulse 0.3s ease-out;
  }
  
  @keyframes tab-pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .ripple-effect {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    animation: ripple-spread 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-spread {
    to {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);