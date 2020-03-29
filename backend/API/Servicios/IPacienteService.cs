using System.Threading.Tasks;

using API.DTOs;

using CSharpFunctionalExtensions;

namespace API.Servicios
{
    public interface IPacienteService
    {
        Task<Maybe<Perfil>> ObtenerPerfil(int idPaciente);
    }
}
