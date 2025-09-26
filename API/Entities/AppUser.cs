
namespace API.Entities;

public class AppUser : GenericEntity
{
    public string Username { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; } 
}