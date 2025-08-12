
namespace API.Interfaces;

public interface IUnitOfWork
{
    IUserRepository Users { get; }
    IPatientRepository Patients { get; }

    Task<int> SaveAsync();
}