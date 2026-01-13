using Restore.Data;
using Restore_BE.Repositories.IRepositories;

namespace Restore_BE.Repositories
{
    public class UnitOfWork(RestoreDbContext context) : IUnitOfWork
    {
        private readonly RestoreDbContext context = context;

        public IProductRepository Products => new ProductRepository(context);

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
