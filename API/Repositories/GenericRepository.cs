
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : GenericEntity
{
    protected readonly DataContext _context;
    public GenericRepository(DataContext context)
    {
        _context = context;
    }
    public virtual void Add(T entity)
    {
        _context.Set<T>().Add(entity);
    }
    public virtual void Update(T entity)
    {
        _context.Set<T>().Update(entity);
    }

    public virtual async Task<T> GetById(int id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public virtual async Task<IEnumerable<T>> GetAll()
    {
        return await _context.Set<T>().ToListAsync();
    }
}
