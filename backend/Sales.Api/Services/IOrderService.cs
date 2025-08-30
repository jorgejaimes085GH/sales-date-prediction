using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetByCustomerAsync(int customerId);
    }
}
