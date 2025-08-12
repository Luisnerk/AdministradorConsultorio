
namespace API.Dto;
public class AppointmentRegisterDto
{
    public DateTime DateAndTime { get; set; }
    public PatientDto Patient { get; set; }
    public int DurationTime { get; set; }
}