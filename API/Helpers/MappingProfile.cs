
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
                                opt => opt.MapFrom(x => DateTime.Now.Year - x.DateOfBirth.ToDateTime(TimeOnly.MinValue).Year));
        CreateMap<Appointment, AppointmentDto>();
        CreateMap<Appointment, AppointmentListDto>()
                    .ForMember(dest => dest.StartTime,
                                opt => opt.MapFrom(x => x.DateAndTime.ToString("HH:mm")))
                    .ForMember(dest => dest.EndTime,
                                opt => opt.MapFrom(x => x.DateAndTime.AddMinutes(x.DurationMinutes).ToString("HH:mm")));
        CreateMap<AppointmentRegisterDto, Appointment>();
    }
}