using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api; 

namespace Sales.Api.Services
{
    public interface ICustomerService
    {
        Task<(IEnumerable<CustomerPredictionDto> Items, int Total)>
            GetPredictionsAsync(string search, int page, int pageSize, string sort, bool desc);
    }
}