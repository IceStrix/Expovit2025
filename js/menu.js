document.addEventListener('DOMContentLoaded', () => {
  // Elementos del menú
  const btnBars = document.querySelector('.btn-bars');
  const menuResponsive = document.querySelector('.menu-responsive');
  const btnClose = document.querySelector('.btn-close');

  // Tabs del itinerario
  const tabs = document.querySelectorAll('.tab');
  const days = document.querySelectorAll('.day');

  // Control de tabs (solo si existen)
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
    return;
  }

  // Abrir menú
  btnBars.addEventListener('click', (e) => {
    e.stopPropagation();
    menuResponsive.classList.add('active');
    menuResponsive.setAttribute('aria-hidden', 'false');
    document.body.classList.add('noscroll');
    btnBars.style.display = 'none'; // Ocultar hamburguesa
  });

  // Cerrar menú
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      menuResponsive.classList.remove('active');
      menuResponsive.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('noscroll');
      btnBars.style.display = 'block'; // Mostrar hamburguesa
    });
  }

  // Cerrar al clickear fuera del contenido (backdrop)
  menuResponsive.addEventListener('click', (e) => {
    if (e.target === menuResponsive) {
      menuResponsive.classList.remove('active');
      menuResponsive.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('noscroll');
      btnBars.style.display = 'block'; // Mostrar hamburguesa
    }
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuResponsive.classList.contains('active')) {
      menuResponsive.classList.remove('active');
      menuResponsive.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('noscroll');
      btnBars.style.display = 'block'; // Mostrar hamburguesa
    }
  });

  // Cerrar menú al hacer click en un enlace
  const menuLinks = menuResponsive.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuResponsive.classList.remove('active');
      menuResponsive.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('noscroll');
      btnBars.style.display = 'block'; // Mostrar hamburguesa
    });
  });
});