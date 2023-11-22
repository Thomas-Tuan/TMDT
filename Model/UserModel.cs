using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Model
{
    public class UserModel
    {
        public string? Id { get; set; }

        public string UserName { get; set; } = null!;
        [EmailAddress]
        public string Email { get; set; } = null!;

        public string Role { get; set; } = null!;

        public string Password { get; set; } = null!;
        public string confirmPass { get; set; } = null!;
        public bool isLock { get; set; } = false;
    }
}
