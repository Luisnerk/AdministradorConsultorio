
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class AppointmentRepository : GenericRepository<Appointment>, IAppointmentRepository
{
    public AppointmentRepository(DataContext context) : base(context)
    {
    }

    public override async Task<IEnumerable<Appointment>> GetAll()
    {
        return await _context.Appointment
                                .Include(p => p.Patient)
                                .ToListAsync();
             
    }

    public async Task<IEnumerable<Appointment>> getByDate(DateOnly date)
    {
        return await _context.Appointment
                                .Where(p => DateOnly.FromDateTime(p.DateAndTime) == date)
                                .OrderBy(p => p.DateAndTime)
                                .Include(p => p.Patient)
                                .ToListAsync();
    }

    public override async Task<Appointment> GetById(int id)
    {
        return await _context.Appointment
                .Include(p => p.Patient)
                .FirstOrDefaultAsync(p => p.Id == id);
        
    }
}