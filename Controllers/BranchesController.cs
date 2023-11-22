using FurnitureShop.Model;
using FurnitureShop.Repositories.BranchRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace FurnitureShop.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/Branches")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        private readonly IBranchRepository _BranchRepo;

        public BranchesController(IBranchRepository repo)
        {
            _BranchRepo = repo;
        }
        [HttpGet,AllowAnonymous]
        [Route("GetList")]
        public async Task<IActionResult> GetAllBranchs()
        {
            try
            {
                return Ok(await _BranchRepo.GetAllBranchAsync());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetBranchById(int id)
        {
            var Branch = await _BranchRepo.GetBranchAsync(id);
            return Branch == null ? NotFound() : Ok(Branch);
        }
        [HttpPost]
        [Route("AddNew")]
        public async Task<IActionResult> AddNewBranch(BranchModel model)
        {
            try
            {
                var newBranchId = await _BranchRepo.AddBranchAsync(model);
                var Branch = await _BranchRepo.GetBranchAsync(newBranchId);
                return Branch == null ? NotFound() : Ok(Branch);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateBranch(int id, [FromBody] BranchModel model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }
            await _BranchRepo.UpdateBranchAsync(id, model);
            return Ok();
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteBranch([FromRoute] int id)
        {
            await _BranchRepo.DeleteBranchAsync(id);
            return Ok();
        }
    }
}
