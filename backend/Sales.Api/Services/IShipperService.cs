using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public interface IShipperService
    {
        Task<IEnumerable<ShipperDto>> GetAsync(string search = null);
    }
}
