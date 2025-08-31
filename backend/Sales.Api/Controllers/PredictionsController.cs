using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Sales.Api.Services;

namespace Sales.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PredictionsController : ControllerBase
    {
        private readonly IPredictionService _svc;

        public PredictionsController(IPredictionService svc)
        {
            _svc = svc;
        }

        // GET /api/Predictions
        [HttpGet]
        public async Task<IActionResult> Get(
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
