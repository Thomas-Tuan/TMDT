using FurnitureShop.Helper;
using FurnitureShop.Helper.Service;
using FurnitureShop.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendMailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public SendMailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("SendMail")]
        public async Task<IActionResult> SendMail([FromBody] SendEmailModel GetEmail)
        {
            try
            {
                MailRequest mailRequest = new MailRequest();
                mailRequest.ToEmail = GetEmail.Email;
                mailRequest.Subject = "Welcome to Nine-Home";
                var result = await _emailService.GetHtmlContent(GetEmail.Email!);
                if (!string.IsNullOrEmpty(result))
                {
                    mailRequest.Body = result;
                    await _emailService.SendMailAsync(mailRequest);
                    return Ok(new Respone
                    {
                        Message = $"Vui lòng kiểm tra hộp thư và xác nhận thông tin ! ",
                        Status = 204,
                    });
                }
                var errorMessage = new { ErrorMessage = "Không tìm thấy Email này !!" };
                return BadRequest(errorMessage);
            }
            catch (Exception ex)
            {
                var errorMessage = new { ErrorMessage = "Đã xảy ra lỗi không gửi được Email !!" };
                return BadRequest(errorMessage);
            }
        }
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPassModel model)
        {
            var result = await _emailService.ResetPasswordAsync(model);

            if (result.Status == 417)
            {
                var errorObject = new { ErrorMessage = result.Message };
                return BadRequest(errorObject);
            }
            return Ok(result);
        }
        [HttpPost("ConfirmOtp")]
        public async Task<IActionResult> ConfirmOtp([FromBody] ResetPassModel model)
        {
            var result = await _emailService.ConfirmOtpAsync(model);

            if (result.Status == 410)
            {
                var errorObject = new { ErrorMessage = result.Message };
                return BadRequest(errorObject);
            }
            return Ok(result);
        }
    }
}
