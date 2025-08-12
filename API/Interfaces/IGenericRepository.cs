
using API.Entities;

namespace API.Interfaces;

public interface IGenericRepository<T> where T : GenericEntity
{
    void Add(T entity);
    Task<IEnumerable<T>> GetAll();
}