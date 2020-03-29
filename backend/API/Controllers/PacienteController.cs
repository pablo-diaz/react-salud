using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

using API.DTOs;
using CSharpFunctionalExtensions;
using API.Servicios;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PacienteController : ControllerBase
    {
        private readonly ILogger<PacienteController> _logger;
        private readonly IPacienteService _pacienteService;

        public PacienteController(ILogger<PacienteController> logger, IPacienteService pacienteService)
        {
            _logger = logger;
            this._pacienteService = pacienteService;
        }

        private Maybe<int> ObtenerIdUsuarioSolicitante()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            return identity != null
                ? Convert.ToInt32(identity.FindFirst("UserId").Value)
                : Maybe<int>.None;
        }

        [HttpGet("perfil")]
        public async Task<IActionResult> ObtenerPerfil()
        { 
            var maybeUserId = ObtenerIdUsuarioSolicitante();
            if (!maybeUserId.HasValue)
                return BadRequest();

            var maybePerfil = await this._pacienteService.ObtenerPerfil(maybeUserId.Value);
            if (maybePerfil.HasNoValue)
                return NotFound("Perfil no existe");

            return Ok(maybePerfil.Value);
        }

        [HttpGet("enfermedadesDisponibles")]
        public async Task<IEnumerable<Enfermedad>> ConsultarEnfermedadesDisponibles() =>
            await _pacienteService.ListarEnfermedadesDisponibles();

        [HttpGet("enfermedades")]
        public async Task<IActionResult> ConsultarEnfermedades()
        {
            var maybeUserId = ObtenerIdUsuarioSolicitante();
            if (!maybeUserId.HasValue)
                return BadRequest();
            return Ok(await _pacienteService.ListarEnfermedadesPaciente(maybeUserId.Value));
        }

        [HttpGet("citasMedicas")]
        public async Task<IActionResult> ConsultarConsultasMedicas()
        {
            var maybeUserId = ObtenerIdUsuarioSolicitante();
            if (!maybeUserId.HasValue)
                return BadRequest();

            return Ok(await _pacienteService.ListarConsultasMedicasPaciente(maybeUserId.Value));
        }

        [HttpGet("actividadesDisponibles")]
        public Task<IEnumerable<Actividad>> ConsultarActividadesDisponibles() =>
            Task.FromResult(Enumerable.Range(1, 10)
                .Select(id => new Actividad { Id = id, Nombre = $"Actividad 0{id}" }));

        [HttpPost("enfermedades")]
        public async Task<IActionResult> AlmacenarEnfermedadesPaciente([FromBody] Enfermedad[] enfermedades)
        {
            var maybeUserId = ObtenerIdUsuarioSolicitante();
            if (!maybeUserId.HasValue)
                return BadRequest();

            await _pacienteService.AsignarEnfermedadesAPaciente(maybeUserId.Value, enfermedades.ToList());
            return Ok("Enfermedades almacenadas exitosamente");
        }

        [HttpPost("evaluarActividadesContraEnfermedades")]
        public Task<IEnumerable<Enfermedad>> EvaluarActividadesContraEnfermedades([FromBody] Actividad[] actividades) =>
            Task.FromResult((new int[] { 1, 3, 6 })
                .Select(id => new Enfermedad { Id = id, Nombre = $"Enfermedad 0{id}" }));
    }
}
