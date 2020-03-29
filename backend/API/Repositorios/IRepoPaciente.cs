using System.Threading.Tasks;

using API.DTOs;

using CSharpFunctionalExtensions;

namespace API.Repositorios
{
    public interface IRepoPaciente
    {
        Task<Maybe<Perfil>> ObtenerPerfil(int idPaciente);
    }
}
