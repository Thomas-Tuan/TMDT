using FurnitureShop.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Model
{
    public class OrderModel
    {
        [Key]
        public string? Id { get; set; }
        public DateTime Date { get; set; }
        public Status Status { get; set; }

        [Column(TypeName = "decimal(18,0)")]
        public double Total { get; set; }
        public string? customerId { get; set; }
        public string? voucherId { get; set; }

        public string? cusName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int Gender { get; set; }
        public string? voucherCode {  get; set; }

        [NotMapped]
        public List<ProductModel>? Products { get; set; }
    }
}
