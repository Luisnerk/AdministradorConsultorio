
namespace API.Dto;
public class AppointmentListDto
{
    public DateTime DateAndTime { get; set; }
    public string PatientName { get; set; }
    public int DurationMinutes { get; set; }
}