using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Data
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}
