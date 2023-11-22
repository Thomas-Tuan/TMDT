using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Model
{
    public class CategoryModel
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
    }
}
