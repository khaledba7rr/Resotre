using Microsoft.EntityFrameworkCore;
using Restore.Data;
using Restore.Models;
using Restore_BE.Repositories.IRepositories;

namespace Restore_BE.Repositories
{
    public class ProductRepository(RestoreDbContext context) : Repository<Product>(context), IProductRepository
    {
        public async Task<IReadOnlyList<Product>> GetProductsInStockAsync()
        {

            var productsInStock = this._dbSet.AsNoTracking().Where(product => product.QuantityInStock > 0);

            return await productsInStock.ToListAsync();
        }

        public async Task<IReadOnlyList<Product>> GetProductsWithLowStockAsync(int maxQuantity)
        {
            var products = this._dbSet.AsNoTracking().Where(product => product.QuantityInStock > 0 && product.QuantityInStock <= maxQuantity);

            return await products.ToListAsync();
        }
    }
}
