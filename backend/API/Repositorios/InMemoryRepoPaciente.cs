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

        private static List<Enfermedad> _enfermedades = new List<Enfermedad>() { 
            new Enfermedad { Id = 1, Nombre = "Enfermedad 01" },
            new Enfermedad { Id = 2, Nombre = "Enfermedad 02" },
            new Enfermedad { Id = 3, Nombre = "Enfermedad 03" },
            new Enfermedad { Id = 4, Nombre = "Enfermedad 04" },
            new Enfermedad { Id = 5, Nombre = "Enfermedad 05" },
            new Enfermedad { Id = 6, Nombre = "Enfermedad 06" },
            new Enfermedad { Id = 7, Nombre = "Enfermedad 07" },
            new Enfermedad { Id = 8, Nombre = "Enfermedad 08" },
            new Enfermedad { Id = 9, Nombre = "Enfermedad 09" },
            new Enfermedad { Id = 10, Nombre = "Enfermedad 10" }
        };

        private static Dictionary<int, List<Enfermedad>> _enfermedadesPorPaciente = new Dictionary<int, List<Enfermedad>>();

        public Task<Maybe<Perfil>> ObtenerPerfil(int idPaciente)
        {
            var perfilEncontrado = _perfiles.FirstOrDefault(perfil => perfil.Id == idPaciente);
            if (perfilEncontrado != null) return Task.FromResult(Maybe<Perfil>.From(perfilEncontrado));
            return Task.FromResult(Maybe<Perfil>.None);
        }

        public Task<Result> AgregarPaciente(int id, string nombre, int edad, string genero)
        {
            _perfiles.Add(new Perfil { Id = id, NombreCompleto = nombre, Edad = edad, Genero = genero });
            return Task.FromResult(Result.Ok());
        }

        public Task<IEnumerable<Enfermedad>> ListarEnfermedadesDisponibles() =>
            Task.FromResult(_enfermedades as IEnumerable<Enfermedad>);

        public Task AsignarEnfermedadesAPaciente(int pacienteId, List<Enfermedad> enfermedades)
        {
            _enfermedadesPorPaciente[pacienteId] = enfermedades;
            return Task.CompletedTask;
        }

        public Task<IEnumerable<Enfermedad>> ListarEnfermedadesPaciente(int pacienteId)
        {
            if (_enfermedadesPorPaciente.ContainsKey(pacienteId))
                return Task.FromResult(_enfermedadesPorPaciente[pacienteId] as IEnumerable<Enfermedad>);
            return Task.FromResult(new List<Enfermedad>() as IEnumerable<Enfermedad>);
        }

        public Task<IEnumerable<ConsultaMedica>> ListarConsultasMedicasPaciente(int pacienteId) =>
            Task.FromResult(Enumerable.Range(1, 5)
                .Select(id => new ConsultaMedica { Sitio = $"Sitio 0{id}", Fecha = new System.DateTime(2020, 3, 15, 9, 45, 0) }));
    }
}
