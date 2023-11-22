using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Data
{
    public class ApplicationUser:IdentityUser
    {
        public bool isLock { get; set; } = false;
        public virtual Customer? Customer { get; set; }
    }
}
 