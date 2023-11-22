using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Data
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }

        public ICollection<Product>? Products { get; set; }
    }
}
