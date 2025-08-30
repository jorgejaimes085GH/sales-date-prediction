APISales.API = {
  base: 'http://localhost:5000/api',
  async get(path) {
    const r = await fetch(this.base + path);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  },
  async post(path, body) {
    const r = await fetch(this.base + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }
};