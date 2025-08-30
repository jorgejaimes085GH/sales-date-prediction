using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Sales.Api.Services;
using Sales.Api.Models;


namespace Sales.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _svc;
        public OrdersController(IOrderService svc) => _svc = svc;

        // GET /api/Orders/by-customer/{customerId}
        [HttpGet("by-customer/{customerId:int}")]
        public async Task<IActionResult> GetByCustomer(int customerId)
        {
            if (customerId <= 0) return BadRequest("customerId inválido");
            var items = await _svc.GetByCustomerAsync(customerId);
            return Ok(items);
        }

        // GET /api/Orders/{orderId}/details
        [HttpGet("{orderId:int}/details")]
        public async Task<IActionResult> GetDetails([FromRoute] int orderId)
        {
            if (orderId <= 0) return BadRequest("orderId inválido");
            var items = await _svc.GetDetailsAsync(orderId);
            return Ok(items);
        }

        // POST /api/Orders
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NewOrderDto dto)
        {
            if (dto == null || dto.CustomerId <= 0 || dto.Details == null || dto.Details.Count == 0)
                return BadRequest("Payload inválido");

            var orderId = await _svc.CreateAsync(dto);
            return CreatedAtAction(nameof(GetDetails), new { orderId }, new { orderId });
        }
    }
}
