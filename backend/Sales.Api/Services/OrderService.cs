using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Data;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public class OrderService : IOrderService
    {
        private readonly IStoreRepository _repo;

        public OrderService(IStoreRepository repo) => _repo = repo;

        public Task<IEnumerable<OrderDto>> GetByCustomerAsync(int customerId)
            => _repo.GetCustomerOrdersAsync(customerId);

        public Task<IEnumerable<OrderDetailDto>> GetDetailsAsync(int orderId)    
            => _repo.GetOrderDetailsAsync(orderId);

        public Task<int> CreateAsync(NewOrderDto dto) 
        => _repo.CreateOrderAsync(dto);
    }
}
