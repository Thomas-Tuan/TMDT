using FurnitureShop.Helper.Service;
using FurnitureShop.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;

        public PaymentsController(IVnPayService vnPayService)
        {
            _vnPayService = vnPayService;
        }

        [HttpPost]
        [Route("CreatePayment")]
        public IActionResult CreatePaymentUrl(PaymentInformationModel model)
        {
            var url = _vnPayService.CreatePaymentUrl(model, HttpContext);

            return Ok(url);
        }
    }
}
