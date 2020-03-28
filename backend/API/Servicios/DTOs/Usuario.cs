namespace API.Servicios.DTOs
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Passwd { get; set; }
        public string TokenDeSeguridad { get; set;  }
    }
}
