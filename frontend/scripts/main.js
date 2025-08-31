window.APISales = window.APISales || { Views: {} };
let App; // global

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app'); // contenedor principal
  App = new APISales.App(root);               // ahora sí global

  const views = {
    predictions: () => App.show('predictions'),
    orders:      () => App.show('orders'),
    NewOrder:    () => App.show('NewOrder'),
  };

  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const v = btn.dataset.view;      
      views[v]?.();                   
      setActive(btn);                   
    });
  });

  // Cargar primero Predictions
  views.predictions();

  // Exponer setActive globalmente
  window.setActive = function(btnOrKey){
    if (typeof btnOrKey === "string") {
      // buscar botón con ese data-view
      const btn = document.querySelector(`[data-view="${btnOrKey}"]`);
      if (btn) {
        document.querySelectorAll('[data-view]')
          .forEach(b => b.classList.toggle('active', b === btn));
      }
    } else {
      // si pasan directamente el botón
      document.querySelectorAll('[data-view]')
        .forEach(b => b.classList.toggle('active', b === btnOrKey));
    }
  };

  
});
