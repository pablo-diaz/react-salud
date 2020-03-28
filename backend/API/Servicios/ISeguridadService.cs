using System;
using System.Threading.Tasks;

using API.Servicios.DTOs;

using CSharpFunctionalExtensions;

namespace API.Servicios
{
    public interface ISeguridadService
    {
        Task<Result<Usuario>> Autenticar(string usuario, string passwd);
    }
}
