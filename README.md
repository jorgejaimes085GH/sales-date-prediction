 
# Sales Date Prediction App
Prueba técnica - Sales Date Prediction

Aplicación **SPA (Single Page Application)** desarrollada en **Vanilla JavaScript (Frontend)** y **.NET Core 3.1 con SQL Server (Backend)**.  
El sistema permite predecir próximas órdenes de clientes, consultar órdenes históricas y registrar nuevas órdenes de manera ágil.  

---

# Funcionalidades principales

- **Predictions**:  
  - Listado de clientes con fecha de última orden y predicción de próxima orden.  
  - Desde esta vista se puede saltar directamente a:  
    - **Ver órdenes (Orders)** de un cliente.  
    - **Crear nueva orden (New Order)** precargando datos del cliente.

- **Orders**:  
  - Búsqueda de órdenes por `CustomerId`.  
  - Visualización de órdenes y sus detalles.

- **New Order**:  
  - Formulario completo para registrar nuevas órdenes.  
  - Carga dinámica de `Employees`, `Shippers`, `Customers` y `Products`.  
  - Control de campos obligatorios con validación individual.  
  - Guardado en base de datos vía API RESTful.  


## Tecnologías utilizadas

- **Backend**:  
  - .NET Core 3.1  
  - SQL Server + Dapper  
  - Swagger para documentación de endpoints

- **Frontend**:  
  - HTML5  
  - CSS3 (diseño responsivo con grid system de 6 columnas)  
  - Vanilla JavaScript (patrón modular con namespaces)   
---

## Requisitos previos

- [SDK .NET Core 3.1](https://dotnet.microsoft.com/en-us/download/dotnet/3.1)  
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) con la base `StoreSample`  
- Visual Studio Code o IDE similar  
- Extensión Live Server en VS Code (para ejecutar el frontend)  

---

##  configuración
El backend quedará disponible en: http://localhost:5000
Swagger en: http://localhost:5000/swagger/index.html

## Ejecutar el frontend
El index.html esta hubicado en "sales-date-prediction\frontend"
