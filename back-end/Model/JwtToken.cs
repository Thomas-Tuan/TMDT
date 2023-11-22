namespace FurnitureShop.Model
{
    public class JwtToken
    {
        public string? token {  get; set; }
        public string? customerId { get; set; }
        public string? name { get; set; }
        public DateTime expiration { get; set; }
        public List<string>? Roles {  get; set; }
    }
}
