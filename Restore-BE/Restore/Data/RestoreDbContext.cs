using Microsoft.EntityFrameworkCore;
using Restore.Models;

namespace Restore.Data
{
    public class RestoreDbContext(DbContextOptions options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Product> Products { get; set; }
    }
}
