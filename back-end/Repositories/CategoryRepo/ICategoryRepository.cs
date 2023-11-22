using FurnitureShop.Model;

namespace FurnitureShop.Repositories.CategoryRepo
{
    public interface ICategoryRepository
    {
        public Task<List<CategoryModel>> GetAllCategoryAsync();
        public Task<CategoryModel> GetCategoryAsync(int id);
        public Task<int> AddCategoryAsync(CategoryModel model);
        public Task DeleteCategoryAsync(int id);
        public Task UpdateCategoryAsync(int id, CategoryModel model);
    }
}
