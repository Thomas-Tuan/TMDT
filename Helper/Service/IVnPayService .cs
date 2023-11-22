using CodeMegaVNPay.Models;
using FurnitureShop.Model;

namespace FurnitureShop.Helper.Service
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(PaymentInformationModel model, HttpContext context);
      }
}
