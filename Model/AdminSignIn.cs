using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Model
{
    public class AdminSignInModel
    {
        public string Name { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
}
