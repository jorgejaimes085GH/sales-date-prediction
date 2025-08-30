using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sales.Api.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeDto>> GetEmployeesAsync();
    }
}
