﻿using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.EntityFrameworkCore;

namespace FurnitureShop.Repositories.VoucherRepo
{
    public class VoucherRepository : IVoucherRepository
    {
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;

        public VoucherRepository(FurnitureDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> AddVoucherAsync(VoucherModel model)
        {
            var newVoucher = _mapper.Map<Voucher>(model);
            _context.Vouchers!.Add(newVoucher);
            await _context.SaveChangesAsync();
            return newVoucher.Id!;
        }

        public async Task DeleteVoucherAsync(int id)
        {
            var deleteVoucher = _context.Vouchers!.SingleOrDefault(b => b.Id == id);
            if (deleteVoucher != null)
            {
                _context.Vouchers!.Remove(deleteVoucher);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<VoucherModel>> GetAllVoucherAsync()
        {
            var Vouchers = await _context.Vouchers!.ToListAsync();
            return _mapper.Map<List<VoucherModel>>(Vouchers);
        }

        public async Task<VoucherModel> GetVoucherAsync(int id)
        {
            var Voucher = await _context.Vouchers!.FindAsync(id);
            return _mapper.Map<VoucherModel>(Voucher);
        }

        public async Task UpdateVoucherAsync(int id, VoucherModel model)
        {
            if (id == model.Id)
            {
                var updateVoucher = _mapper.Map<Voucher>(model);
                _context.Vouchers!.Update(updateVoucher);
                await _context.SaveChangesAsync();
            }
        }
    }
}
