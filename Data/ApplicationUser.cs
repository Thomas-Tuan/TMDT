using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureShop.Data
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime CreatedDate { get; set; }
        public bool isLock { get; set; } = false;
        public string? OTP {  get; set; }
        public virtual Customer? Customer { get; set; }
    }
}
