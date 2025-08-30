using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Sales.Api.Services;

namespace Sales.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _svc;
        public EmployeesController(IEmployeeService svc) => _svc = svc;

        [HttpGet]
        public async Task<IActionResult> Get()
            => Ok(await _svc.GetEmployeesAsync());
    }
}
