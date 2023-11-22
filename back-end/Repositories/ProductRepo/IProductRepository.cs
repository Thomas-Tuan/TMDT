using FurnitureShop.Data;
using FurnitureShop.Model;

namespace FurnitureShop.Repositories.ProductRepo
{
    public interface IProductRepository
    {
        public Task<List<ProductModel>> GetAllProductAsync();
        public Task<PagedProductModel> GetProductPaginationAsync(int page = 1);
        public Task<ProductModel> GetProductAsync(int id);
        public Task<int> AddProductAsync(ProductModel model);
        public Task DeleteProductAsync(int id);
        public Task UpdateProductAsync(int id, ProductModel model);

    }
}
