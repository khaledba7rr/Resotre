namespace Restore_BE.Repositories.IRepositories
{
    public interface IUnitOfWork
    {
        IProductRepository Products { get; }
        Task SaveChangesAsync();
    }
}
