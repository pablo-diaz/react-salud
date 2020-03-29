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
        private readonly IRepoPaciente _repoPaciente;

        public SeguridadService(IRepoUsuario repoUsuario, IRepoPaciente repoPaciente)
        {
            this._repoUsuario = repoUsuario;
            this._repoPaciente = repoPaciente;
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

        public async Task<Result> AgregarUsuario(string usuario, string passwd, string nombre, int edad, string genero)
        {
            var resultadoAgregarUsuario = await _repoUsuario.AgregarUsuario(usuario, passwd);
            if (resultadoAgregarUsuario.IsFailure)
                return resultadoAgregarUsuario;

            var idUsuario = resultadoAgregarUsuario.Value;
            return await _repoPaciente.AgregarPaciente(idUsuario, nombre, edad, genero);
        }
    }
}
