using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using API.DTOs;
using API.Servicios;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using API.Infrastructure.Helpers;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SeguridadController: ControllerBase
    {
        private readonly ILogger<SeguridadController> _logger;
        private readonly ISeguridadService _seguridadService;
        public readonly IConfiguration _configuration;

        public SeguridadController(ILogger<SeguridadController> logger, ISeguridadService seguridadService, IConfiguration configuration)
        {
            _logger = logger;
            _seguridadService = seguridadService;
            _configuration = configuration;
        }

        [HttpPost("autenticarse")]
        public async Task<IActionResult> AutenticarUsuario([FromBody] InfoAutenticacion info)
        {
            await Task.Delay(1000);
            var usuarioDeDBResult = await _seguridadService.Autenticar(info.Usuario, info.Passwd);
            if (usuarioDeDBResult.IsFailure)
                return Forbid();

            var usuarioDeDB = usuarioDeDBResult.Value;
            usuarioDeDB.TokenDeSeguridad = ObtenerJWTToken(usuarioDeDB.Id);
            var resultado = Usuario.MapFromServiceUser(usuarioDeDB);
            return Ok(resultado);
        }

        [HttpPost("agregarUsuario")]
        public async Task<IActionResult> RegistrarUsuario([FromBody] InfoRegistroUsuario info)
        {
            var resultadoAgregarUsuario = await _seguridadService.AgregarUsuario(info.Usuario, info.Passwd, info.NombreCompleto, info.Edad, info.Genero);
            if (resultadoAgregarUsuario.IsSuccess) return Ok("Exito");
            return BadRequest(resultadoAgregarUsuario.Error);
        }

        private string ObtenerJWTToken(int idUsuario)
        {
            var appSettingsSection = _configuration.GetSection("AppSettings");
            var appSettings = appSettingsSection.Get<AppSettings>();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("UserId", idUsuario.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
