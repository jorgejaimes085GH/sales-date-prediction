namespace Sales.Api
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public System.DateTime OrderDate { get; set; }
    }
}