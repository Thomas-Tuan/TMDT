using FurnitureShop.Data;
using FurnitureShop.Model;

namespace FurnitureShop.Repositories.ReviewRepo
{
    public interface IReviewRepository
    {
        public Task<PagedReviewModel> GetReviewPaginationAsync(int productId,int page = 1);
        public Task<ReviewModel> GetReviewAsync(int id);
        public Task<int> AddReviewAsync(ReviewModel model);

    }
}
