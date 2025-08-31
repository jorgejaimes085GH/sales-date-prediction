APISales.Views = APISales.Views || {};

APISales.Views.NewOrderUI = {
  layout(state){
    const name = state?.custName || '';
    return /*html*/`
    <section class="panel">
      <div class="panel-header">Customer ${name} - New Order</div>

      <div class="section">
        <div class="section-title">Order</div>

        <div class="form-grid">
          <div class="field HRow">
            <label>Employee*</label>
            <select id="no-emp"></select>
          </div>
          <div class="field HRow">
            <label>Shipper*</label>
            <select id="no-shipper"></select>
          </div>

          <div class="field HRow">
            <label>Costumer*</label>
            <select id="no-customer"></select>
          </div>
          
          <div class="field HRow">
            <label>Ship Name*</label>
            <input id="no-shipname" type="text" />
          </div>

          <div class="field TRow">
            <label>Ship Address*</label>
            <input id="no-shipaddress" type="text" />
          </div>
          <div class="field TRow">
            <label>Ship City*</label>
            <input id="no-shipcity" type="text" />
          </div>
          <div class="field TRow">
            <label>Ship Country*</label>
            <input id="no-shipcountry" type="text" />
          </div>

          <div class="field TRow">
            <label>Order Date*</label>
            <input id="no-orderdate" type="date" />
          </div>
          <div class="field TRow">
            <label>Required Date*</label>
            <input id="no-requireddate" type="date" />
          </div>
          <div class="field TRow">
            <label>Shipped Date*</label>
            <input id="no-shippeddate" type="date" />
          </div>

          <div class="field FRow">
            <label>Freight*</label>
            <div class="input-prefix-wrap">
              <span class="prefix">$</span>
              <input id="no-freight" type="number" step="0.01" min="0" />
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Order Details</div>
        <div class="form-grid">
          <div class="field FRow">
            <label>Product*</label>
            <select id="no-product"></select>
          </div>
          <div class="field TRow">
            <label>Unit Price*</label>
            <input id="no-unitPrice" type="number" step="0.01" min="0"/>
          </div>
          <div class="field TRow">
            <label>Quantity*</label>
            <input id="no-qty" type="number" min="1" value="1"/>
          </div>
          <div class="field TRow">
            <label>Discount*</label>
            <input id="no-discount" type="number" step="0.01" min="0" value="0"/>
          </div>
        </div>
  
        <div class="hint">POST /api/Orders</div>
      </div>

      <div class="panel-footer">
        <button id="btn-close" class="btn">Close</button>
        <button id="btn-save" class="btn primary">Save</button>
      </div>
    </section>`;
  }
};
