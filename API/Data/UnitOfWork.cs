
using API.Entities;
using API.Interfaces;
using API.Repositories;

namespace API.Data;

public class UnitOfWork : IUnitOfWork
{
    DataContext _context;
    IUserRepository _users;
    IPatientRepository _patients;
    IAppointmentRepository _appointment;

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

    public IAppointmentRepository Appointment
    {
        get
        {
            if (_appointment == null)
            {
                _appointment = new AppointmentRepository(_context);
            }
            return _appointment;
        }
    }

    public async Task<int> SaveAsync()
    {
        return await _context.SaveChangesAsync();
    }
}