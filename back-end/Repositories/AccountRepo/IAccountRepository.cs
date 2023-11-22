using FurnitureShop.Model;
using Microsoft.AspNetCore.Identity;

namespace FurnitureShop.Repositories.Account
{
    public interface IAccountRepository
    {
        public Task<Respone> SignUpAsync(SignUpModel model);
        public Task<JwtToken> SignInAsync(SignInModel model);

    }
}
