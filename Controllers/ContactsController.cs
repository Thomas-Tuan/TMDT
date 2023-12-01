using FurnitureShop.Model;
using FurnitureShop.Repositories.ContactRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureShop.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository _contactRepo;
        public ContactsController(IContactRepository contactRepo)
        {
            _contactRepo = contactRepo;
        }

        [HttpPost,AllowAnonymous]
        [Route("CreateNew")]
        public async Task<IActionResult> AddNewContact([FromBody] ContactModel model)
        {
            try
            {
                var newContactId = await _contactRepo.AddContactAsync(model);
                var Contact = await _contactRepo.GetContactAsync(newContactId);
                return Contact == null ? NotFound() : Ok(Contact);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetAllContact()
        {
            try
            {
                return Ok(await _contactRepo.GetAllContactAsync());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetContactById(int id)
        {
            var Contact = await _contactRepo.GetContactAsync(id);
            return Contact == null ? NotFound() : Ok(Contact);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteContact([FromRoute] int id)
        {
            await _contactRepo.DeleteContactAsync(id);
            return Ok();
        }
    }
}
