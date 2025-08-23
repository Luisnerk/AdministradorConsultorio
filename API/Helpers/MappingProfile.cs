
using API.Dto;
using API.Entities;
using AutoMapper;

namespace API.Helpers;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<AppUserDto, AppUser>();
        CreateMap<RegisterDto, AppUser>();
        CreateMap<Patient, PatientAddUpdateDto>().ReverseMap();
        CreateMap<Patient, PatientDto>()
                    .ForMember(dest => dest.Age,
                                opt => opt.MapFrom(x =>
                                                    DateTime.Now.Year - x.DateOfBirth.ToDateTime(TimeOnly.MinValue).Year));
        CreateMap<Appointment, AppointmentDto>();
        CreateMap<Appointment, AppointmentListDto>();
        CreateMap<AppointmentRegisterDto, Appointment>();
    }
}