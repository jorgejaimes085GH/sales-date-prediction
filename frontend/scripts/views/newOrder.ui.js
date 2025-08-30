APISales.Views = APISales.Views || {};

APISales.Views.NewOrderUI = {
  layout(){
    return `
    <section class="card lg">
      <div class="dialog">
        <div class="dialog-title">
          <span id="no-title">Customer - New Order</span>
        </div>
        <div class="dialog-body">
          <h3>Order</h3>
          <div class="grid-2">
            <label>Employee*<input id="no-emp" type="number" min="1"/></label>
            <label>Shipper* <input id="no-shipper" type="number" min="1"/></label>
          </div>
          <label>Ship Name*<input id="no-shipname" type="text"/></label>
          <div class="grid-3">
            <label>Ship Address* <input id="no-shipaddr" type="text"/></label>
            <label>Ship City*     <input id="no-shipcity" type="text"/></label>
            <label>Ship Country*  <input id="no-shipcountry" type="text"/></label>
          </div>
          <div class="grid-3">
            <label>Order Date*    <input id="no-orderdate" type="date"/></label>
            <label>Required Date* <input id="no-requireddate" type="date"/></label>
            <label>Shipped Date*  <input id="no-shippeddate" type="date"/></label>
          </div>
          <label>Freight*<input id="no-freight" type="number" step="0.01" min="0"/></label>
          <hr/>
          <h3>Order Details</h3>
          <div class="grid-4">
            <label>Product*    <input id="no-prod" type="number" min="1"/></label>
            <label>Unit Price* <input id="no-price" type="number" step="0.01" min="0"/></label>
            <label>Quantity*   <input id="no-qty" type="number" min="1" value="1"/></label>
            <label>Discount*   <input id="no-disc" type="number" step="0.01" min="0" max="1" value="0"/></label>
          </div>
          <div class="row right"><button id="no-add" type="button">Add item</button></div>
          <div id="no-items"></div>
        </div>
        <div class="dialog-actions">
          <button id="no-close" type="button">Close</button>
          <button id="no-save"  class="primary" type="button">Save</button>
        </div>
      </div>
    </section>`;
  },
  itemsTable(items){
    const rows = items.map((x,i)=>`
      <tr>
        <td>${x.productId}</td><td>${x.unitPrice}</td><td>${x.qty}</td><td>${x.discount}</td>
        <td><button data-i="${i}" class="del">✕</button></td>
      </tr>`).join('');
    return `
      <table>
        <thead><tr><th>Product</th><th>UnitPrice</th><th>Qty</th><th>Disc.</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }
};
