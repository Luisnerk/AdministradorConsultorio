
using API.Entities;

namespace API.Interfaces;

public interface IGenericRepository<T> where T : GenericEntity
{
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
    Task<IEnumerable<T>> GetAll();
    Task<T> GetById(int id);
}