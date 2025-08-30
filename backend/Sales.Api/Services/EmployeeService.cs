using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Data;

namespace Sales.Api.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IStoreRepository _repo;
        public EmployeeService(IStoreRepository repo) => _repo = repo;

        public Task<IEnumerable<EmployeeDto>> GetEmployeesAsync()
            => _repo.GetEmployeesAsync();
    }
}