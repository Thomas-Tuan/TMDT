using System.Net.Mail;

namespace FurnitureShop.Helper
{
    public class EmailConfiguration
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Host { get; set; }
        public string? DisplayName { get; set; }
        public int Port { get; set; }

    }
}
