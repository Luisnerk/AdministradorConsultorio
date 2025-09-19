
using System.Text.Json;
using API.Dto;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PatientController : BaseApiController
{
    public PatientController(IMapper mapper, IUnitOfWork unitOfWork) : base(mapper, unitOfWork) { }

    [HttpGet("list")]
    public async Task<ActionResult<PagedList<PatientDto>>> GetPatients([FromQuery] UserParams userParams)
    {
        var patients = await _unitOfWork.Patients.GetPaged(userParams, _mapper);
        Response.AddPaginationHeader(new PaginationHeader(patients.CurrentPage, patients.PageSize, patients.Count, patients.TotalPages));
        return Ok(patients);
    }

    [HttpPost("add")]
    public Patient AddPatient(PatientAddUpdateDto patientDto)
    {
        Patient patient = _mapper.Map<Patient>(patientDto);
        _unitOfWork.Patients.Add(patient);
        _unitOfWork.SaveAsync();
        return patient;
    }
    // [Authorize]
    [HttpGet("all")]
    public async Task<IEnumerable<PatientDto>> GetAll()
    {
        var patients = await _unitOfWork.Patients.GetAll();
        var mappedPatients = _mapper.Map<List<PatientDto>>(patients);
        return mappedPatients;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PatientDto>> GetById(int id)
    {
        var patient = await _unitOfWork.Patients.GetById(id);
        var patientDto = _mapper.Map<PatientDto>(patient);
        return patientDto;
    }

    [HttpGet("byName")]
    public async Task<ActionResult<List<PatientDto>>> GetByName(string name)
    {
        if (name == null)
        {
            var patientsDtoEmpty = new List<PatientDto>();
            return patientsDtoEmpty;
        }
        var patients = await _unitOfWork.Patients.GetByName(name);
        var patientsDto = _mapper.Map<List<PatientDto>>(patients);
        return patientsDto;
    }

    [HttpGet("byNameLimit")]
    public async Task<ActionResult<List<PatientDto>>> GetByNameLimit([FromQuery] string name, [FromQuery] int limit = 5)
    {
        if (name == null || limit == 0)
        {
            var emptyPatients = new List<PatientDto>();
            return emptyPatients;
        }
        var patients = await _unitOfWork.Patients.GetByNameLimit(name, limit);
        var patientsDto = _mapper.Map<List<PatientDto>>(patients);
        return patientsDto;
    }

    [HttpPatch]
    public void Update(PatientAddUpdateDto patientUpdate)
    {
        Patient patient = _mapper.Map<Patient>(patientUpdate);
        _unitOfWork.Patients.Update(patient);
        _unitOfWork.SaveAsync();
    }

    [HttpDelete]
    public void Delete(PatientAddUpdateDto patientDelete)
    {
        Patient patient = _mapper.Map<Patient>(patientDelete);
        _unitOfWork.Patients.Delete(patient);
        _unitOfWork.SaveAsync();
    }
}