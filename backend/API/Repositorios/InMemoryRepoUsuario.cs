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

        public async Task<Maybe<Usuario>> ObtenerUsuario(string userName)
        {
            var usuarioEncontrado = _usuariosDB.FirstOrDefault(u => u.UserName == userName);
            return usuarioEncontrado ?? Maybe<Usuario>.None;
        }

        public async Task<Maybe<Usuario>> ObtenerUsuario(int id)
        {
            var usuarioEncontrado = _usuariosDB.FirstOrDefault(u => u.Id == id);
            return usuarioEncontrado ?? Maybe<Usuario>.None;
        }
    }
}
