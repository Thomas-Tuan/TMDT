using FurnitureShop.Data;


namespace FurnitureShop.Model
{
    public class OrderEditModel
    {
        public string? Id { get; set; }
        public DateTime? Date { get; set; }
        public Status? Status { get; set; }

        public double? Total { get; set; }
        public string? customerId { get; set; }
        public string? voucherId { get; set; }

        public string? cusName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int? Gender { get; set; }

        public List<OrderDetailModel>? orderDetails { get; set; }

    }
}
