// games.js - Funcionalidad de modal para galería de juegos

// games.js - Funcionalidad de modal para galería de juegos

function openGameModal(gameId) {
  const modal = document.getElementById('gameModal');
  const modalImage = document.getElementById('modalImage');
  
  // Mapeo de IDs a imágenes con extensiones correctas
  const gameImages = {
    'juego1': 'img/MixIt.webp',
    'juego2': 'img/juego2.webp',
    'juego3': 'img/juego3.webp',
    'juego4': 'img/juego4.webp',
    'juego5': 'img/juego5.webp',
    'juego6': 'img/juego6.webp',
    'juego7': 'img/juego7.webp',
    'juego8': 'img/juego8.webp',
    'juego9': 'img/juego9.webp',
    'juego10': 'img/juego10.webp'
  };
  
  // Establecer la imagen
  modalImage.src = gameImages[gameId];
  
  // Mostrar modal
  modal.classList.add('active');
  document.body.classList.add('noscroll');
}

function closeGameModal() {
  const modal = document.getElementById('gameModal');
  modal.classList.remove('active');
  document.body.classList.remove('noscroll');
}

// Cerrar modal al hacer clic fuera de la imagen
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('gameModal');
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeGameModal();
      }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeGameModal();
      }
    });
  }
});