using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Sales.Api.Services;

namespace Sales.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShippersController : ControllerBase
    {
        private readonly IShipperService _svc;
        public ShippersController(IShipperService svc) => _svc = svc;

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string search = null)
        {
            var items = await _svc.GetAsync(search);
            return Ok(items);
        }
    }
}
