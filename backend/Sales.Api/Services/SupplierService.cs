using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Data;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly IStoreRepository _repo;
        public SupplierService(IStoreRepository repo) => _repo = repo;

        public Task<IEnumerable<SupplierDto>> GetSuppliersAsync(string search = null)
            => _repo.GetSuppliersAsync(search);
    }
}
