using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

using API.DTOs;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PacienteController : ControllerBase
    {
        private readonly ILogger<PacienteController> _logger;

        public PacienteController(ILogger<PacienteController> logger)
        {
            _logger = logger;
        }

        [HttpGet("perfil")]
        public async Task<Perfil> ObtenerPerfil()
        { 
            await Task.Delay(1000);
            return new Perfil { NombreCompleto = "Pablo Andrés Díaz Patiño", Edad = 41, Genero = "Masculino" };
        }

        [HttpGet("enfermedadesDisponibles")]
        public async Task<IEnumerable<Enfermedad>> ConsultarEnfermedadesDisponibles()
        {
            await Task.Delay(1000);
            return Enumerable.Range(1, 10)
                .Select(id => new Enfermedad { Id = id, Nombre = $"Enfermedad 0{id}" });
        }

        [HttpGet("enfermedades")]
        public async Task<IEnumerable<Enfermedad>> ConsultarEnfermedades()
        {
            await Task.Delay(1000);
            return (new int[] {1, 3, 6})
                .Select(id => new Enfermedad { Id = id, Nombre = $"Enfermedad 0{id}" });
        }

        [HttpGet("citasMedicas")]
        public async Task<IEnumerable<ConsultaMedica>> ConsultarConsultasMedicas()
        {
            await Task.Delay(1000);
            return Enumerable.Range(1, 4)
                .Select(id => new ConsultaMedica { Sitio = $"Sitio 0{id}", Fecha = new DateTime(2020, 3, 15, 9, 45, 0) });
        }

        [HttpGet("actividadesDisponibles")]
        public async Task<IEnumerable<Actividad>> ConsultarActividadesDisponibles()
        {
            await Task.Delay(1000);
            return Enumerable.Range(1, 10)
                .Select(id => new Actividad { Id = id, Nombre = $"Actividad 0{id}" });
        }

        [HttpPost("enfermedades")]
        public async Task<IActionResult> AlmacenarEnfermedadesPaciente([FromBody] Enfermedad[] enfermedades)
        {
            await Task.Delay(1000);
            return Ok("Enfermedades almacenadas exitosamente");
        }

        [HttpPost("evaluarActividadesContraEnfermedades")]
        public async Task<IEnumerable<Enfermedad>> EvaluarActividadesContraEnfermedades([FromBody] Actividad[] actividades)
        {
            await Task.Delay(1000);
            return (new int[] { 1, 3, 6 })
                .Select(id => new Enfermedad { Id = id, Nombre = $"Enfermedad 0{id}" });
        }
    }
}
