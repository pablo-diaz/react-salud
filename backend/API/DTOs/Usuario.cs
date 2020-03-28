namespace API.DTOs
{
    public class Usuario
    {
        public string Token { get; }

        private Usuario(string token)
        {
            this.Token = token;
        }

        public static Usuario MapFromServiceUser(API.Servicios.DTOs.Usuario source)
        {
            return new Usuario(source.TokenDeSeguridad);
        }
    }
}
