(function (NS) {
  // Namespace principal
  NS.Views = NS.Views || {};

  // ------ Clase base para todas las vistas ------
  function Base(root, payload) {
    this.root = root || document.getElementById('app');
    this.payload = payload || {}; // cada vista puede recibir datos (ej: customerId)
  }
  Base.prototype.mount = function () {};
  Base.prototype.unmount = function () {
    if (this.root) this.root.innerHTML = '';
  };

  // Disponible como APISales.Views.Base
  NS.Views.Base = Base;

  // ------ Gestor de vistas ------
  function App(root) {
    this.root = root || document.getElementById('app');
    this.current = null;
  }

  /**
   * Cambia a una vista
   * @param {string} key - Nombre lógico de la vista ('predictions','orders','neworder')
   * @param {object} payload - Datos opcionales que se pasan a la vista
   */
  App.prototype.show = function (key, payload) {
    // desmontar vista actual
    if (this.current && this.current.unmount) this.current.unmount();

    // mapping de keys a constructores
    var map = { predictions: 'Predictions', orders: 'Orders', neworder: 'NewOrder' };
    var Ctor = NS.Views[map[key]];

    if (!Ctor) {
      console.error("No existe la vista:", key);
      return;
    }

    // instanciar y montar
    this.current = new Ctor(this.root, payload);
    if (this.current.mount) this.current.mount();

    if (typeof window.setActive === "function") {
      window.setActive(key);
    }
    
  };

  // Disponible como APISales.App
  NS.App = App;

})(window.APISales = window.APISales || {});
