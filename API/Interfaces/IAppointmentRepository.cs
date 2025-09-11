
using API.Entities;

namespace API.Interfaces;
public interface IAppointmentRepository : IGenericRepository<Appointment>
{
    public Task<IEnumerable<Appointment>> getByDate(DateOnly date);
}