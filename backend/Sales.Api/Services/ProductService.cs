using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Data;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public class ProductService : IProductService
    {
        private readonly IStoreRepository _repo;
        public ProductService(IStoreRepository repo) => _repo = repo;

        public Task<IEnumerable<ProductDto>> GetAsync(string search = null)
            => _repo.GetProductsAsync(search);
    }
}
