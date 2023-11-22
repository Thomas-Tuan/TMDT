using FurnitureShop.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Model
{
    public class CustomerModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string? customerId { get; set; }
        public string? Image { get; set; }
        public string? Name { get; set; }

        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int Gender { get; set; }
        public int scorePoint { get; set; }

    }
}
