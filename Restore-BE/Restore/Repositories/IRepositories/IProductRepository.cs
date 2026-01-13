using Restore.Models;
using Restore_BE.Repositories.IRepostirories;

namespace Restore_BE.Repositories.IRepositories
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<IReadOnlyList<Product>> GetProductsInStockAsync();

        Task<IReadOnlyList<Product>> GetProductsWithLowStockAsync(int maxQuantity);
    }
}
