using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAsync(string search = null);
    }
}
