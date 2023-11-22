using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Model
{
    public class SignInModel
    {
        public string Name { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
}
