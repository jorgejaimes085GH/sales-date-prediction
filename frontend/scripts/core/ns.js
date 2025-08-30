
(function (global) {
  // ---- Namespace raíz ----
  // Si ya existe, lo reusa (no pisa nada).
  const NS = global.APISales = global.APISales || Object.create(null);

  // Sub-namespaces (si no existen, se crean)
  NS.Views = NS.Views || Object.create(null);
  NS.Components = NS.Components || Object.create(null);
  NS.Utils = NS.Utils || Object.create(null);

  // ------------------------------------------------------------------
  // Clase base para todas las pantallas: APISales.BaseScreen  (antes "View")
  // ------------------------------------------------------------------
  function BaseScreen(rootEl) {
    this.root = rootEl || document.getElementById('app');
    if (!this.root) {
      throw new Error('[APISales] No se encontró el contenedor #app');
    }
  }
  BaseScreen.prototype.mount = function () { /* opcional */ };
  BaseScreen.prototype.unmount = function () {
    if (this.root) this.root.innerHTML = '';
  };

  NS.BaseScreen = BaseScreen;

  // ------------------------------------------------------------------
  // Pequeño orquestador de pantallas: APISales.App
  // ------------------------------------------------------------------
  function App(rootEl) {
    this.root = rootEl || document.getElementById('app');
    this.current = null;
  }

  function resolveCtor(name) {
    if (!name) return null;
    // Permite 'predictions' o 'Predictions'
    return NS.Views[name] || NS.Views[name[0].toUpperCase() + name.slice(1)];
  }

  App.prototype.show = function (name) {
    const Ctor = resolveCtor(name);
    if (!Ctor) {
      throw new Error(`[APISales] View '${name}' no encontrada. Asegúrate de cargar su .js`);
    }
    if (this.current && typeof this.current.unmount === 'function') {
      this.current.unmount();
    }
    this.current = new Ctor(this.root);
    if (this.current && typeof this.current.mount === 'function') {
      this.current.mount();
    }
    return this.current;
  };

  NS.App = App;

})(window);
