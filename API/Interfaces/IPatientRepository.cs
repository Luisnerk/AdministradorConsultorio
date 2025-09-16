
using API.Dto;
using API.Entities;
using API.Helpers;
using AutoMapper;

namespace API.Interfaces;

public interface IPatientRepository : IGenericRepository<Patient>
{
    public Task<IEnumerable<Patient>> GetByName(string name);
    public Task<PagedList<PatientDto>> GetPaged(UserParams userParams, IMapper _mapper);
}