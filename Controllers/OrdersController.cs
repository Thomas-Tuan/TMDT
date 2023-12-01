using FurnitureShop.Model;
using FurnitureShop.Repositories.OrderRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureShop.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepo;

        public OrdersController(IOrderRepository repo)
        {
            _orderRepo = repo;
        }
        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetAllOrder()
        {
            try
            {
                return Ok(await _orderRepo.GetAllOrderAsync());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet, AllowAnonymous]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetOrderById(string id)
        {
            var Order = await _orderRepo.GetOrderAsync(id);
            return Order == null ? NotFound() : Ok(Order);
        }

        [HttpPut, AllowAnonymous]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateOrder(string id, [FromBody] OrderModel model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }
            await _orderRepo.UpdateOrderAsync(id, model);
            return Ok();
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] string id)
        {
            await _orderRepo.DeleteOrderAsync(id);
            return Ok();
        }

        [HttpPost, AllowAnonymous]
        [Route("CreateOrder")]
        public async Task<IActionResult> AddOrder([FromBody] OrderModel model)
        {
            try
            {
                var newOrderId = await _orderRepo.AddOrderAsync(model);
                var Order = await _orderRepo.GetOrderAsync(newOrderId);
                return Order == null ? NotFound() : Ok(Order);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet, AllowAnonymous]
        [Route("GetUserOrder/{id}")]
        public async Task<IActionResult> GetUserOrder(string id)
        {
            try
            {
                return Ok(await _orderRepo.GetUserOrderAsync(id));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
