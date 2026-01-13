using Restore_BE.Models.Entities;
using System.Linq.Expressions;

namespace Restore_BE.Repositories.IRepostirories
{
    public interface IRepository<T> where T : class, IEntity
    {
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<T?> GetAsync(int id);
        Task CreateAsync(T entity);
        T Update(T entity);
        void Delete(T entity);
    }
}
