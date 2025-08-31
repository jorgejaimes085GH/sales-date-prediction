APISales.Utils = APISales.Utils || {};
APISales.Cache = APISales.Cache || {};

// Cargar Employees
APISales.Utils.loadEmployees = async function(selectEl) {
  try {
    const data = await APISales.API.get('/Employees');
    console.log("Employees API:", data);

    selectEl.innerHTML = data.map(e => {
      const name = e.fullName || "N/A";
      return `<option value="${e.empId}">${name}</option>`;
    }).join('');
  } catch (err) {
    console.error("Error cargando empleados:", err);
    selectEl.innerHTML = `<option value="">Error loading employees</option>`;
  }
};

// Cargar Shippers
APISales.Utils.loadShippers = async function(selectEl) {
  try {
    const data = await APISales.API.get('/Shippers');
    console.log("Shippers API:", data);

    selectEl.innerHTML = data.map(s => {
      const name = s.companyName || "N/A";
      return `<option value="${s.shipperId}">${name}</option>`;
    }).join('');
  } catch (err) {
    console.error("Error cargando shippers:", err);
    selectEl.innerHTML = `<option value="">Error loading shippers</option>`;
  }
};

// Cargar Products
APISales.Utils.loadProducts = async function(selectEl) {
  try {
    const data = await APISales.API.get('/Products');
     APISales.Cache.products = data; 

    console.log("Products API:", data);

    selectEl.innerHTML = data.map(p => {
      const price = (p.unitPrice !== null && p.unitPrice !== undefined)
        ? Number(p.unitPrice).toFixed(2)
        : "0.00";

      const dscto = (p.discontinued !== null && p.discontinued !== undefined)
        ? (p.discontinued ? "T" : "F")
        : "F";
        
      return `<option value="${p.productId}">${p.productName}    |    $${price}    |    dct.${dscto}</option>`;      
    }).join('');
  } catch (err) {
    console.error("Error cargando productos:", err);
    selectEl.innerHTML = `<option value="">Error loading products</option>`;
  }
};

// Cargar Customers
APISales.Utils.loadCustomers = async function(selectEl) {
  try {
    const data = await APISales.API.get('/Customers');
    console.log("Customers API:", data);

    selectEl.innerHTML = data.map(e => {
      const name = e.fullName || "N/A";
      return `<option value="${e.empId}">${name}</option>`;
    }).join('');
  } catch (err) {
    console.error("Error cargando empleados:", err);
    selectEl.innerHTML = `<option value="">Error loading employees</option>`;
  }
};
