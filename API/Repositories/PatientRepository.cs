
using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;
public class PatientRepository : GenericRepository<Patient>, IPatientRepository
{
    public PatientRepository(DataContext context) : base(context){}
}