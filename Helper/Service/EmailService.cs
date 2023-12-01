using FurnitureShop.Data;
using FurnitureShop.Model;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MimeKit;
using OtpNet;

namespace FurnitureShop.Helper.Service
{
    public class EmailService : IEmailService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly EmailConfiguration _emailService;

        public EmailService(IOptions<EmailConfiguration> options,
            UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _emailService = options.Value;
        }

        public async Task<string> GetHtmlContent(string email)
        {
            var result = await _userManager.FindByEmailAsync(email);
            if (result != null)
            {
                var secretKey = KeyGeneration.GenerateRandomKey(20);
                var totp = new Totp(secretKey);
                var otp = totp.ComputeTotp();
                result.OTP = otp;
                await _userManager.UpdateAsync(result);

                string response = $"<h1>\"Mã OTP là {otp}\"</h1>";
                return response;
            }
            return "";
        }

        public async Task SendMailAsync(MailRequest request)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_emailService.Email);
            email.To.Add(MailboxAddress.Parse(request.ToEmail));
            email.Subject = request.Subject;

            var builder = new BodyBuilder();
            builder.HtmlBody = request.Body;
            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(_emailService.Host, _emailService.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_emailService.Email, _emailService.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
        public async Task<Respone> ResetPasswordAsync(ResetPassModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, model.Password);
                user.OTP = null;
                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return new Respone
                    {
                        Message = "Cập nhật mật khẩu thành công !",
                        Status = 204,
                    };
                }
                return new Respone
                {
                    Message = "Lỗi khi đổi mật khẩu !",
                    Status = 417,
                };
            }
            return new Respone
            {
                Message = "Lỗi xác thực Otp !",
                Status = 417,
            };
        }

        public async Task<Respone> ConfirmOtpAsync(ResetPassModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                if (user.OTP!.Contains(model.Otp!.Trim()))
                {
                    return new Respone
                    {
                        Message = "Xác thực thành công !",
                        Status = 205,
                    };
                }

                return new Respone
                {
                    Message = "Mã Otp không chính xác  !",
                    Status = 410,
                };
            }
            return new Respone
            {
                Message = "Lỗi xác thực Otp !",
                Status = 410,
            };
        }
    }
}
