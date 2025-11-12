 // Acordeón FAQs
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      // Cerrar otros acordeones abiertos (opcional: comentar si quieres múltiples abiertos)
      // faqToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
      
      // Alternar el estado actual
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });
