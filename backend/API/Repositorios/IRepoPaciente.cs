using System.Collections.Generic;
using System.Threading.Tasks;

using API.DTOs;

using CSharpFunctionalExtensions;

namespace API.Repositorios
{
    public interface IRepoPaciente
    {
        Task<Maybe<Perfil>> ObtenerPerfil(int idPaciente);

        Task<Result> AgregarPaciente(int id, string nombre, int edad, string genero);

        Task<IEnumerable<Enfermedad>> ListarEnfermedadesDisponibles();

        Task AsignarEnfermedadesAPaciente(int pacienteId, List<Enfermedad> enfermedades);

        Task<IEnumerable<Enfermedad>> ListarEnfermedadesPaciente(int pacienteId);

        Task<IEnumerable<ConsultaMedica>> ListarConsultasMedicasPaciente(int pacienteId);
    }
}
