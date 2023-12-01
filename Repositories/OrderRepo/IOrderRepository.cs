using FurnitureShop.Model;

namespace FurnitureShop.Repositories.OrderRepo
{
    public interface IOrderRepository
    {
        public Task<List<OrderModel>> GetUserOrderAsync(string id);
        public Task<List<OrderModel>> GetAllOrderAsync();
        public Task<OrderEditModel> GetOrderAsync(string id);
        public Task<string> AddOrderAsync(OrderModel model);
        public Task DeleteOrderAsync(string id);
        public Task UpdateOrderAsync(string id, OrderModel model);
    }
}
