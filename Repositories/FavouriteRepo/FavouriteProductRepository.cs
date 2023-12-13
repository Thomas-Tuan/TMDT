using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using FurnitureShop.Repositories.FavouriteRepo;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Printing;

namespace FurnitureShop.Repositories.ProductRepo
{
    public class FavouriteProductRepository : IFavouriteProductRepository
    {
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;


        public FavouriteProductRepository(FurnitureDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddFavouriteProductAsync(FavouriteProductModel model)
        {
            var newProduct = _mapper.Map<FavoriteProduct>(model);
            _context.FavoriteProducts!.Add(newProduct);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFavouriteProductAsync(string customerId, int productId)
        {
            var deleteFavoriteProduct = await _context.FavoriteProducts
           .FirstOrDefaultAsync(fp => fp.customerId == customerId && fp.productId == productId);

            if (deleteFavoriteProduct != null)
            {
                _context.FavoriteProducts!.Remove(deleteFavoriteProduct);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<int>> GetFavouriteListProductAsync(string id)
        {
            var favoriteProducts = await _context.FavoriteProducts!.Where(i => i.customerId!.Contains(id)).ToListAsync();
            List<int> newProductList = new List<int>();
            foreach (var item in favoriteProducts)
            {
                var product = await _context.Products!.FirstOrDefaultAsync(i => i.Id == item.productId);

                if (product != null)
                {
                    newProductList.Add(product.Id);
                }
            }
            return newProductList;  
        }

        public async Task<PagedProductModel> GetFavouriteProductPaginationAsync(string id, int page = 1)
        {
            int pageSize = 8;
            var favoriteProducts = await _context.FavoriteProducts!.Where(i => i.customerId!.Contains(id)).ToListAsync();
            List<Product> newProductList = new List<Product>();
            int totalProducts = 0;
            foreach (var item in favoriteProducts)
            {
                var product = await _context.Products!.FirstOrDefaultAsync(i => i.Id == item.productId);

                if (product != null)
                {
                    newProductList.Add(product);
                }
            }
            if (newProductList.Count != 0)
            {
                totalProducts = newProductList.Count;
            }
            var result = PaginatedList<Product>.Create(newProductList, page, pageSize);

            var pagedProductModel = new PagedProductModel
            {
                Products = _mapper.Map<List<ProductModel>>(result),
                TotalCount = totalProducts,
            };
            return pagedProductModel;
        }
    }
}
