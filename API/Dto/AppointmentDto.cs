
namespace API.Dto;

public class AppointmentDto
{
    public DateTime DateAndTime { get; set; }
    public PatientDto Patient { get; set; }
    public int DurationMinutes { get; set; }
}