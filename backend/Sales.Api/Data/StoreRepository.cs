using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Sales.Api.Models;

namespace Sales.Api.Data
{
    public class StoreRepository : IStoreRepository
    {
        private readonly string _cs;

        public StoreRepository(IConfiguration cfg)
        {
            _cs = cfg.GetConnectionString("StoreSample");             
            System.Console.WriteLine("[ConnString] Hardcoded DEV in use");
        }

        private IDbConnection Conn() => new SqlConnection(_cs);

        // -------------------- HR.Employees --------------------
        private const string SqlGetEmployees = @"
            SELECT empid AS EmpId,
                   firstname + ' ' + lastname AS FullName
            FROM HR.Employees
            ORDER BY lastname, firstname;";

        public async Task<IEnumerable<EmployeeDto>> GetEmployeesAsync()
        {
            using var db = Conn();
            return await db.QueryAsync<EmployeeDto>(SqlGetEmployees);
        }

        // -------------------- Sales.Customer / Predictions --------------------
        private const string CteCustomerStats = @"
        WITH CustomerOrders AS (
          SELECT C.custid, C.companyname AS CustomerName,
                 O.orderdate,
                 LEAD(O.orderdate) OVER (PARTITION BY C.custid ORDER BY O.orderdate) AS NextOrderDate
          FROM Sales.Customers C
          JOIN Sales.Orders O ON O.custid = C.custid
        ),
        Gaps AS (
          SELECT custid, CustomerName, orderdate,
                 DATEDIFF(day, orderdate, NextOrderDate) AS GapDays
          FROM CustomerOrders
          WHERE NextOrderDate IS NOT NULL
        ),
        Stats AS (
          SELECT custid, MIN(CustomerName) AS CustomerName,
                 AVG(CAST(GapDays AS float)) AS AvgGapDays,
                 MAX(orderdate) AS LastOrderDate
          FROM Gaps
          GROUP BY custid
        )";

        public async Task<(IEnumerable<CustomerPredictionDto> Items, int Total)>
            GetCustomerPredictionsAsync(string search, int page, int pageSize, string sort, bool desc)
        {
            var orderBy = (sort ?? "CustomerName").ToLower() switch
            {
                "customername" => "CustomerName",
                "lastorderdate" => "LastOrderDate",
                "nextpredictedorder" => "NextPredictedOrder",
                _ => "CustomerName"
            };
            var direction = desc ? "DESC" : "ASC";
            var skip = page <= 1 ? 0 : (page - 1) * pageSize;

            var sql = $@"
            {CteCustomerStats}
            SELECT 
                custid AS CustomerId, CustomerName, LastOrderDate,
                DATEADD(day, CAST(ROUND(AvgGapDays,0) AS int), LastOrderDate) AS NextPredictedOrder
            FROM Stats
            WHERE (@search IS NULL OR CustomerName LIKE '%'+@search+'%')
            ORDER BY {orderBy} {direction}
            OFFSET @skip ROWS FETCH NEXT @pageSize ROWS ONLY;

            {CteCustomerStats}
            SELECT COUNT(*)
            FROM Stats
            WHERE (@search IS NULL OR CustomerName LIKE '%'+@search+'%');";

            using var db = Conn();
            using var multi = await db.QueryMultipleAsync(sql, new { search, skip, pageSize });
            var items = await multi.ReadAsync<CustomerPredictionDto>();
            var total = await multi.ReadFirstAsync<int>();
            return (items, total);
        }

        // -------------------- Sales.Customer / Orders --------------------
        private const string SqlGetCustomerOrders = @"
            SELECT orderid   AS OrderId,
                   custid    AS CustomerId,
                   orderdate AS OrderDate
            FROM Sales.Orders
            WHERE custid = @customerId
            ORDER BY orderdate DESC;";

        public async Task<IEnumerable<OrderDto>> GetCustomerOrdersAsync(int customerId)
        {
            using var db = Conn();
            return await db.QueryAsync<OrderDto>(SqlGetCustomerOrders, new { customerId });
        }

        // -------------------- Production.Products --------------------
        private const string SqlGetProducts = @"
            SELECT p.productid AS ProductId,
                   p.productname AS ProductName,
                   p.unitprice AS UnitPrice,
                   p.discontinued AS Discontinued
            FROM Production.Products p
            WHERE (@search IS NULL OR p.productname LIKE '%'+@search+'%')
            ORDER BY p.productname;";

        public async Task<IEnumerable<ProductDto>> GetProductsAsync(string search = null)
        {
            using var db = Conn();
            return await db.QueryAsync<ProductDto>(SqlGetProducts, new { search });
        }

        // -------------------- Production.Suppliers --------------------
        private const string SqlGetSuppliers = @"
            SELECT supplierid AS SupplierId,
                   companyname AS CompanyName,
                   contactname AS ContactName,
                   phone AS Phone
            FROM Production.Suppliers
            WHERE (@search IS NULL OR companyname LIKE '%'+@search+'%')
            ORDER BY companyname;";

        public async Task<IEnumerable<SupplierDto>> GetSuppliersAsync(string search = null)
        {
            using var db = Conn();
            return await db.QueryAsync<SupplierDto>(SqlGetSuppliers, new { search });
        }

