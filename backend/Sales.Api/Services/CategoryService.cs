using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Data;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IStoreRepository _repo;
        public CategoryService(IStoreRepository repo) => _repo = repo;

        public Task<IEnumerable<CategoryDto>> GetAsync(string search = null)
            => _repo.GetCategoriesAsync(search);
    }
}
