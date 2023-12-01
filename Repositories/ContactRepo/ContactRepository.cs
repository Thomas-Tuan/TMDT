using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace FurnitureShop.Repositories.ContactRepo
{
    public class ContactRepository : IContactRepository
    {
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;

        public ContactRepository(FurnitureDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> AddContactAsync(ContactModel model)
        {
            var newContact = _mapper.Map<Contact>(model);
            _context.Contacts!.Add(newContact);
            await _context.SaveChangesAsync();
            return newContact.Id;
        }

        public async Task DeleteContactAsync(int id)
        {
            var deleteContact = _context.Contacts!.SingleOrDefault(b => b.Id == id);
            if (deleteContact != null)
            {
                _context.Contacts!.Remove(deleteContact);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<ContactModel>> GetAllContactAsync()
        {
            var Contact = await _context.Contacts!.OrderByDescending(c => c.Id).ToListAsync();
            return _mapper.Map<List<ContactModel>>(Contact);
        }

        public async Task<ContactModel> GetContactAsync(int id)
        {
            var Contact = await _context.Contacts!.FindAsync(id);
            return _mapper.Map<ContactModel>(Contact);
        }
    }
}
