using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Model
{
    public class SignInOptModel
    {
        public string Name { get; set; } = null!;
        [EmailAddress]
        public string Email { get; set; } = null!;
        public string Role { get; set; } = null!;
    }
}
