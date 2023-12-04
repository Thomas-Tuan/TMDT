using FurnitureShop.Model;

namespace FurnitureShop.Repositories.VoucherRepo
{
    public interface IVoucherRepository
    {
        public Task<List<VoucherModel>> GetAllVoucherAsync();
        public Task<VoucherModel> GetVoucherAsync(int id);
        public Task<int> AddVoucherAsync(VoucherModel model);
        public Task DeleteVoucherAsync(int id);
        public Task UpdateVoucherAsync(int id, VoucherModel model);
        public Task<ApplyVoucherModel> ApplyVoucherAsync(ApplyVoucherModel model);

    }
}
