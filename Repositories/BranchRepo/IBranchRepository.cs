using FurnitureShop.Model;

namespace FurnitureShop.Repositories.BranchRepo
{
    public interface IBranchRepository
    {
        public Task<List<BranchModel>> GetAllBranchAsync();
        public Task<BranchModel> GetBranchAsync(int id);
        public Task<int> AddBranchAsync(BranchModel model);
        public Task DeleteBranchAsync(int id);
        public Task UpdateBranchAsync(int id, BranchModel model);
    }
}
