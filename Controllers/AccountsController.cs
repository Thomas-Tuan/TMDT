using FurnitureShop.Model;
using FurnitureShop.Repositories.Account;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountRepository accountRepo;

        public AccountsController(IAccountRepository repo)
        {
            accountRepo = repo;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> SignUp([FromBody] SignUpModel model)
        {
            var result = await accountRepo.SignUpAsync(model);
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
        [HttpPost("Login")]
        public async Task<IActionResult> SignIn([FromBody] SignInModel model)
        {
            var result = await accountRepo.SignInAsync(model);

            if (string.IsNullOrEmpty(result.token))
            {
                var errorObject = new { ErrorMessage = "Người dùng hoặc mật khẩu bị sai !!" };
                return BadRequest(errorObject);
            }
            return Ok(result);
        }
    }
}
