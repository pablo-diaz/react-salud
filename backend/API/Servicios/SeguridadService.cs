using System;
using System.Linq;
using System.Threading.Tasks;

using API.Servicios.DTOs;

using CSharpFunctionalExtensions;
using API.Repositorios;

namespace API.Servicios
{
    public class SeguridadService : ISeguridadService
    {
        private readonly IRepoUsuario _repoUsuario;

        public SeguridadService(IRepoUsuario repoUsuario)
        {
            this._repoUsuario = repoUsuario;
        }

        public async Task<Result<Usuario>> Autenticar(string usuario, string passwd)
        {
            if (string.IsNullOrWhiteSpace(usuario))
                throw new ArgumentNullException(nameof(usuario));

            if (string.IsNullOrWhiteSpace(passwd))
                throw new ArgumentNullException(nameof(passwd));

            var maybeUsuario = await _repoUsuario.ObtenerUsuario(usuario);
            if (maybeUsuario.HasNoValue)
                return Result.Failure<Usuario>("Autenticacion fallida");

            var usuarioEncontrado = maybeUsuario.Value;
            if (usuarioEncontrado.Passwd != passwd)
                return Result.Failure<Usuario>("Autenticacion fallida");

            return Result.Ok(usuarioEncontrado);
        }
    }
}
