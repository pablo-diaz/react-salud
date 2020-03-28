using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using API.Servicios.DTOs;

using CSharpFunctionalExtensions;

namespace API.Servicios
{
    public class InMemorySeguridadService : ISeguridadService
    {
        private static Dictionary<string, Usuario> _usuariosDB = new Dictionary<string, Usuario>() {
            { "pablo", new Usuario { Id = 1, Passwd = "nada" } }
        };

        public Task<Result<Usuario>> Autenticar(string usuario, string passwd)
        {
            if (string.IsNullOrWhiteSpace(usuario))
                throw new ArgumentNullException(nameof(usuario));

            if (string.IsNullOrWhiteSpace(passwd))
                throw new ArgumentNullException(nameof(passwd));

            if (!_usuariosDB.ContainsKey(usuario))
                return Task.FromResult(Result.Failure<Usuario>("Autenticacion fallida"));

            var usuarioDeLaDB = _usuariosDB[usuario];
            if (usuarioDeLaDB.Passwd != passwd)
                return Task.FromResult(Result.Failure<Usuario>("Autenticacion fallida"));

            return Task.FromResult(Result.Ok(usuarioDeLaDB));
        }
    }
}
