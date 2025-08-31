using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Data;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IStoreRepository _repo;
        public CustomerService(IStoreRepository repo) => _repo = repo;

        public Task<IEnumerable<CustomerDto>> GetAllAsync(string search = null)
            => _repo.GetCustomersAsync(search);

        public Task<CustomerDto> GetByIdAsync(int custid)
            => _repo.GetCustomerByIdAsync(custid);
    }
}
