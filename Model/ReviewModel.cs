namespace FurnitureShop.Model
{
    public class ReviewModel
    {
        public int Id { get; set; }
        public int rateValue { get; set; }
        public string? userName { get; set; }
        public string? Comment { get; set; }
        public DateTime Date { get; set; }
        public int productId { get; set; }
    }
}
