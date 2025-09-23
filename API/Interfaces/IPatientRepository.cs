
using API.Dto;
using API.Entities;
using API.Helpers;
using AutoMapper;

namespace API.Interfaces;

public interface IPatientRepository : IGenericRepository<Patient>
{
    public Task<IEnumerable<Patient>> GetByName(string name);
    public Task<PagedList<PatientDto>> GetByNamePaged(string name, UserParams userParams, IMapper _mapper);
    public Task<PagedList<PatientDto>> GetPaged(UserParams userParams, IMapper _mapper);
    public Task<IEnumerable<Patient>> GetByNameLimit(string name, int limit);
}