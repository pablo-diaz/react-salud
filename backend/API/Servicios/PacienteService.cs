using System.Collections.Generic;
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

        public Task<Maybe<Perfil>> ObtenerPerfil(int idPaciente) =>
            _repoPaciente.ObtenerPerfil(idPaciente);

        public Task<IEnumerable<Enfermedad>> ListarEnfermedadesDisponibles() =>
            _repoPaciente.ListarEnfermedadesDisponibles();

        public Task AsignarEnfermedadesAPaciente(int pacienteId, List<Enfermedad> enfermedades) =>
            _repoPaciente.AsignarEnfermedadesAPaciente(pacienteId, enfermedades);

        public Task<IEnumerable<Enfermedad>> ListarEnfermedadesPaciente(int pacienteId) =>
            _repoPaciente.ListarEnfermedadesPaciente(pacienteId);

        public Task<IEnumerable<ConsultaMedica>> ListarConsultasMedicasPaciente(int pacienteId) =>
            _repoPaciente.ListarConsultasMedicasPaciente(pacienteId);
    }
}
