using FurnitureShop.Model;
using FurnitureShop.Repositories.VoucherRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureShop.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class VouchersController : ControllerBase
    {
        private readonly IVoucherRepository _voucherRepo;

        public VouchersController(IVoucherRepository repo)
        {
            _voucherRepo = repo;
        }
        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetAllVoucher()
        {
            try
            {
                return Ok(await _voucherRepo.GetAllVoucherAsync());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetVoucherById(int id)
        {
            var Voucher = await _voucherRepo.GetVoucherAsync(id);
            return Voucher == null ? NotFound() : Ok(Voucher);
        }
        [HttpPost]
        [Route("AddNew")]
        public async Task<IActionResult> AddNewVoucher(VoucherModel model)
        {
            try
            {
                var newVoucherId = await _voucherRepo.AddVoucherAsync(model);
                var Voucher = await _voucherRepo.GetVoucherAsync(newVoucherId);
                return Voucher == null ? NotFound() : Ok(Voucher);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateVoucher(int id, [FromBody] VoucherModel model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }
            await _voucherRepo.UpdateVoucherAsync(id, model);
            return Ok();
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteVoucher([FromRoute] int id)
        {
            await _voucherRepo.DeleteVoucherAsync(id);
            return Ok();
        }
        [HttpPost, AllowAnonymous]
        [Route("ApplyVoucher")]
        public async Task<IActionResult> ApplyVoucher(ApplyVoucherModel model)
        {
            var result = await _voucherRepo.ApplyVoucherAsync(model);
            if (result.Code != null)
            {
                return Ok(result);
            }
            var errorMessage = new { ErrorMessage = "Mã khuyến mãi bị sai !!" };
            return BadRequest(errorMessage);
        }
    }
}
