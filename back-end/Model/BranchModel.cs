using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Model
{
    public class BranchModel
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
    }
}
