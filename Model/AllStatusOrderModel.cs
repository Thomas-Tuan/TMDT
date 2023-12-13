namespace FurnitureShop.Model
{
    public class ProductLike
    {
        public string? Name { get; set; }
        public int totalCount { get; set; }
    }
    public class AllStatisticsModel
    {
        public int TotalOrderRequest { get; set; }
        public int TotalCanceled { get; set; }
        public int TotalCompleted { get; set; }
        public int TotalPayment { get; set; }

        public int TotalOrder { get; set; }
        public double TotalVenue { get; set; }
        public int TotalProduct { get; set; }
        public int TotalUser { get; set; }
        public List<ProductLike>? productLike { get; set; }
    }
}
