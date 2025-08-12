
using System.Linq.Expressions;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class UserRepository : GenericRepository<AppUser>, IUserRepository
{
    public UserRepository(DataContext context) : base(context)
    {
    }

    public Task<AppUser> SingleOrDefaultAsync(Expression<Func<AppUser, bool>> expression)
    {
        return _context.Set<AppUser>().SingleOrDefaultAsync(expression);
    }
}