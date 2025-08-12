
using System.ComponentModel.DataAnnotations;

namespace API.Dto;

public class AppUserDto
{
    public string UserName { get; set; }
    public string Token { get; set; }
}