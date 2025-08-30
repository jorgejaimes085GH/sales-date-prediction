using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public interface IOrderService
    { 
        Task<IEnumerable<OrderDto>> GetByCustomerAsync(int customerId);
        Task<IEnumerable<OrderDetailDto>> GetDetailsAsync(int orderId);   
        Task<int> CreateAsync(NewOrderDto dto);
    }
}
