namespace Restore_BE.Repositories;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Restore.Data;
using Restore_BE.Models.Entities;
using Restore_BE.Repositories.IRepostirories;
using System.Collections.Generic;
using System.Threading.Tasks;

public class Repository<T>(RestoreDbContext context) : IRepository<T> where T : class, IEntity
{
    protected readonly DbSet<T> _dbSet = context.Set<T>();

    public async Task<IReadOnlyList<T>> GetAllAsync()
    {
        IQueryable<T> query = _dbSet.AsNoTracking();

        return await query.ToListAsync();
    }

    public async Task<T?> GetAsync(int id)
    {
        IQueryable<T> query =  _dbSet.AsNoTracking();

        return await query.FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task CreateAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
    }

    public T Update(T entity)
    {
        _dbSet.Update(entity);

        return entity;
    }

    public void Delete(T entity)
    {
        _dbSet.Remove(entity);
    }
}
