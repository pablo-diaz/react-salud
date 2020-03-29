using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using API.DTOs;

using CSharpFunctionalExtensions;

namespace API.Repositorios
{
    public class InMemoryRepoPaciente : IRepoPaciente
    {
        private static List<Perfil> _perfiles = new List<Perfil>() {
            new Perfil { Id = 1, Edad = 41, Genero = "Hombre", NombreCompleto = "Pablo Díaz" },
            new Perfil { Id = 2, Edad = 39, Genero = "Mujer", NombreCompleto = "Paola S. B." }
        };

        public async Task<Maybe<Perfil>> ObtenerPerfil(int idPaciente)
        {
            var perfilEncontrado = _perfiles.FirstOrDefault(perfil => perfil.Id == idPaciente);
            return perfilEncontrado ?? Maybe<Perfil>.None;
        }
    }
}
