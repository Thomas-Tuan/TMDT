using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Data
{
    public class Customer
    {
        [Key]
        [ForeignKey("User")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string? customerId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? Image { get; set; }
        public string? Name { get; set; }

        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int Gender { get; set; }
        public int scorePoint { get; set; }

        public virtual ICollection<Order>? Orders { get; set; }
        public ApplicationUser? User { get; set; }
    }
}
