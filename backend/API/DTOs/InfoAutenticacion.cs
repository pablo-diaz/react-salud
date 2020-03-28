using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class InfoAutenticacion
    {
        [Required]
        public string Usuario { get; set; }

        [Required]
        public string Passwd { get; set; }
    }
}
