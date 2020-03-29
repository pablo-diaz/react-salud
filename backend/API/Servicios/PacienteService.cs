using System.Threading.Tasks;

using API.DTOs;
using API.Repositorios;

using CSharpFunctionalExtensions;

namespace API.Servicios
{
    public class PacienteService : IPacienteService
    {
        private readonly IRepoPaciente _repoPaciente;

        public PacienteService(IRepoPaciente repoPaciente)
        {
            this._repoPaciente = repoPaciente;
        }

        public Task<Maybe<Perfil>> ObtenerPerfil(int idPaciente)
        {
            return _repoPaciente.ObtenerPerfil(idPaciente);
        }
    }
}
