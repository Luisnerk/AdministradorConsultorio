
namespace API.Entities;

public class Patient : GenericEntity
{
    public string Name { get; set; }
    public DateOnly DateOfBirth { get; set; }
}