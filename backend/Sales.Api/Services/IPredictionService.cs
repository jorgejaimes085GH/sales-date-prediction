using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sales.Api.Services
{
    public interface IPredictionService
    {
        Task<(IEnumerable<CustomerPredictionDto> Items, int Total)>
            GetPredictionsAsync(string search, int page, int pageSize, string sort, bool desc);
    }
}
