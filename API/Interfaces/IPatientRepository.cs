
using API.Entities;

namespace API.Interfaces;

public interface IPatientRepository : IGenericRepository<Patient>
{
    public Task<IEnumerable<Patient>> GetByName(string name); 
}