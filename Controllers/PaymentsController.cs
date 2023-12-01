using CodeMegaPayPal.Services;
using FurnitureShop.Helper.Service;
using FurnitureShop.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OtpNet;

namespace FurnitureShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;
        private readonly IPayPalService _payPalService;

        public PaymentsController(IVnPayService vnPayService, IPayPalService payPalService)
        {
            _vnPayService = vnPayService;
            _payPalService = payPalService;
        }

        [HttpPost]
        [Route("CreatePaymentWithVnPay")]
        public IActionResult CreatePaymentUrlWithVnPay(PaymentInformationModel model)
        {
            var url = _vnPayService.CreatePaymentUrl(model, HttpContext);

            return Ok(url);
        }

        [HttpPost]
        [Route("CreatePaymentWithPaypal")]
        public async Task<IActionResult> CreatePaymentUrlWithPaypal(PaymentInformationModel model)
        {
            var url = await _payPalService.CreatePaymentUrl(model);

            return Ok(url);
        }

    }
}
