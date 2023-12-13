using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Data
{
    public class FavoriteProduct
    {
        public string customerId { get; set; }
        public int productId { get; set; }

        public Customer Customer { get; set; }
        public Product Product { get; set; }
    }
}
