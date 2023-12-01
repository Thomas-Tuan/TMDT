using FurnitureShop.Model;
using FurnitureShop.Repositories.CategoryRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureShop.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoriesController(ICategoryRepository repo)
        {
            _categoryRepo = repo;
        }
        [HttpGet,AllowAnonymous]
        [Route("GetList")]
        public async Task<IActionResult> GetAllCategory()
        {
            try
            {
                return Ok(await _categoryRepo.GetAllCategoryAsync());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var Category = await _categoryRepo.GetCategoryAsync(id);
            return Category == null ? NotFound() : Ok(Category);
        }
        [HttpPost]
        [Route("AddNew")]
        public async Task<IActionResult> AddNewCategory(CategoryModel model)
        {
            try
            {
                var newCategoryId = await _categoryRepo.AddCategoryAsync(model);
                var Category = await _categoryRepo.GetCategoryAsync(newCategoryId);
                return Category == null ? NotFound() : Ok(Category);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryModel model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }
            await _categoryRepo.UpdateCategoryAsync(id, model);
            return Ok();
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            await _categoryRepo.DeleteCategoryAsync(id);
            return Ok();
        }
    }
}
