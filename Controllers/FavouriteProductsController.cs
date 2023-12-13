using FurnitureShop.Model;
using FurnitureShop.Repositories.FavouriteRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouriteProductsController : ControllerBase
    {
        private readonly IFavouriteProductRepository _favouriteProductRepo;

        public FavouriteProductsController(IFavouriteProductRepository repo)
        {
            _favouriteProductRepo = repo;
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetFavouriteProductPaginationAsync([FromQuery] string customerId, [FromQuery] int page)
        {
            try
            {
                var pagedProductModel = await _favouriteProductRepo.GetFavouriteProductPaginationAsync(customerId, page);
                return Ok(pagedProductModel);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetById/{customerId}")]
        public async Task<IActionResult> GetFavouriteProductPaginationAsync(string customerId)
        {
            try
            {
                var pagedProductModel = await _favouriteProductRepo.GetFavouriteListProductAsync(customerId);
                return Ok(pagedProductModel);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("AddNew")]
        public async Task<IActionResult> AddNewFavouriteProduct(FavouriteProductModel model)
        {
            try
            {
                await _favouriteProductRepo.AddFavouriteProductAsync(model);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> DeleteFavouriteProduct(string customerId,int productId)
        {
            try
            {
                await _favouriteProductRepo.DeleteFavouriteProductAsync(customerId, productId);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        
        }
    }
}
