

using API.Dto;

namespace API.Entities;

public class Appointment : GenericEntity
{
    public DateTime DateAndTime { get; set; }
    public int PatientId { get; set; }
    public int DurationMinutes { get; set; }
    public virtual Patient Patient { get; set; } = null!;
}