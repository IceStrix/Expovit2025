document.addEventListener('DOMContentLoaded', () => {

  createParticles();
  

  animateEventCards();
});

function createParticles() {
  const particleCount = 50; 
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
    
  
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
  }
}


function animateEventCards() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.event-card');
        
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            
           
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


  const eventsGrid = document.querySelector('.events-grid');
  if (eventsGrid) {
    observer.observe(eventsGrid);
  }
}


window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const header = document.querySelector('.virtual-header');
  
  if (header && scrolled < 500) {
    header.style.transform = `translateY(${scrolled * 0.3}px)`;
    header.style.opacity = 1 - (scrolled / 500);
  }
});
