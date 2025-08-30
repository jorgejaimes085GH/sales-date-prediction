using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Models;

namespace Sales.Api.Services
{
    public interface ISupplierService
    {
        Task<IEnumerable<SupplierDto>> GetSuppliersAsync(string search = null);
    }
}
