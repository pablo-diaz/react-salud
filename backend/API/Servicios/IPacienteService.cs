using System.Collections.Generic;
using System.Threading.Tasks;

using API.DTOs;

using CSharpFunctionalExtensions;

namespace API.Servicios
{
    public interface IPacienteService
    {
        Task<Maybe<Perfil>> ObtenerPerfil(int idPaciente);
        Task<IEnumerable<Enfermedad>> ListarEnfermedadesDisponibles();
        Task AsignarEnfermedadesAPaciente(int pacienteId, List<Enfermedad> enfermedades);
        Task<IEnumerable<Enfermedad>> ListarEnfermedadesPaciente(int pacienteId);
        Task<IEnumerable<ConsultaMedica>> ListarConsultasMedicasPaciente(int pacienteId);
    }
}
