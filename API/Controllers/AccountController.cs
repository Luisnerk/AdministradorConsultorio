
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    ITokenService _tokenService;
    public AccountController(IMapper mapper, ITokenService tokenService, IUnitOfWork unitOfWork) : base(mapper, unitOfWork)
    {
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AppUserDto>> Register(RegisterDto register)
    {
        AppUser user = _mapper.Map<AppUser>(register);
        using var hmac = new HMACSHA512();

        user.Username = register.Username;
        user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password));
        user.PasswordSalt = hmac.Key;

        _unitOfWork.Users.Add(user);
        await _unitOfWork.SaveAsync();

        return new AppUserDto
        {
            Username = user.Username,
            Token = _tokenService.CreateToken(user)
        };
    }


    [HttpPost("login")]
    public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto)
    {
        var user = await _unitOfWork.Users.SingleOrDefaultAsync(x => x.Username.ToLower() == loginDto.Username.ToLower());

        if (user == null) return Unauthorized();

        if (!CheckPassword(user, loginDto.Password)) return Unauthorized();

        return new AppUserDto
        {
            Username = user.Username,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpPatch]
    public async Task<ActionResult<AppUserDto>> Update(AppUserUpdateDto appUserUpdateDto)
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        int id;
        using var hmac = new HMACSHA512();

        if (!identity.IsAuthenticated || !Int32.TryParse(identity.FindFirst(ClaimTypes.NameIdentifier).Value, out id))
        {
            return Unauthorized();
        }

        var updateData = await _unitOfWork.Users.SingleOrDefaultAsync(p => p.Id == id);

        if (!CheckPassword(updateData, appUserUpdateDto.CurrentPassword)) return BadRequest();

        updateData.Username = appUserUpdateDto.NewUsername;
        Console.WriteLine(string.IsNullOrEmpty(appUserUpdateDto.NewPassword));
        if (!string.IsNullOrEmpty(appUserUpdateDto.NewPassword))
        {
            updateData.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(appUserUpdateDto.NewPassword));
            updateData.PasswordSalt = hmac.Key;
        }


        _unitOfWork.Users.Update(updateData);
        await _unitOfWork.SaveAsync();

        AppUserDto userDto = new AppUserDto
        {
            Username = updateData.Username,
            Token = _tokenService.CreateToken(updateData)
        };
        return Ok(userDto);
    }

    private bool CheckPassword(AppUser user, string password)
    {
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return false;
            }
        }
        return true;
    }
}