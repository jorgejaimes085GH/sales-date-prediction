using System;
using System.Collections.Generic;

namespace Sales.Api.Models
{
    public class NewOrderDto
    {
        public int CustomerId { get; set; }
        public int EmployeeId { get; set; }   
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public DateTime Requireddate { get; set; } = DateTime.UtcNow;
        public DateTime Shippeddate { get; set; } = DateTime.UtcNow;
        public int ShipperId  { get; set; }   
        public decimal Freight { get; set; } = 0m;
        public string Shipname { get; set; }
        public string Shipaddress { get; set; }
        public string Shipcity { get; set; }
        public string Shipcountry { get; set; }
        public string Shipregion { get; set; }
        public string Shippostalcode { get; set; }
        public List<NewOrderItemDto> Details { get; set; } = new List<NewOrderItemDto>();
    }
 
}
