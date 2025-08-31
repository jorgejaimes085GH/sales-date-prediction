namespace Sales.Api.Models
{
    public class ProductDto
    {
        public int productId { get; set; }
        public string productName { get; set; }
        public decimal? unitPrice { get; set; }
        public bool discontinued { get; set; }
    }
}
