using System;
using System.Linq;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using API.DTOs;

namespace API.Controllers
{
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
        public Perfil ObtenerPerfil() =>
            new Perfil { NombreCompleto = "Pablo Andrés Díaz Patiño", Edad = 41, Genero = "Masculino" };

        [HttpGet("enfermedadesDisponibles")]
        public IEnumerable<Enfermedad> ConsultarEnfermedadesDisponibles() =>
            Enumerable.Range(1, 10)
                .Select(id => new Enfermedad { Id = id, Nombre = $"Enfermedad 0{id}" });

        [HttpGet("enfermedades")]
        public IEnumerable<Enfermedad> ConsultarEnfermedades() =>
            (new int[] {1, 3, 6})
                .Select(id => new Enfermedad { Id = id, Nombre = $"Enfermedad 0{id}" });

        [HttpGet("citasMedicas")]
        public IEnumerable<ConsultaMedica> ConsultarConsultasMedicas() =>
            Enumerable.Range(1, 4)
                .Select(id => new ConsultaMedica { Sitio = $"Sitio 0{id}", Fecha = new DateTime(2020, 3, 15, 9, 45, 0) });

        [HttpGet("actividadesDisponibles")]
        public IEnumerable<Actividad> ConsultarActividadesDisponibles() =>
            Enumerable.Range(1, 10)
                .Select(id => new Actividad { Id = id, Nombre = $"Actividad 0{id}" });

        [HttpPost("enfermedades")]
        public IActionResult AlmacenarEnfermedadesPaciente([FromBody] Enfermedad[] enfermedades) => 
            Ok("Enfermedades almacenadas exitosamente");

        [HttpPost("evaluarActividadesContraEnfermedades")]
        public IEnumerable<Enfermedad> EvaluarActividadesContraEnfermedades([FromBody] Actividad[] actividades) =>
            (new int[] { 1, 3, 6 })
                .Select(id => new Enfermedad { Id = id, Nombre = $"Enfermedad 0{id}" });
    }
}
