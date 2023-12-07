using FurnitureShop.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Data
{
    public enum Status
    {
        New = 0,
        Payment = 1,
        Complete = 2,
        Cancel = -1,
    }

    public class Order
    {
        [Key]
        public string? Id { get; set; }
        public DateTime Date { get; set; }
        public Status Status { get; set; }
        [Column(TypeName = "decimal(18,0)")]
        public double Total { get; set; }

        public string? customerId { get; set; }
        public Customer Customer { get; set; }

        public string? cusName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int Gender { get; set; }

        public string? voucherCode {  get; set; }

        public ICollection<OrderDetail>? OrderDetails { get; set; }
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }
    }
}
