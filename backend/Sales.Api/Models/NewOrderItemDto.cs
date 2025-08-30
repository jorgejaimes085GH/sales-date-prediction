namespace Sales.Api.Models
{
    public class NewOrderItemDto
    {
        public int ProductId { get; set; }
        public short qty { get; set; }
        public decimal UnitPrice { get; set; }
        public float Discount { get; set; }   
    }
}
