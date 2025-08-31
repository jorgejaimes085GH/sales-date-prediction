APISales.Views = APISales.Views || {};
 
APISales.Views.OrdersUI = {
  layout(){
    return /*html*/`
    <section class="panel">
      <section class="card">
        <div class="row">
          <input id="ord-customer" type="number" min="1" placeholder="Customer ID" />
          <button id="ord-go" class="btn">Load orders</button>
        </div>
         
      </section>
      <section class="cardtable">
        <div id="ord-table"></div>
        <div id="ord-details"></div> <!-- 👈 ahora existe siempre -->
      </section>
    </section>`;
  },

  table(items){
    const rows = items.map(x => `
      <tr>
        <td>${x.orderId}</td>
        <td>${x.customerId}</td>
        <td>${x.orderDate ? x.orderDate.slice(0,10) : ''}</td>
        <td><button data-order="${x.orderId}" class="show-details">Details</button></td>
      </tr>`).join('');

    return /*html*/`
      <table>
        <thead>
          <tr><th>Order</th><th>Customer</th><th>Date</th><th></th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
  },

  details(items){
    const rows = items.map(x => `
      <tr>
        <td>${x.productId}</td>
        <td>${x.productName}</td>
        <td>${x.unitPrice}</td>
        <td>${x.qty}</td>
        <td>${x.discount}</td>
        <td>${x.lineTotal}</td>
      </tr>`).join('');

    return /*html*/`
      <h4>Order details</h4>
      <table>
        <thead>
          <tr><th>Product</th><th>Name</th><th>UnitPrice</th><th>Qty</th><th>Disc.</th><th>Total</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
  }
};
