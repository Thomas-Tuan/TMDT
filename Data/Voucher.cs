using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Data
{
    public class Voucher
    {
        [Key]
        public int Id { get; set; }
        public string? Code {  get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public double Discount { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

        public ICollection<Order>? Orders { get; set; }
    }
}
