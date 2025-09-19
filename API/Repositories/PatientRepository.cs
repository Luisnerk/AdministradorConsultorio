
using API.Data;
using API.Dto;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

    public async Task<IEnumerable<Patient>> GetByNameLimit(string name, int limit)
    {
        return await _context.Patients
                                .Where(p => p.Name.ToLower().Contains(name.ToLower()))
                                .Take(limit)
                                .ToListAsync();
    }

    public async Task<PagedList<PatientDto>> GetPaged(UserParams userParams, IMapper _mapper)
    {
        var query = _context.Patients.AsQueryable();
        var res = await PagedList<PatientDto>.CreateAsync(query.AsNoTracking().ProjectTo<PatientDto>(_mapper.ConfigurationProvider), userParams.pageNumber, userParams.PageSize);
        return res;
    }
}