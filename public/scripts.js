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



  document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Si el elemento es visible (intersecting)
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Opcional: Deja de observar el elemento una vez animado si solo quieres que suceda una vez
        observer.unobserve(entry.target); 
      } 
      // Si quisieras que la animación se repitiera al salir y volver a entrar en el viewport, 
      // podrías añadir un 'else { entry.target.classList.remove("is-visible"); }'
    });
  }, {
    root: null, // Observa con respecto al viewport del documento
    rootMargin: "0px", // Ajusta el margen para activar antes o después
    threshold: 0.1 // Activa la animación cuando el 10% del elemento es visible
  });

  // Indica al observador qué elementos debe vigilar
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
});