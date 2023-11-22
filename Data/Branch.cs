using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Data
{
    public class Branch
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }

        public ICollection<Product>? Products { get; set; }

    }
}
