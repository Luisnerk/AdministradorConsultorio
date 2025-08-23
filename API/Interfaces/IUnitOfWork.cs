
namespace API.Interfaces;

public interface IUnitOfWork
{
    IUserRepository Users { get; }
    IPatientRepository Patients { get; }
    IAppointmentRepository Appointment { get; }

    Task<int> SaveAsync();
}