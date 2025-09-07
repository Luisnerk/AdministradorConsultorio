using API.Extensions;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices(iConfig: builder.Configuration);
builder.Services.AddIdentityServices(config: builder.Configuration);

var app = builder.Build();

app.UseCors("CORS_1");

// Mapear controladores
app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();