using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Model
{
    public class OrderDetailModel
    {
        [Key]
        public int? Id { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(18,0)")]
        public double productPrice { get; set; }

        public int productID { get; set; }
        public string? productName { get; set; }
        public string? Image { get; set; }

        public string? orderId { get; set; }
    }
}
