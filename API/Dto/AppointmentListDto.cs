
namespace API.Dto;

public class AppointmentListDto
{
    public int Id { get; set; }
    public string PatientName { get; set; }
    public string StartTime { get; set; }
    public string EndTime { get; set; }
}