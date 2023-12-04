using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;

namespace FurnitureShop.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Product, ProductModel>().ReverseMap();
            CreateMap<Category, CategoryModel>().ReverseMap();
            CreateMap<Order, OrderModel>().ReverseMap();
            CreateMap<OrderDetail, OrderDetailModel>().ReverseMap();

            CreateMap<ApplicationUser, UserModel>();
            CreateMap<Voucher, VoucherModel>().ReverseMap();
            CreateMap<Branch, BranchModel>().ReverseMap();
            CreateMap<Customer, CustomerModel>().ReverseMap();

            CreateMap<Contact, ContactModel>().ReverseMap();
            CreateMap<Review, ReviewModel>().ReverseMap();
        }
    }
}
