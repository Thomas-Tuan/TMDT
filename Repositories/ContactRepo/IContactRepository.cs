using FurnitureShop.Model;

namespace FurnitureShop.Repositories.ContactRepo
{
    public interface IContactRepository
    {
        public Task<List<ContactModel>> GetAllContactAsync();
        public Task<ContactModel> GetContactAsync(int id);
        public Task DeleteContactAsync(int id);
        public Task<int> AddContactAsync(ContactModel model);
    }
}
