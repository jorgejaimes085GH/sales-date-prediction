APISales.Views = APISales.Views || {};

APISales.Views.NewOrder = function (root, payload) {  
  APISales.Views.Base.call(this, root);

  this.payload = payload || {};
  this.state = {
    custId: this.payload.customerId || null,
    custName: this.payload.customerName || ""
  };

  this.items = [];
  this.customerId = this.state.custId;   // <-- correcto
};
 
APISales.Views.NewOrder.prototype = Object.create(APISales.Views.Base.prototype);
APISales.Views.NewOrder.prototype.constructor = APISales.Views.NewOrder;

APISales.Views.NewOrder.prototype.mount = async function() {
  const root = this.root;
  root.innerHTML = APISales.Views.NewOrderUI.layout({ custName: this.state.custName });
    
  // referencias
  const $btnclose = root.querySelector('#btn-close');
  const $btnsave = root.querySelector('#btn-save');

  const $emp = root.querySelector('#no-emp');
  const $shipper = root.querySelector('#no-shipper');
  const $product = root.querySelector('#no-product');
  const $unitPrice = root.querySelector('#no-unitPrice');
  const $discount = root.querySelector('#no-discount');
 
  // --- Llenar selects desde API ---
  await APISales.Utils.loadEmployees($emp);
  await APISales.Utils.loadShippers($shipper);
  await APISales.Utils.loadProducts($product);
 
  // Prefil de fechas
  const $ = sel => this.root.querySelector(sel);
  const today = new Date().toISOString().slice(0, 10);  // YYYY-MM-DD
  const orderDateEl = $('#no-orderdate');
  const requiredDateEl = $('#no-requireddate'); 
  if (orderDateEl) orderDateEl.value = today;
  if (requiredDateEl) requiredDateEl.value = today;

  //campos llenados desde predictions
  if (this.state.custName) $('#no-shipname').value = this.state.custName;
  
  // -- Llenado de otros campos al seleccionar producto
  $product.onchange = () => {
    const id = parseInt($product.value, 10);
    const prod = APISales.Cache.products.find(p => p.productId === id);

    if (prod) {
      // siempre llenamos el precio
      $unitPrice.value = prod.unitPrice ?? 0;

      if (prod.discontinued) {
        // habilitamos descuento
        $discount.disabled = false;
        $discount.value = 0; // el usuario decide qué poner
      } else {
        // deshabilitamos y forzamos a 0
        $discount.value = 0;
        $discount.disabled = true;
      }
    } else {
      // resetear si no hay producto
      $unitPrice.value = '';
      $discount.value = 0;
      $discount.disabled = true;
    }
  };


  //acciones
  if ($btnclose) $btnclose.onclick = () => this.close();
  if ($btnsave) $btnsave.onclick = () => this.save();

};

APISales.Views.NewOrder.prototype.renderItems = function () {
  this.$items.innerHTML = APISales.Views.NewOrderUI.itemsTable(this.items);
};

APISales.Views.NewOrder.prototype.close = async function () {
  const r = this.root;
  
};

APISales.Views.NewOrder.prototype.save = async function () {
  const r = this.root;
  
  const dto = {
    CustomerId: this.customerId,
    EmployeeId: parseInt(r.querySelector('#no-emp').value, 10),   
    OrderDate: r.querySelector('#no-orderdate').value || new Date().toISOString(),
    Requireddate: r.querySelector('#no-orderdate').value || new Date().toISOString(),
    Shippeddate: r.querySelector('#no-orderdate').value || new Date().toISOString(),
    ShipperId: parseInt(r.querySelector('#no-shipper').value, 10),
    Freight: parseFloat(r.querySelector('#no-freight').value || 0),
    Shipname:  r.querySelector('#no-shipname')?.value,
    Shipaddress: r.querySelector('#no-shipaddress')?.value,
    Shipcity: r.querySelector('#no-shipcity')?.value,
    ShipCountry: r.querySelector('#no-shipcountry')?.value,
    //Los dos campos no pedidos en el form guia (no los puse para cumplir con lo pedido en el PDF)
    ShipRegion:  "",
    ShipPostalCode: "",

    // Aquí va como lista aunque solo haya 1 item
    Details: [{
      ProductId: parseInt(r.querySelector('#no-product').value, 10),
      UnitPrice: parseFloat(r.querySelector('#no-unitPrice').value || 0),
      Qty: parseInt(r.querySelector('#no-qty').value || 0),
      Discount: parseFloat(r.querySelector('#no-discount').value || 0)
    }]
  };

  //validaciones  
  if (!dto.CustomerId || !dto.EmployeeId || !dto.OrderDate ||  !dto.Requireddate || 
      !dto.Shippeddate || !dto.ShipperId || !dto.Freight || 
      !dto.Shipname || !dto.Shipaddress  || !dto.Shipcity || !dto.ShipCountry ||
      !dto.Details[0].ProductId || !dto.Details[0].UnitPrice  || !dto.Details[0].Qty || !dto.Details[0].Discount) {
    alert('Complete los campos obligatorios');
    return;
  }
  
  console.log("DTO enviado a API:", dto);

  try {
    const res = await APISales.API.post('/Orders', dto);
    alert('Created orderId: ' + (res.orderId ?? JSON.stringify(res)));
  } catch (err) {
    console.error("Error guardando orden:", err);
    alert("No se pudo guardar la orden. Revisa consola.");
  }

};
