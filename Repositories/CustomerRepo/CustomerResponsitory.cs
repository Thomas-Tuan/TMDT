using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FurnitureShop.Repositories.CustomerRepo
{
    public class CustomerResponsitory : ICustomerResponsitory
    {

        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;

        public CustomerResponsitory(FurnitureDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<CustomerModel>> GetAllCustomerAsync()
        {
            var Customers = await _context.Customers!.OrderByDescending(c => c.CreatedDate).ToListAsync();
            return _mapper.Map<List<CustomerModel>>(Customers);
        }

        public async Task<CustomerModel> GetCustomerAsync(string id)
        {
            var Customer = await _context.Customers!.FindAsync(id);
            return _mapper.Map<CustomerModel>(Customer);
        }

        public async Task UpdateCustomerAsync(string id, CustomerModel model)
        {
            if (id == model.customerId)
            {
                var updateCustomer = _mapper.Map<Customer>(model);
                _context.Customers!.Update(updateCustomer);
                await _context.SaveChangesAsync();
            }
        }

    }
}