        // -------------------- Sales.Shippers --------------------
        private const string SqlGetShippers = @"
            SELECT shipperid AS ShipperId,
                   companyname AS CompanyName,
                   phone AS Phone
            FROM Sales.Shippers
            WHERE (@search IS NULL OR companyname LIKE '%'+@search+'%')
            ORDER BY companyname;";

        public async Task<IEnumerable<ShipperDto>> GetShippersAsync(string search = null)
        {
            using var db = Conn();
            return await db.QueryAsync<ShipperDto>(SqlGetShippers, new { search });
        }

        // -------------------- Sales.Customers --------------------
        private const string SqlGetCustomers = @"
            SELECT 
                custid       AS CustId,
                companyname  AS CompanyName,
                contactname  AS ContactName,
                contacttitle AS ContactTitle,
                address      AS Address,
                city         AS City,
                region       AS Region,
                postalcode   AS PostalCode,
                country      AS Country,
                phone        AS Phone,
                fax          AS Fax
            FROM Sales.Customers
            WHERE (@search IS NULL 
                   OR companyname LIKE '%' + @search + '%' 
                   OR contactname LIKE '%' + @search + '%')
            ORDER BY companyname;";

        public async Task<IEnumerable<CustomerDto>> GetCustomersAsync(string search = null)
        {
            using var db = Conn();
            return await db.QueryAsync<CustomerDto>(SqlGetCustomers, new { search });
        }

        private const string SqlGetCustomerById = @"
            SELECT 
                custid       AS CustId,
                companyname  AS CompanyName,
                contactname  AS ContactName,
                contacttitle AS ContactTitle,
                address      AS Address,
                city         AS City,
                region       AS Region,
                postalcode   AS PostalCode,
                country      AS Country,
                phone        AS Phone,
                fax          AS Fax
            FROM Sales.Customers
            WHERE custid = @custid;";

        public async Task<CustomerDto> GetCustomerByIdAsync(int custid)
        {
            using var db = Conn();
            return await db.QueryFirstOrDefaultAsync<CustomerDto>(SqlGetCustomerById, new { custid });
        }
        

        // -------------------- Production.Categories --------------------
        private const string SqlGetCategories = @"
            SELECT categoryid AS CategoryId,
                   categoryname AS CategoryName,
                   description AS Description
            FROM Production.Categories
            WHERE (@search IS NULL OR categoryname LIKE '%'+@search+'%')
            ORDER BY categoryname;";

        public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync(string search = null)
        {
            using var db = Conn();
            return await db.QueryAsync<CategoryDto>(SqlGetCategories, new { search });
        }

        // -------------------- Sales.OrderDetails --------------------
        private const string SqlGetOrderDetails = @"
            SELECT 
                od.orderid AS OrderId,
                od.productid AS ProductId,
                p.productname AS ProductName,
                od.unitprice AS UnitPrice,
                od.qty AS Quantity,
                od.discount AS Discount,
                CAST(od.unitprice * od.qty * (1 - od.discount) AS decimal(18,2)) AS LineTotal
            FROM Sales.OrderDetails od
            JOIN Production.Products p ON p.productid = od.productid
            WHERE od.orderid = @orderId
            ORDER BY p.productname;";

        public async Task<IEnumerable<OrderDetailDto>> GetOrderDetailsAsync(int orderId)
        {
            using var db = Conn();
            return await db.QueryAsync<OrderDetailDto>(SqlGetOrderDetails, new { orderId });
        }

        // -------------------- INSERTS (Orders y OrderDetails) --------------------
        private const string SqlInsertOrder = @"
          INSERT INTO Sales.Orders
            (custid, empid, orderdate, requireddate, shippeddate, shipperid, freight,
             shipname, shipaddress, shipcity, shipregion, shippostalcode, shipcountry)
          SELECT
            @CustomerId, @EmployeeId, @OrderDate, @RequiredDate, NULL, @ShipperId, @Freight,
            c.companyname, c.address, c.city, c.region, c.postalcode, c.country
          FROM Sales.Customers c
          WHERE c.custid = @CustomerId;

          SELECT CAST(SCOPE_IDENTITY() AS int);";

        private const string SqlInsertOrderDetail = @"
          INSERT INTO Sales.OrderDetails (orderid, productid, unitprice, qty, discount)
          VALUES (@OrderId, @ProductId, @UnitPrice, @qty, @Discount);";

        public async Task<int> CreateOrderAsync(NewOrderDto order)
        {
            using var db = Conn();
            db.Open();
            using var tx = db.BeginTransaction();

            try
            {
                var requiredDate = order.OrderDate.AddDays(7);

                var orderId = await db.ExecuteScalarAsync<int>(
                    SqlInsertOrder,
                    new {
                        order.CustomerId,
                        order.EmployeeId,
                        OrderDate    = order.OrderDate,
                        RequiredDate = requiredDate,
                        order.ShipperId,
                        order.Freight
                    },
                    tx
                );

                foreach (var d in order.Details)
                {
                    await db.ExecuteAsync(
                        SqlInsertOrderDetail,
                        new {
                            OrderId = orderId,
                            d.ProductId,
                            d.UnitPrice,
                            qty = d.qty, 
                            d.Discount
                        },
                        tx
                    );
                }

                tx.Commit();
                return orderId;
            }
            catch
            {
                tx.Rollback();
                throw;
            }
        }
    }
}
