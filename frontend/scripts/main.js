window.APISales = window.APISales || { Views: {} };

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app'); // contenedor principal
 
  const views = {
    predictions: () => new APISales.Views.Predictions(root).mount(),
    orders:      () => new APISales.Views.Orders(root).mount(),
    neworder:    () => new APISales.Views.NewOrder(root).mount(),
  };

   
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const v = btn.dataset.view;      
      views[v]?.();                   
      setActive(btn);                   
    });
  });

   
  views.predictions();

  function setActive(btn) {
    document.querySelectorAll('[data-view]')
      .forEach(b => b.classList.toggle('active', b === btn));
  }
});