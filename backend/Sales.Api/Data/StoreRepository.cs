 using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Sales.Api;             

namespace Sales.Api.Data
{
    public class StoreRepository : IStoreRepository
    {
        private readonly string _cs;

        public StoreRepository(IConfiguration cfg)
        {
            _cs = @"Server=DESKTOP-RFS0G9N\SQLEXPRESS;Database=StoreSample;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true";
            Console.WriteLine("[ConnString] Hardcoded DEV in use");
        }

        private IDbConnection Conn() => new SqlConnection(_cs);

        // --------- Employees ----------
        public async Task<IEnumerable<EmployeeDto>> GetEmployeesAsync()
        {
            const string sql = @"
                SELECT 
                    empid AS EmpId,
                    firstname + ' ' + lastname AS FullName
                FROM HR.Employees
                ORDER BY lastname, firstname;";
            using var db = Conn();
            return await db.QueryAsync<EmployeeDto>(sql);
        }

        // --------- Customer Predictions  ----------
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


            var cte = @"
            WITH CustomerOrders AS (
              SELECT C.custid,
                     C.companyname AS CustomerName,
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
              SELECT custid,
                     MIN(CustomerName) AS CustomerName,
                     AVG(CAST(GapDays AS float)) AS AvgGapDays,
                     MAX(orderdate) AS LastOrderDate
              FROM Gaps
              GROUP BY custid
            )";

            var sql = $@"
            {cte}
            SELECT 
              custid AS CustomerId,
              CustomerName,
              LastOrderDate,
              DATEADD(day, CAST(ROUND(AvgGapDays,0) AS int), LastOrderDate) AS NextPredictedOrder
            FROM Stats
            WHERE (@search IS NULL OR CustomerName LIKE '%'+@search+'%')
            ORDER BY {orderBy} {direction}
            OFFSET @skip ROWS FETCH NEXT @pageSize ROWS ONLY;

            {cte}
            SELECT COUNT(*)
            FROM Stats
            WHERE (@search IS NULL OR CustomerName LIKE '%'+@search+'%');";

            using var db = Conn();
            using var multi = await db.QueryMultipleAsync(sql, new { search, skip, pageSize });
            var items = await multi.ReadAsync<CustomerPredictionDto>();
            var total = await multi.ReadFirstAsync<int>();
            return (items, total);
        }

        // --------- Customer Order  ----------
        public async Task<IEnumerable<OrderDto>> GetCustomerOrdersAsync(int customerId)
        {
            const string sql = @"
                SELECT 
                    orderid   AS OrderId,
                    custid    AS CustomerId,
                    orderdate AS OrderDate
                FROM Sales.Orders
                WHERE custid = @customerId
                ORDER BY orderdate DESC;";

            using var db = Conn();
            return await db.QueryAsync<OrderDto>(sql, new { customerId });
        }
        
        
    }
}
