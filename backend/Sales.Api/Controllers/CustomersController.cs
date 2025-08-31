using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Sales.Api.Services;

namespace Sales.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]    
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _svc;

        public CustomersController(ICustomerService svc)
        {
            _svc = svc;
        }

        // GET /api/Customers?search=abc
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string search = null)
        {
            var items = await _svc.GetAllAsync(search);
            return Ok(items);
        }

        // GET /api/Customers/{custid}
        [HttpGet("{custid:int}")]
        public async Task<IActionResult> GetById(int custid)
        {
            if (custid <= 0) return BadRequest("custid inválido");

            var item = await _svc.GetByIdAsync(custid);
            if (item == null) return NotFound();

            return Ok(item);
        }
    }
}
