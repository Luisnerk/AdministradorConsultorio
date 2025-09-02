
using System.Reflection;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;
public static class ApplicationServiceExtensions
{

    public static void AddApplicationServices(this IServiceCollection services, IConfiguration iConfig)
    {
        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlite(iConfig.GetConnectionString("DefaultConnection"));
        });
        services.AddAutoMapper(Assembly.GetEntryAssembly());
        services.AddCors(options =>
        {
            options.AddPolicy(name: "CORS_1",
            policy =>
            {
                policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
            });
        });
        services.AddControllers();

        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
    }
}