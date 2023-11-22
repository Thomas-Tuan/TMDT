using FurnitureShop.Model;

namespace FurnitureShop.Repositories.UserRepo
{
    public interface IUserResponsitory
    {
        public Task<List<UserModel>> GetAllUserAsync();
        public Task<UserModel> GetUserAsync(string id);
        public Task<Respone> AddUserAsync(UserModel model);
        public Task<bool> DeleteUserAsync(string id);
        public Task<Respone> UpdateUserAsync(string id, UserModel model);
        public Task<IEnumerable<string>> GetAllRolesAsync();
    }
}
