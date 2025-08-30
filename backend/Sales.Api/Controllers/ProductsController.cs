using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Sales.Api.Services;

namespace Sales.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _svc;
        public ProductsController(IProductService svc) => _svc = svc;

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string search = null)
        {
            var items = await _svc.GetAsync(search);
            return Ok(items);
        }
    }
}
