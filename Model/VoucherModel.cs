using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Model
{
    public class VoucherModel
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int Discount { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
    }
}
