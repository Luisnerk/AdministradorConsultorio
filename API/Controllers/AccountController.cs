
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Dto;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

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

        user.UserName = register.UserName;
        user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password));
        user.PasswordSalt = hmac.Key;

        _unitOfWork.Users.Add(user);
        await _unitOfWork.SaveAsync();

        return new AppUserDto
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }


    [HttpPost("login")]
    public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto)
    {
        var user = await _unitOfWork.Users.SingleOrDefaultAsync(x => x.UserName.ToLower() == loginDto.UserName.ToLower());

        if (user == null) return Unauthorized();

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
                return Unauthorized();
        }

        return new AppUserDto
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }
}