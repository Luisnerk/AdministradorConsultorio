
namespace API.Dto;

public class PatientAddUpdateDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateOnly DateOfBirth { get; set; }

}