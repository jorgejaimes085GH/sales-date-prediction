using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Data;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public class ShipperService : IShipperService
    {
        private readonly IStoreRepository _repo;
        public ShipperService(IStoreRepository repo) => _repo = repo;

        public Task<IEnumerable<ShipperDto>> GetAsync(string search = null)
            => _repo.GetShippersAsync(search);
    }
}
