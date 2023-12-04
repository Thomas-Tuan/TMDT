namespace FurnitureShop.Model
{
    public class PagedReviewModel
    {
        public List<ReviewModel> Reviews { get; set; }
        public int TotalCount { get; set; }
        public double AverageRating { get; set; }
    }
}
