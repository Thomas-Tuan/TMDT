using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Data
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public int rateValue { get; set; }
        public string? userName { get; set; }
        public string? Comment { get; set; }
        public DateTime Date { get; set; }

        public int productId { get; set; }
        public Product? Product { get; set; }
    }
}
