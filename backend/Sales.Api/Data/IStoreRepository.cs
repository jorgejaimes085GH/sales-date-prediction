using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api;
using Sales.Api.Models;

namespace Sales.Api.Data
{
    public interface IStoreRepository
    {
        Task<IEnumerable<EmployeeDto>> GetEmployeesAsync();

        Task<(IEnumerable<CustomerPredictionDto> Items, int Total)>
        GetCustomerPredictionsAsync(string search, int page, int pageSize, string sort, bool desc);

        Task<IEnumerable<OrderDto>> GetCustomerOrdersAsync(int customerId);

        Task<IEnumerable<ProductDto>> GetProductsAsync(string search = null);
        
        Task<IEnumerable<SupplierDto>> GetSuppliersAsync(string search = null);

        Task<IEnumerable<ShipperDto>> GetShippersAsync(string search = null);

        Task<IEnumerable<CategoryDto>> GetCategoriesAsync(string search = null);

        Task<IEnumerable<OrderDetailDto>> GetOrderDetailsAsync(int orderId);
 
        Task<int> CreateOrderAsync(NewOrderDto dto);

        Task<IEnumerable<CustomerDto>> GetCustomersAsync(string search = null);
        Task<CustomerDto> GetCustomerByIdAsync(int custid); 
    }
}