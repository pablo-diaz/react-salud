using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using API.Servicios.DTOs;

using CSharpFunctionalExtensions;

namespace API.Repositorios
{
    public class InMemoryRepoUsuario : IRepoUsuario
    {
        private static List<Usuario> _usuariosDB = new List<Usuario>() {
            new Usuario { Id = 1, UserName = "pablo", Passwd = "nada" },
            new Usuario { Id = 2, UserName = "paola", Passwd = "hola" }
        };

        public Task<Maybe<Usuario>> ObtenerUsuario(string userName)
        {
            var usuarioEncontrado = _usuariosDB.FirstOrDefault(u => u.UserName == userName);
            if (usuarioEncontrado != null) return Task.FromResult(Maybe<Usuario>.From(usuarioEncontrado));
            return Task.FromResult(Maybe<Usuario>.None);
        }

        public Task<Maybe<Usuario>> ObtenerUsuario(int id)
        {
            var usuarioEncontrado = _usuariosDB.FirstOrDefault(u => u.Id == id);
            if (usuarioEncontrado != null) return Task.FromResult(Maybe<Usuario>.From(usuarioEncontrado));
            return Task.FromResult(Maybe<Usuario>.None);
        }

        public Task<Result<int>> AgregarUsuario(string usuario, string passwd)
        {
            if (_usuariosDB.Any(u => u.UserName == usuario))
                return Task.FromResult(Result.Failure<int>("Usuario ya existe. Toma otro nombre de usuario"));
            var nextId = _usuariosDB.Last().Id + 1;
            _usuariosDB.Add(new Usuario { Id = nextId, UserName = usuario, Passwd = passwd });

            return Task.FromResult(Result.Ok(nextId));
        }
    }
}
