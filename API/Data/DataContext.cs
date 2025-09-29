
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppUser>()
                            .HasIndex(u => u.Username)
                            .IsUnique();
    }

    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<Patient> Patients { get; set; }
    public DbSet<Appointment> Appointment { get; set; }
}