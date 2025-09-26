
using System.ComponentModel.DataAnnotations;

namespace API.Dto;

public class AppUserDto
{
    public string Username { get; set; }
    public string Token { get; set; }
}