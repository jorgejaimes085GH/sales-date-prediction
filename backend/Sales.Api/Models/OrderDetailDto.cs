namespace Sales.Api.Models
{
    public class OrderDetailDto
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }      
        public decimal Discount { get; set; }    
        public decimal LineTotal { get; set; }  
    }
}
