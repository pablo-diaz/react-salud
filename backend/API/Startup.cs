using System.Text;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using API.Infrastructure.Helpers;
using API.Servicios;
using API.Repositorios;

namespace API
{
    public class Startup
    {
        private readonly string _politicaDeOrigenesPermitidos = "_PoliticaDeOrigenesPermitidos";
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();

            services.AddCors(options =>
            {
                options.AddPolicy(_politicaDeOrigenesPermitidos,
                builder =>
                {
                    builder
                        .WithOrigins("http://localhost:3000", "https://localhost:3000")
                        .AllowAnyHeader()
                        .WithMethods("GET", "POST");
                });
            });
            services.AddControllers();

            ConfigureJWT(services, appSettings);
            ConfigurarInyeccionDeServicios(services);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseCors(_politicaDeOrigenesPermitidos);
            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void ConfigureJWT(IServiceCollection services, AppSettings appSettings)
        {
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        private void ConfigurarInyeccionDeServicios(IServiceCollection services)
        {
            services.AddScoped<ISeguridadService, SeguridadService>();
            services.AddScoped<IPacienteService, PacienteService>();

            services.AddScoped<IRepoUsuario, InMemoryRepoUsuario>();
            services.AddScoped<IRepoPaciente, InMemoryRepoPaciente>();
        }
    }
}
