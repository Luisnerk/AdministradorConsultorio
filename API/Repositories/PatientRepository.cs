
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class PatientRepository : GenericRepository<Patient>, IPatientRepository
{
    public PatientRepository(DataContext context) : base(context) { }

    public async Task<IEnumerable<Patient>> GetByName(string name)
    {
        return await _context.Patients
                                .Where(p => p.Name.ToLower().Contains(name.ToLower()))
                                .ToListAsync();
    }
}