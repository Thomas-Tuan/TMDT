using FurnitureShop.Model;

namespace FurnitureShop.Helper.Service
{
    public interface IEmailService
    {
        Task SendMailAsync(MailRequest request);
        Task<string> GetHtmlContent(string email);

        public Task<Respone> ResetPasswordAsync(ResetPassModel model);
        public Task<Respone> ConfirmOtpAsync(ResetPassModel model);
    }
}
