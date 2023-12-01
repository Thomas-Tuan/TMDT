using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Build.Evaluation;
using Microsoft.EntityFrameworkCore;

namespace FurnitureShop.Repositories.OrderRepo
{
    public class OrderRepository : IOrderRepository
    {
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;

        public OrderRepository(FurnitureDbContext context, IMapper mapper)
        {
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
                catch(Exception ex)
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

        public async Task<OrderEditModel> GetOrderAsync(string id)
        {
            var order = await _context.Orders!.FindAsync(id);
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
            var Order = await _context.Orders!.Where(i=>i.customerId!.Contains(id)).OrderByDescending(c => c.Date).ToListAsync();
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
