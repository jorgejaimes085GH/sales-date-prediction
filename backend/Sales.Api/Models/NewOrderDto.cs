using System;
using System.Collections.Generic;

namespace Sales.Api.Models
{
    public class NewOrderDto
    {
        public int CustomerId { get; set; }
        public int EmployeeId { get; set; }    
        public int ShipperId  { get; set; }   
        public DateTime OrderDate { get; set; } = DateTime.UtcNow; // default ahora
        public decimal Freight { get; set; } = 0m;
        public List<NewOrderItemDto> Details { get; set; } = new List<NewOrderItemDto>();
    }
 
}
