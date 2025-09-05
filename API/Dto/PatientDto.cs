
namespace API.Dto;

public class PatientDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public int Age { get; set; }
}