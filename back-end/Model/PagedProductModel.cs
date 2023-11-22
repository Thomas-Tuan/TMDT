namespace FurnitureShop.Model
{
    public class PagedProductModel
    {
        public List<ProductModel> Products { get; set; }
        public int TotalCount { get; set; }
        public double MaxPrice { get; set; }
        public double MinPrice { get; set; }
    }
}
