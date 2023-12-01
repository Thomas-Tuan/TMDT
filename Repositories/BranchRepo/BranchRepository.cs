using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.EntityFrameworkCore;

namespace FurnitureShop.Repositories.BranchRepo
{
    public class BranchRepository : IBranchRepository
    {
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;

        public BranchRepository(FurnitureDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> AddBranchAsync(BranchModel model)
        {
            var newBranch = _mapper.Map<Branch>(model);
            _context.Branches!.Add(newBranch);
            await _context.SaveChangesAsync();
            return newBranch.Id;
        }

        public async Task DeleteBranchAsync(int id)
        {
            var deleteBranch = _context.Branches!.SingleOrDefault(b => b.Id == id);
            if (deleteBranch != null)
            {
                _context.Branches!.Remove(deleteBranch);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<BranchModel>> GetAllBranchAsync()
        {
            var Branches = await _context.Branches!.OrderByDescending(c=>c.Id).ToListAsync();
            return _mapper.Map<List<BranchModel>>(Branches);
        }

        public async Task<BranchModel> GetBranchAsync(int id)
        {
            var Branch = await _context.Branches!.FindAsync(id);
            return _mapper.Map<BranchModel>(Branch);
        }

        public async Task UpdateBranchAsync(int id, BranchModel model)
        {
            if (id == model.Id)
            {
                var updateBranch = _mapper.Map<Branch>(model);
                _context.Branches!.Update(updateBranch);
                await _context.SaveChangesAsync();
            }
        }
    }
}
