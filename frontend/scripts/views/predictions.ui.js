APISales.Views = APISales.Views || {};

APISales.Views.PredictionsUI = {
  layout() {
    return `
      <section class="card">
        <div class="row">
          <input id="pred-search" type="text" placeholder="Search customer..." />
          <select id="pred-sort">
            <option value="CustomerName">Name</option>
            <option value="LastOrderDate">LastOrderDate</option>
            <option value="NextPredictedOrder">NextPredictedOrder</option>
          </select>
          <select id="pred-dir">
            <option value="false">Asc</option>
            <option value="true">Desc</option>
          </select>
          <button id="pred-go" class="primary">Search</button>
        </div>
        <div class="help">GET /api/Customers/predictions</div>
        <div id="pred-table"></div>
        <div class="row space">
          <button id="pred-prev">Prev</button>
          <span id="pred-page"></span>
          <button id="pred-next">Next</button>
        </div>
      </section>`;
  },
  table(items){
    const rows = items.map(x => `
      <tr>
        <td>${x.customerId}</td>
        <td>${x.customerName}</td>
        <td>${x.lastOrderDate ? x.lastOrderDate.slice(0,10) : ''}</td>
        <td>${x.nextPredictedOrder ? x.nextPredictedOrder.slice(0,10) : ''}</td>
      </tr>`).join('');
    return `
      <table>
        <thead>
          <tr><th>ID</th><th>Customer</th><th>Last order</th><th>Next predicted</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
  }
};
