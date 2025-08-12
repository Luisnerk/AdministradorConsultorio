
namespace API.Entities;

public class AppUser : GenericEntity
{
    public string UserName { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; } 
}