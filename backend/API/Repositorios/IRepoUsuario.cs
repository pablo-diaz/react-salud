using API.Servicios.DTOs;
using CSharpFunctionalExtensions;
using System.Threading.Tasks;

namespace API.Repositorios
{
    public interface IRepoUsuario
    {
        Task<Maybe<Usuario>> ObtenerUsuario(string userName);
        Task<Maybe<Usuario>> ObtenerUsuario(int id);
    }
}
