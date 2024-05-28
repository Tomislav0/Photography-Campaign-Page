using SportBin.Data;

namespace SportBin.Services
{
    public class BaseService
    {
        protected readonly DataContext _ctx;
        public BaseService(DataContext ctx)
        {
            _ctx = ctx;
        }
    }
}
