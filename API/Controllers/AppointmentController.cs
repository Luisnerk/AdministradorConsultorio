
using API.Dto;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AppointmentController : BaseApiController
{
    public AppointmentController(IMapper mapper, IUnitOfWork unitOfWork) : base(mapper, unitOfWork) { }

    [HttpPost("register")]
    public async Task<ActionResult<Appointment>> Register(AppointmentRegisterDto registerDto)
    {
        var appointment = _mapper.Map<Appointment>(registerDto);
        _unitOfWork.Appointment.Add(appointment);
        await _unitOfWork.SaveAsync();
        return appointment;
    }

    [HttpGet("all")]
    public async Task<ActionResult<List<AppointmentListDto>>> GetAll()
    {
        var appointments = await _unitOfWork.Appointment.GetAll();
        var appointmentsDto = _mapper.Map<List<AppointmentListDto>>(appointments);
        return appointmentsDto;
    }

    [HttpGet("byDate")]
    public async Task<ActionResult<List<AppointmentListDto>>> GetByDate(DateOnly date)
    {
        var appointments = await _unitOfWork.Appointment.getByDate(date);
        var appointmentsDto = _mapper.Map<List<AppointmentListDto>>(appointments);
        return appointmentsDto;
    }

    [HttpGet("getUpcoming")]
    public async Task<ActionResult<List<AppointmentListDto>>> getUpcoming([FromQuery]int id)
    {
        var appointments = await _unitOfWork.Appointment.getUpcoming(id);
        var appointmentsDto = _mapper.Map<List<AppointmentListDto>>(appointments);
        return appointmentsDto;
    }

    [HttpDelete("delete")]
    public async Task<ActionResult> ActionResult(AppointmentListDto appointmentDto)
    {
        try
        {
            Appointment appointment = _mapper.Map<Appointment>(appointmentDto);
            _unitOfWork.Appointment.Delete(appointment);
            await _unitOfWork.SaveAsync();
            return Ok();
        }
        catch (Exception) {
            return BadRequest();
        }
    }
}