using FurnitureShop.Model;

namespace FurnitureShop.Repositories.CustomerRepo
{
    public interface ICustomerResponsitory
    {
        public Task<List<CustomerModel>> GetAllCustomerAsync();
        public Task<CustomerModel> GetCustomerAsync(string id);
        public Task UpdateCustomerAsync(string id, CustomerModel model);
    }
}
