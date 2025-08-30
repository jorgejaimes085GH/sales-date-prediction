using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Sales.Api.Services;

namespace Sales.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierService _svc;
        public SuppliersController(ISupplierService svc) => _svc = svc;

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string search = null)
        {
            var items = await _svc.GetSuppliersAsync(search);
            return Ok(items);
        }
    }
}

