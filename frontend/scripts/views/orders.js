APISales.Views = APISales.Views || {};

APISales.Views.Orders = function(root){
  APISales.BaseScreen.call(this, root);
};

APISales.Views.Orders.prototype = Object.create(APISales.BaseScreen.prototype);
APISales.Views.Orders.prototype.constructor = APISales.Views.Orders;

APISales.Views.Orders.prototype.mount = function(){
  const root = this.root;
  root.innerHTML = APISales.Views.OrdersUI.layout();

  const btn   = root.querySelector('#ord-go');
  const input = root.querySelector('#ord-customer');

  btn.onclick = async () => {
    const id = parseInt(input.value, 10);
    if (!id) { alert('Ingrese Customer ID'); return; }

    const items    = await APISales.API.get(`/Orders/by-customer/${id}`);
    const tableDiv = root.querySelector('#ord-table');
    tableDiv.innerHTML = APISales.Views.OrdersUI.table(items);

    tableDiv.querySelectorAll('.show-details').forEach(b => {
      b.onclick = async () => {
        const orderId   = b.getAttribute('data-order');
        const details   = await APISales.API.get(`/Orders/${orderId}/details`);
        const detailsDiv= root.querySelector('#ord-details');
        detailsDiv.innerHTML = APISales.Views.OrdersUI.details(details);
      };
    });
  };
};
