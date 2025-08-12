
using System.Linq.Expressions;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository : IGenericRepository<AppUser>
{
    Task<AppUser> SingleOrDefaultAsync(Expression<Func<AppUser, bool>> expression);
}