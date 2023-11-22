using CodeMegaVNPay.Models;
using FurnitureShop.Model;

namespace FurnitureShop.Helper.Service
{
    public class VnPayService : IVnPayService
    {
        private readonly IConfiguration _configuration;

        public VnPayService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CreatePaymentUrl(PaymentInformationModel model, HttpContext context)
        {
            var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(_configuration["TimeZoneId"]!);
            var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);
            var tick = DateTime.Now.Ticks.ToString();
            var pay = new VnPayLibrary();
            var urlCallBack = _configuration["PaymentCallBack:ReturnUrl"];

            pay.AddRequestData("vnp_Version", _configuration["Vnpay:Version"]!);
            pay.AddRequestData("vnp_Command", _configuration["Vnpay:Command"]!);
            pay.AddRequestData("vnp_TmnCode", _configuration["Vnpay:TmnCode"]!);
            pay.AddRequestData("vnp_BankCode", "");
            pay.AddRequestData("vnp_Amount", ((double)model.Amount * 100).ToString());
            pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
            pay.AddRequestData("vnp_CurrCode", _configuration["Vnpay:CurrCode"]!);
            pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
            pay.AddRequestData("vnp_Locale", _configuration["Vnpay:Locale"]!);
            pay.AddRequestData("vnp_OrderInfo",
  $"Don hang {model.orderId} co tong cong la:{model.Amount} ");
            pay.AddRequestData("vnp_OrderType", "other");
            pay.AddRequestData("vnp_ReturnUrl", urlCallBack!);
            pay.AddRequestData("vnp_TxnRef", tick);

            var paymentUrl =
                pay.CreateRequestUrl(_configuration["Vnpay:BaseUrl"]!, _configuration["Vnpay:HashSecret"]!);

            return paymentUrl;
        }

    }
}
