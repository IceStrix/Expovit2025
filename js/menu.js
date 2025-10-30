document.addEventListener('DOMContentLoaded', () => {
  // Elementos del menú
  const btnBars = document.querySelector('.btn-bars');
  const menuResponsive = document.querySelector('.menu-responsive');
  const btnClose = document.querySelector('.btn-close');

  // Tabs del itinerario
  const tabs = document.querySelectorAll('.tab');
  const days = document.querySelectorAll('.day');

  // Seguridad: si no existen, evitamos errores
  if (tabs && tabs.length && days && days.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        days.forEach(d => d.classList.remove('active'));
        tab.classList.add('active');
        const dayId = tab.dataset.day;
        const dayEl = document.getElementById(dayId);
        if (dayEl) dayEl.classList.add('active');
      });
    });
  }

  // Manejo del menú responsive
  if (!btnBars || !menuResponsive) {
    // si faltan nodos críticos, no hacemos nada
    return;
  }

btnBars.addEventListener('click', (e) => {
  e.stopPropagation();
  const isActive = menuResponsive.classList.toggle('active');
  menuResponsive.setAttribute('aria-hidden', String(!isActive));
  document.body.classList.toggle('noscroll', isActive);

  // 🔥 Mostrar solo la X cuando está abierto
  btnBars.style.display = isActive ? 'none' : 'block';
});

if (btnClose) {
  btnClose.addEventListener('click', () => {
    menuResponsive.classList.remove('active');
    menuResponsive.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('noscroll');
    btnBars.style.display = 'block'; // vuelve a aparecer la hamburguesa
  });
}

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      menuResponsive.classList.remove('active');
      document.body.classList.remove('noscroll');
    });
  }

  // Cerrar al clickear fuera del contenido (backdrop)
  menuResponsive.addEventListener('click', (e) => {
    if (e.target === menuResponsive) {
      menuResponsive.classList.remove('active');
      document.body.classList.remove('noscroll');
    }
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuResponsive.classList.contains('active')) {
      menuResponsive.classList.remove('active');
      document.body.classList.remove('noscroll');
    }
  });
});
