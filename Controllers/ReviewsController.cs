using FurnitureShop.Model;
using FurnitureShop.Repositories.ReviewRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepo;

        public ReviewsController(IReviewRepository repo)
        {
            _reviewRepo = repo;
        }

        [HttpGet, AllowAnonymous]
        [Route("GetList")]
        public async Task<IActionResult> GetReviewsPagination([FromQuery] int productId, [FromQuery] int page)
        {
            try
            {
                var pagedReviewModel = await _reviewRepo.GetReviewPaginationAsync(productId, page);
                if(pagedReviewModel.Reviews.Count == 0)
                {
                    pagedReviewModel.AverageRating = 0;
                    return Ok(pagedReviewModel);
                }
                return Ok(pagedReviewModel);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet, AllowAnonymous]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetReviewById(int id)
        {
            var Review = await _reviewRepo.GetReviewAsync(id);
            return Review == null ? NotFound() : Ok(Review);
        }
        [HttpPost]
        [Route("AddNew")]
        public async Task<IActionResult> AddNewReview(ReviewModel model)
        {
            try
            {
                var newReviewId = await _reviewRepo.AddReviewAsync(model);
                var Review = await _reviewRepo.GetReviewAsync(newReviewId);
                return Review == null ? NotFound() : Ok(Review);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
