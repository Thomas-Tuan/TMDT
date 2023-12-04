using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Model
{
    public class ProductModel
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        [Range(0, double.MaxValue, ErrorMessage = "Số tiền không được nhỏ hơn 0")]
        public double Price { get; set; }
        [Range(0, 100, ErrorMessage = "Số lượng phải nhỏ hơn hoặc bằng 100 !!")]
        public int Quantity { get; set; }
        public string? imgMain { get; set; }
        public string? Image2 { get; set; }
        public string? Image3 { get; set; }
        public double? Discount { get; set; }

        [NotMapped]
        public int totalRequestQuantity { get; set; }

        public int? categoryId { get; set; }
        public int? branchId { get; set; }
    }
}
