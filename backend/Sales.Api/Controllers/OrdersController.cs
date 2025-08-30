using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Sales.Api.Services;

namespace Sales.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _svc;
        public OrdersController(IOrderService svc) => _svc = svc;

        // GET /api/Orders/by-customer/30
        [HttpGet("by-customer/{customerId:int}")]
        public async Task<IActionResult> GetByCustomer(int customerId)
        {
            if (customerId <= 0) return BadRequest("customerId inválido");
            var items = await _svc.GetByCustomerAsync(customerId);
            return Ok(items); // 200 con lista (vacía si no hay)
        }
    }
}
