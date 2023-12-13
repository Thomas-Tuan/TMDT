using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Data
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        [Range(0, double.MaxValue, ErrorMessage = "Số tiền không được nhỏ hơn 0")]
        [Column(TypeName = "decimal(18,0)")]
        public double Price { get; set; }
        [Range(0, 100, ErrorMessage = "Số lượng phải nhỏ hơn hoặc bằng 100 !!")]
        public int Quantity { get; set; }
        public string? imgMain { get; set; }
        public string? Image2 { get; set; }
        public string? Image3 { get; set; }
        [Column(TypeName = "decimal(18,0)")]
        public double? Discount { get; set; }

        public int? categoryId { get; set; }
        public Category? Category { get; set; }

        public int? branchId { get; set; }
        public Branch? Branch { get; set; }

        public int ReviewCount { get; set; }
        [Column(TypeName = "decimal(18,0)")]
        public double AverageRating { get; set; }
        public ICollection<Review>? ReviewPros { get; set; }

        public ICollection<OrderDetail>? OrderDetail { get; set; }

        public virtual ICollection<FavoriteProduct> FavoriteProducts { get; set; }
    }
}
