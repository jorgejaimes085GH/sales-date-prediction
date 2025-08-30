APISales.Views = APISales.Views || {};

APISales.Views.Orders = function (root, payload) {
  APISales.Views.Base.call(this, root);
  this.payload = payload || {};
};


APISales.Views.Orders.prototype = Object.create(APISales.Views.Base.prototype);
APISales.Views.Orders.prototype.constructor = APISales.Views.Orders;

APISales.Views.Orders.prototype.mount = async function () {
  const root = this.root;

  // Render UI
  root.innerHTML = APISales.Views.OrdersUI.layout(this.payload);

  // refs
  this.$input = root.querySelector("#ord-customer");
  this.$btn   = root.querySelector("#ord-go");
  this.$table = root.querySelector("#ord-table");
  this.$det   = root.querySelector("#ord-details");

  // --- si viene con payload desde Predictions ---
  if (this.payload && this.payload.customerId) {
    this.$input.value = this.payload.customerId;

    // simular click en "Load orders"
    setTimeout(async () => {
      this.$det.innerHTML = "";
      await this.loadOrders(this.payload.customerId);
    }, 0);
  }

  // --- click en "Load orders" ---
  this.$btn.onclick = async () => {
    this.$det.innerHTML = "";
    const id = Number(this.$input.value);
    if (!id) { 
      alert("Ingrese Customer ID"); 
      return; 
    }
    await this.loadOrders(id);
  };
};

APISales.Views.Orders.prototype.loadOrders = async function (custId) {
  const rows = await APISales.API.get(`/Orders/by-customer/${custId}`);
  this.$table.innerHTML = APISales.Views.OrdersUI.table(rows);

  // botones "Details"
  this.$table.querySelectorAll(".show-details").forEach(btn => {
    btn.onclick = async () => {
      const orderId = btn.dataset.order;
      const det = await APISales.API.get(`/Orders/${orderId}/details`);
      this.$det.innerHTML = APISales.Views.OrdersUI.details(det);
    };
  });
};
