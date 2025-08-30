APISales.Views = APISales.Views || {};

APISales.Views.NewOrder = function(root){
  APISales.BaseScreen.call(this, root);
  this.items = [];
  this.customerId = 1;  
};

APISales.Views.NewOrder.prototype = Object.create(APISales.BaseScreen.prototype);
APISales.Views.NewOrder.prototype.constructor = APISales.Views.NewOrder;

APISales.Views.NewOrder.prototype.mount = function(){
  const root = this.root;
  root.innerHTML = APISales.Views.NewOrderUI.layout();
  this.$items = root.querySelector('#no-items');

  root.querySelector('#no-add').onclick = () => {
    const productId = parseInt(root.querySelector('#no-prod').value,10);
    const unitPrice = parseFloat(root.querySelector('#no-price').value);
    const qty       = parseInt(root.querySelector('#no-qty').value,10);
    const discount  = parseFloat(root.querySelector('#no-disc').value||0);
    if (!productId || !qty) { alert('Complete product y quantity'); return; }
    this.items.push({ productId, unitPrice, qty, discount });
    this.renderItems();
  };

  root.addEventListener('click', e => {
    const btn = e.target.closest('button.del');
    if (btn) { this.items.splice(parseInt(btn.dataset.i,10), 1); this.renderItems(); }
  });

  root.querySelector('#no-save').onclick  = () => this.save();
  root.querySelector('#no-close').onclick = () => { this.items = []; this.renderItems(); alert('Closed'); };
};

APISales.Views.NewOrder.prototype.renderItems = function(){
  this.$items.innerHTML = APISales.Views.NewOrderUI.itemsTable(this.items);
};

APISales.Views.NewOrder.prototype.save = async function(){
  const r = this.root;
  const dto = {
    customerId: this.customerId,
    employeeId: parseInt(r.querySelector('#no-emp').value,10),
    shipperId:  parseInt(r.querySelector('#no-shipper').value,10),
    orderDate:  r.querySelector('#no-orderdate').value || null,
    freight:    parseFloat(r.querySelector('#no-freight').value||0),
    details:    this.items.map(x=>({ productId:x.productId, unitPrice:x.unitPrice, qty:x.qty, discount:x.discount }))
  };
  if(!dto.customerId || !dto.employeeId || !dto.shipperId || !dto.orderDate || !dto.details.length){
    alert('Complete los campos obligatorios'); return;
  }
  const res = await APISales.API.post('/Orders', dto);
  alert('Created orderId: ' + (res.orderId ?? JSON.stringify(res)));
  this.items = []; this.renderItems();
};
