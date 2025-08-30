APISales.Views = APISales.Views || {};

APISales.Views.Predictions = function(root){
  APISales.BaseScreen.call(this, root);
  this.state = { page: 1, pageSize: 10, search: '', sort: 'CustomerName', desc: false, total: 0 };
};

APISales.Views.Predictions.prototype = Object.create(APISales.BaseScreen.prototype);
APISales.Views.Predictions.prototype.constructor = APISales.Views.Predictions;

APISales.Views.Predictions.prototype.mount = function(){
  const root = this.root;
  root.innerHTML = APISales.Views.PredictionsUI.layout();

  this.$search  = root.querySelector('#pred-search');
  this.$sort    = root.querySelector('#pred-sort');
  this.$dir     = root.querySelector('#pred-dir');
  this.$go      = root.querySelector('#pred-go');
  this.$table   = root.querySelector('#pred-table');
  this.$prev    = root.querySelector('#pred-prev');
  this.$next    = root.querySelector('#pred-next');
  this.$page    = root.querySelector('#pred-page');

  this.$go.onclick   = () => { this.state.search = this.$search.value.trim(); this.state.page = 1; this.load(); };
  this.$sort.onchange= () => { this.state.sort   = this.$sort.value;       this.state.page = 1; this.load(); };
  this.$dir.onchange = () => { this.state.desc   = this.$dir.value === 'true'; this.state.page = 1; this.load(); };
  this.$prev.onclick = () => { if (this.state.page > 1) { this.state.page--; this.load(); } };
  this.$next.onclick = () => { const max = Math.ceil(this.state.total/this.state.pageSize)||1;
                               if (this.state.page < max) { this.state.page++; this.load(); } };

  this.$search.value = this.state.search;
  this.$sort.value   = this.state.sort;
  this.$dir.value    = String(this.state.desc);
  this.load();
};

APISales.Views.Predictions.prototype.load = async function(){
  const s = this.state;
  const q = new URLSearchParams({
    search: s.search || '',
    page: String(s.page),
    pageSize: String(s.pageSize),
    sort: s.sort,
    desc: String(s.desc)
  });
  const data  = await APISales.API.get(`/Customers/predictions?${q.toString()}`);
  const items = data.items ?? data.Items ?? data;
  this.state.total = data.total ?? data.Total ?? items.length;

  this.$table.innerHTML = APISales.Views.PredictionsUI.table(items);
  const max = Math.ceil((this.state.total||0)/this.state.pageSize)||1;
  this.$page.textContent = `Page ${this.state.page} / ${max}`;
};
