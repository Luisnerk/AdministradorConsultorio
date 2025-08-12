
using System.ComponentModel.DataAnnotations;

namespace API.Dto;

public class RegisterDto
{
    [Required]
    public string UserName { get; set; }
    [Required]
    [StringLength(20, MinimumLength = 6)]
    public string Password { get; set; }
}