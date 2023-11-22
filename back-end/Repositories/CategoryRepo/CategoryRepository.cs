using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.EntityFrameworkCore;

namespace FurnitureShop.Repositories.CategoryRepo
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;

        public CategoryRepository(FurnitureDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> AddCategoryAsync(CategoryModel model)
        {
            var newCategory = _mapper.Map<Category>(model);
            _context.Categories!.Add(newCategory);
            await _context.SaveChangesAsync();
            return newCategory.Id;
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var deleteCategory = _context.Categories!.SingleOrDefault(b => b.Id == id);
            if (deleteCategory != null)
            {
                _context.Categories!.Remove(deleteCategory);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<CategoryModel>> GetAllCategoryAsync()
        {
            var Categories = await _context.Categories!.OrderByDescending(c => c.Id).ToListAsync();
            return _mapper.Map<List<CategoryModel>>(Categories);
        }

        public async Task<CategoryModel> GetCategoryAsync(int id)
        {
            var Category = await _context.Categories!.FindAsync(id);
            return _mapper.Map<CategoryModel>(Category);
        }

        public async Task UpdateCategoryAsync(int id, CategoryModel model)
        {
            if (id == model.Id)
            {
                var updateCategory = _mapper.Map<Category>(model);
                _context.Categories!.Update(updateCategory);
                await _context.SaveChangesAsync();
            }
        }
    }
}
