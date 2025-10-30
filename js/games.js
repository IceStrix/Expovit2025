// games.js - Funcionalidad de modal para galería de juegos

// games.js - Funcionalidad de modal para galería de juegos

function openGameModal(gameId) {
  const modal = document.getElementById('gameModal');
  const modalImage = document.getElementById('modalImage');
  
  // Mapeo de IDs a imágenes con extensiones correctas
  const gameImages = {
    'juego1': 'img/MixIt.png',
    'juego2': 'img/juego2.jpeg',
    'juego3': 'img/juego3.jpeg',
    'juego4': 'img/juego4.jpeg',
    'juego5': 'img/juego5.jpeg',
    'juego6': 'img/juego6.jpg',
    'juego7': 'img/juego7.png',
    'juego8': 'img/juego8.jpg',
    'juego9': 'img/juego9.jpg',
    'juego10': 'img/juego10.jpg'
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