using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Printing;

namespace FurnitureShop.Repositories.ReviewRepo
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;


        public ReviewRepository(FurnitureDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> AddReviewAsync(ReviewModel model)
        {
            var newReview = _mapper.Map<Review>(model);
            _context.Reviews!.Add(newReview);
            await _context.SaveChangesAsync();
            return newReview.Id;
        }
       
        public async Task<PagedReviewModel> GetReviewPaginationAsync(int productId, int page)
        {
            int pageSize = 3;
            var Reviews = await _context.Reviews!.Where(c=>c.productId== productId).OrderByDescending(i=>i.Id).ToListAsync();
            var totalReviews = Reviews.Count;
            double totalRating = _context.Reviews!.Where(c => c.productId == productId).Sum(r => r.rateValue);
            double averageRating = Math.Round(totalRating / totalReviews, 1);
          
            var result = PaginatedList<Review>.Create(Reviews, page, pageSize);

            var pagedReviewModel = new PagedReviewModel
            {
                Reviews = _mapper.Map<List<ReviewModel>>(result),
                TotalCount = totalReviews,
                AverageRating= averageRating,
            };
            return pagedReviewModel;
        }

        public async Task<ReviewModel> GetReviewAsync(int id)
        {
            var Review = await _context.Reviews!.FindAsync(id);
            return _mapper.Map<ReviewModel>(Review);
        }

    }
}
