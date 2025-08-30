APISales.Views = APISales.Views || {};

APISales.Views.PredictionsUI = {
  layout(){
    return /*html*/`
      <section class="panel">
        <div class="section">
          <input id="pred-search" placeholder="Customer Name" />
          <select id="pred-sort">
            <option value="CustomerName">Name</option>
            <option value="LastOrderDate">Last Order</option>
          </select>
          <select id="pred-dir">
            <option value="false">Asc</option>
            <option value="true">Desc</option>
          </select>
          <button id="pred-go" class="btn">Search</button>
          <div class="hint">GET /api/Customers/predictions</div>
        </div>
        <div class="section">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Last Order Date</th>
                <th>Next Predicted Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="pred-table"></tbody>
          </table>
          <div class="pagination">
            <button id="pred-prev" class="btn">Prev</button>
            <span id="pred-page"></span>
            <button id="pred-next" class="btn">Next</button>
          </div>
        </div>
      </section>`;
  },

  table(items){
    const rows = items.map(x => `
      <tr>
        <td>${x.customerName}</td>
        <td>${x.lastOrderDate ? x.lastOrderDate.slice(0,10) : ''}</td>
        <td>${x.nextPredictedOrder ? x.nextPredictedOrder.slice(0,10) : ''}</td>
        <td>
          <button class="link-red act-orders"
                  data-id="${x.customerId}" data-name="${x.customerName}">
            VIEW ORDERS
          </button>
          &nbsp;&nbsp;
          <button class="link-green act-new"
                  data-id="${x.customerId}" data-name="${x.customerName}">
            NEW ORDER
          </button>
        </td>
      </tr>
    `).join('');
    return rows;
  }
};
