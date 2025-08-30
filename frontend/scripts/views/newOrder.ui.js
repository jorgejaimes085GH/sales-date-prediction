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
          <div class="field">
            <label>Employee*</label>
            <select id="no-employee"></select>
          </div>
          <div class="field">
            <label>Shipper*</label>
            <select id="no-shipper"></select>
          </div>

          <div class="field grow">
            <label>Ship Name*</label>
            <input id="no-shipname" type="text" />
          </div>

          <div class="field">
            <label>Ship Address*</label>
            <input id="no-shipaddress" type="text" />
          </div>
          <div class="field">
            <label>Ship City*</label>
            <input id="no-shipcity" type="text" />
          </div>
          <div class="field">
            <label>Ship Country*</label>
            <input id="no-shipcountry" type="text" />
          </div>

          <div class="field">
            <label>Order Date*</label>
            <input id="no-orderdate" type="date" />
          </div>
          <div class="field">
            <label>Required Date*</label>
            <input id="no-requireddate" type="date" />
          </div>
          <div class="field">
            <label>Shipped Date*</label>
            <input id="no-shippeddate" type="date" />
          </div>

          <div class="field grow">
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
          <div class="field">
            <label>Product*</label>
            <select id="no-product"></select>
          </div>
          <div class="field">
            <label>Unit Price*</label>
            <input id="no-unitprice" type="number" step="0.01" min="0"/>
          </div>
          <div class="field">
            <label>Quantity*</label>
            <input id="no-qty" type="number" min="1" value="1"/>
          </div>
          <div class="field">
            <label>Discount*</label>
            <input id="no-discount" type="number" step="0.01" min="0" value="0"/>
          </div>
          
        </div>

        <table class="items-table" id="no-items"></table>
        <div class="hint">POST /api/Orders</div>
      </div>

      <div class="panel-footer">
        <button id="no-close" class="btn text">Close</button>
        <button id="no-save" class="btn primary">Save</button>
      </div>
    </section>`;
  }
};
