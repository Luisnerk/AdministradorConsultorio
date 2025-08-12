
using API.Interfaces;
using API.Repositories;

namespace API.Data;

public class UnitOfWork : IUnitOfWork
{
    DataContext _context;
    IUserRepository _users;
    IPatientRepository _patients;

    public UnitOfWork(DataContext context)
    {
        _context = context;
    }

    public IUserRepository Users
    {
        get
        {
            if (_users == null)
            {
                _users = new UserRepository(_context);
            }
            return _users;
        }
    }

    public IPatientRepository Patients
    {
        get
        {
            if (_patients == null)
            {
                _patients = new PatientRepository(_context);
            }
            return _patients;
        }
    }

    public async Task<int> SaveAsync()
    {
        return await _context.SaveChangesAsync();
    }
}