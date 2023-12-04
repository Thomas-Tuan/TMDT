using FurnitureShop.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Model
{
    public class VoucherModel
    {
        [Key]
        public int Id { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        public double amountDiscount { get; set; }
        public double percentageDiscount { get; set; }
        public DateTime endDate { get; set; }
        public DiscountType discountType { get; set; }
    }
}
