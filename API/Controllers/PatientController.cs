using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PatientController : BaseApiController
{
    public PatientController(IMapper mapper, IUnitOfWork unitOfWork) : base(mapper, unitOfWork) { }

    [HttpPost("add")]
    public Patient AddPatient(PatientAddUpdateDto patientDto)
    {
        Patient patient = _mapper.Map<Patient>(patientDto);
        _unitOfWork.Patients.Add(patient);
        _unitOfWork.SaveAsync();
        return patient;
    }

    [HttpGet("all")]
    public async Task<IEnumerable<PatientDto>> GetAll()
    {
        var patients = await _unitOfWork.Patients.GetAll();
        return _mapper.Map<List<PatientDto>>(patients);
    }
}