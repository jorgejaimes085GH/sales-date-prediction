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
        public CustomersController(ICustomerService svc) => _svc = svc;

        [HttpGet("predictions")]
        public async Task<IActionResult> GetPredictions(
            [FromQuery] string search = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string sort = "CustomerName",
            [FromQuery] bool desc = false)
        {
            var (items, total) = await _svc.GetPredictionsAsync(search, page, pageSize, sort, desc);
            return Ok(new { items, total });
        }
    }
}