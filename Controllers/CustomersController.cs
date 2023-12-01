using FurnitureShop.Model;
using FurnitureShop.Repositories.Account;
using FurnitureShop.Repositories.CustomerRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerResponsitory customerRepo;

        public CustomersController(ICustomerResponsitory repo)
        {
            customerRepo = repo;
        }
        [HttpGet, Authorize(Roles = "Admin")]
        [Route("GetAll")]
        public async Task<IActionResult> GetAllCustomer()
        {
            try
            {
                return Ok(await customerRepo.GetAllCustomerAsync());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet, AllowAnonymous]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetCustomerById(string id)
        {
            var Customer = await customerRepo.GetCustomerAsync(id);
            return Customer == null ? NotFound() : Ok(Customer);
        }
       
        [HttpPut, AllowAnonymous]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateCustomer(string id, [FromBody] CustomerModel model)
        {
            if (id != model.customerId)
            {
                return NotFound();
            }
            await customerRepo.UpdateCustomerAsync(id, model);
            return Ok();
        }

    }
}
