using FurnitureShop.Model;

namespace CodeMegaPayPal.Services;
public interface IPayPalService
{
    Task<string> CreatePaymentUrl(PaymentInformationModel model);
}