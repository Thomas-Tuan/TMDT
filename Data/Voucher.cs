using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Data
{
    public enum DiscountType
    {
        amountType = 0,
        percentType = 1,
    }
    public class Voucher
    {
        [Key]
        public int Id { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        [Column(TypeName = "decimal(18,0)")]
        public double amountDiscount { get; set; }
        [Column(TypeName = "decimal(18,0)")]
        public double percentageDiscount { get; set; }
        public DiscountType discountType { get; set; }
        public DateTime? endDate { get; set; }

    }
}
