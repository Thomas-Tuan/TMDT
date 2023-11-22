using FurnitureShop.Model;
using FurnitureShop.Repositories.UserRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;

namespace FurnitureShop.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserResponsitory _userRepo;

        public UsersController(IUserResponsitory repo)
        {
            _userRepo = repo;
        }

        [HttpGet("GetAllRoles")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _userRepo.GetAllRolesAsync();
            return Ok(roles);
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                return Ok(await _userRepo.GetAllUserAsync());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var User = await _userRepo.GetUserAsync(id);
            return User == null ? NotFound() : Ok(User);
        }
        [HttpPost]
        [Route("AddNew")]
        public async Task<IActionResult> AddNewUser(UserModel model)
        {
            try
            {
                var result = await _userRepo.AddUserAsync(model);
                if (result.Status == 201)
                {
                    return Ok(result);
                }
                else if (result.Status == 409)
                {
                    var errorObject = new { ErrorMessage = result.Message };
                    return BadRequest(errorObject);
                }
                var errorMessage = new { ErrorMessage = "Lỗi khi đăng ký người dùng !!" };
                return BadRequest(errorMessage);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UserModel model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }
            var result = await _userRepo.UpdateUserAsync(id, model);
            if (result.Status == 204)
            {
                var successMessage = new { Message = "Cập nhật người dùng thành công !!" };
                return Ok();
            }
                    
            var errorMessage = new { ErrorMessage = "Tên tài khoản đã được xài !!" };
            return BadRequest(errorMessage);
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string id)
        {
            await _userRepo.DeleteUserAsync(id);
            return Ok();
        }
    }
}
