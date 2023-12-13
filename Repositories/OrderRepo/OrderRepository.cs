using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.Build.Evaluation;
using Microsoft.EntityFrameworkCore;

namespace FurnitureShop.Repositories.OrderRepo
{
    public class OrderRepository : IOrderRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;

        public OrderRepository(FurnitureDbContext context, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
        }

        public async Task<string> AddOrderAsync(OrderModel model)
        {

            var newOrder = _mapper.Map<Order>(model);
            _context.Orders!.Add(newOrder);
            await _context.SaveChangesAsync();

            foreach (var product in model.Products!)
            {
                var OrderDetailModel = new OrderDetailModel
                {
                    Quantity = product.totalRequestQuantity,
                    productPrice = product.Price,
                    productID = product.Id,
                    productName = product.Name,
                    Image = product.imgMain,
                    orderId = newOrder.Id
                };
                var newOrderDetail = _mapper.Map<OrderDetail>(OrderDetailModel);
                _context.OrderDetails!.Add(newOrderDetail);
                var existingProduct = await _context.Products!.FindAsync(product.Id);
                if (existingProduct != null)
                {
                    if (product.totalRequestQuantity > existingProduct.Quantity)
                    {
                        return "Error";
                    }
                    existingProduct.Quantity -= product.totalRequestQuantity;
                }
                await _context.SaveChangesAsync();
            }
            return newOrder.Id!;
        }

        public async Task DeleteOrderAsync(string id)
        {
            var deleteOrder = _context.Orders!.SingleOrDefault(b => b.Id == id);
            if (deleteOrder != null)
            {
                try
                {
                    _context.Orders!.Remove(deleteOrder);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }

        public async Task<List<OrderModel>> GetAllOrderAsync()
        {
            var Order = await _context.Orders!.OrderByDescending(c => c.Date).ToListAsync();
            return _mapper.Map<List<OrderModel>>(Order);
        }

        public async Task<AllStatisticsModel> GetAllStatistics()
        {
            var totalOrderRequest = await _context.Orders!.CountAsync(c => (int)c.Status == 0);
            var totalOrderPayment = await _context.Orders!.CountAsync(c => (int)c.Status == 1);
            var totalOrderCompleted = await _context.Orders!.CountAsync(c => (int)c.Status == 2);
            var totalOrderCanceled = await _context.Orders!.CountAsync(c => (int)c.Status == -1);

            var totalOrder = await _context.Orders!.CountAsync();
            var totalProduct = await _context.Products!.CountAsync();
            var totalUser = await _userManager.Users.CountAsync();
            var totalVenue = await _context.Orders!
                .Where(c => (int)c.Status == 1 || (int)c.Status == 2).SumAsync(c => c.Total);

            var favoriteProducts = await _context.FavoriteProducts!.ToListAsync();
            var groupedProductLikes = favoriteProducts
                .GroupBy(item => item.productId)
                .Select(group => new ProductLike
                {
                    Name = _context.Products!.FirstOrDefault(p => p.Id == group.Key)?.Name,
                    totalCount = group.Count(),
                }).ToList();
            var topProductLikes = groupedProductLikes
                .OrderByDescending(item => item.totalCount).Take(5).ToList();

            return new AllStatisticsModel()
            {
                TotalCanceled = totalOrderCanceled,
                TotalOrderRequest = totalOrderRequest,
                TotalCompleted = totalOrderCompleted,
                TotalPayment = totalOrderPayment,
                TotalOrder = totalOrder,
                TotalProduct = totalProduct,
                TotalUser = totalUser,
                TotalVenue = totalVenue,
                productLike = topProductLikes,
            };
        }

        public async Task<OrderEditModel> GetOrderAsync(string id)
        {
            var order = await _context.Orders!.FindAsync(id);
            if (order == null)
            {
                return new OrderEditModel
                {
                    Id = null,
                };
            }
            var getOrderDetail = _context.OrderDetails!.Where(b => b.orderId == order!.Id).ToList();
            var newOrderDetail = _mapper.Map<List<OrderDetailModel>>(getOrderDetail);

            OrderEditModel orderEditModel = new OrderEditModel
            {
                Id = order?.Id,
                cusName = order?.cusName,
                Email = order?.Email,
                Phone = order?.Phone,
                Gender = order?.Gender,
                Date = order?.Date,
                Status = order?.Status,
                customerId = order?.customerId,
                Total = order?.Total,
                orderDetails = newOrderDetail,
            };
            return orderEditModel;
        }

        public async Task<List<OrderModel>> GetUserOrderAsync(string id)
        {
            var Order = await _context.Orders!.Where(i => i.customerId!.Contains(id)).OrderByDescending(c => c.Date).ToListAsync();
            return _mapper.Map<List<OrderModel>>(Order);
        }

        public async Task UpdateOrderAsync(string id, OrderModel model)
        {
            if (id == model.Id)
            {
                var updateOrder = await _context.Orders!.FindAsync(id);
                updateOrder!.Status = model.Status;
                _context.Orders!.Update(updateOrder);
                await _context.SaveChangesAsync();
            }
        }
    }
}
