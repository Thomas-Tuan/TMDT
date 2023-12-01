using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.AspNetCore.Authorization;
using FurnitureShop.Repositories.ProductRepo;

namespace FurnitureShop.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepo;

        public ProductsController(IProductRepository repo)
        {
            _productRepo = repo;
        }
        [HttpGet, AllowAnonymous]
        [Route("GetAll")]
        public async Task<IActionResult> GetAllProduct()
        {
            try
            {
                return Ok(await _productRepo.GetAllProductAsync());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet, AllowAnonymous]
        [Route("GetList")]
        public async Task<IActionResult> GetProductsPagination([FromQuery] int page)
        {
            try
            {
                var pagedProductModel = await _productRepo.GetProductPaginationAsync(page);
                return Ok(pagedProductModel);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet, AllowAnonymous]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productRepo.GetProductAsync(id);
            return product == null ? NotFound() : Ok(product);
        }
        [HttpPost, Authorize(Roles = "Admin")]
        [Route("AddNew")]
        public async Task<IActionResult> AddNewProduct(ProductModel model)
        {
            try
            {
                var newProductId = await _productRepo.AddProductAsync(model);
                var product = await _productRepo.GetProductAsync(newProductId);
                return product == null ? NotFound() : Ok(product);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut, Authorize(Roles = "Admin")]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductModel model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }
            await _productRepo.UpdateProductAsync(id, model);
            return Ok();
        }
        [HttpDelete, Authorize(Roles = "Admin")]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            await _productRepo.DeleteProductAsync(id);
            return Ok();
        }
    }
}
