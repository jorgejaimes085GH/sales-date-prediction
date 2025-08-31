using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.Api.Data;

namespace Sales.Api.Services
{
    public class PredictionService : IPredictionService
    {
        private readonly IStoreRepository _repo;
        public PredictionService(IStoreRepository repo) => _repo = repo;

        public Task<(IEnumerable<CustomerPredictionDto> Items, int Total)>
            GetPredictionsAsync(string search, int page, int pageSize, string sort, bool desc)
            => _repo.GetCustomerPredictionsAsync(search, page, pageSize, sort, desc);
    }
}
