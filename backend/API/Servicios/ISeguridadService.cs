using System.Threading.Tasks;

using API.Servicios.DTOs;

using CSharpFunctionalExtensions;

namespace API.Servicios
{
    public interface ISeguridadService
    {
        Task<Result<Usuario>> Autenticar(string usuario, string passwd);
        Task<Result> AgregarUsuario(string usuario, string passwd, string nombre, int edad, string genero);
    }
}
