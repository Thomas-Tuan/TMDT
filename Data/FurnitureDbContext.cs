using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FurnitureShop.Data
{
    public class FurnitureDbContext : IdentityDbContext<ApplicationUser>
    {
        public FurnitureDbContext(DbContextOptions<FurnitureDbContext> opt) : base(opt)
        {

        }
        #region DbSet
        public DbSet<Product>? Products { get; set; }
        public DbSet<Category>? Categories { get; set; }
        public DbSet<Branch>? Branches { get; set; }
        public DbSet<Order>? Orders { get; set; }
        public DbSet<OrderDetail>? OrderDetails { get; set; }

        public DbSet<Voucher>? Vouchers { get; set; }
        public DbSet<Review>? Reviews { get; set; }
        public DbSet<Customer>? Customers { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Branch)
                .WithMany(b => b!.Products)
                .HasForeignKey(p => p.branchId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c!.Products)
                .HasForeignKey(p => p.categoryId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Order>().Property(o => o.Id)
                .HasDefaultValueSql("('OR-' + FORMAT(GETDATE(), 'yyyyMMddHHmmss'))")
                .ValueGeneratedOnAdd();

        }
    }
}
