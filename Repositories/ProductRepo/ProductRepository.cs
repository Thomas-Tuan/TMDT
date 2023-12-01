using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Printing;

namespace FurnitureShop.Repositories.ProductRepo
{
    public class ProductRepository : IProductRepository
    {
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;


        public ProductRepository(FurnitureDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> AddProductAsync(ProductModel model)
        {
            var newProduct = _mapper.Map<Product>(model);
            _context.Products!.Add(newProduct);
            await _context.SaveChangesAsync();
            return newProduct.Id;
        }

        public async Task DeleteProductAsync(int id)
        {
            var deleteProduct = _context.Products!.SingleOrDefault(b => b.Id == id);
            if (deleteProduct != null)
            {
                _context.Products!.Remove(deleteProduct);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<ProductModel>> GetAllProductAsync()
        {
            var products = await _context.Products!.OrderByDescending(c => c.Id).ToListAsync();
            return _mapper.Map<List<ProductModel>>(products);
        }

        public async Task<PagedProductModel> GetProductPaginationAsync(int page)
        {
            int pageSize = 10;
            var products = await _context.Products!.ToListAsync();
            var totalProducts = products.Count;
            double maxPrice = products.Max(product => product.Price);
            double minPrice = products.Min(product => product.Price);

            var result = PaginatedList<Product>.Create(products, page, pageSize);

            var pagedProductModel = new PagedProductModel
            {
                Products = _mapper.Map<List<ProductModel>>(result),
                TotalCount = totalProducts,
                MaxPrice = maxPrice,
                MinPrice = minPrice,
            };
            return pagedProductModel;
        }

        public async Task<ProductModel> GetProductAsync(int id)
        {
            var product = await _context.Products!.FindAsync(id);
            return _mapper.Map<ProductModel>(product);
        }

        public async Task UpdateProductAsync(int id, ProductModel model)
        {
            if (id == model.Id)
            {
                var updateProduct = _mapper.Map<Product>(model);
                _context.Products!.Update(updateProduct);
                await _context.SaveChangesAsync();
            }
        }
    }
}
