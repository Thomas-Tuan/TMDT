using FurnitureShop.Data;
using FurnitureShop.Model;

namespace FurnitureShop.Repositories.FavouriteRepo
{
    public interface IFavouriteProductRepository
    {
        public Task<PagedProductModel> GetFavouriteProductPaginationAsync(string id,int page = 1 );
        public Task AddFavouriteProductAsync(FavouriteProductModel model);
        public Task DeleteFavouriteProductAsync(string customerId, int productId);
        public Task<List<int>> GetFavouriteListProductAsync(string Id);
    }
}
