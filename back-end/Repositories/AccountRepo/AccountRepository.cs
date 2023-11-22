using AutoMapper;
using Azure;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;


namespace FurnitureShop.Repositories.Account
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;

        public AccountRepository(UserManager<ApplicationUser> userManager, IConfiguration configuration
           , RoleManager<IdentityRole> roleManager, FurnitureDbContext context, IMapper mapper)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
            _mapper = mapper;
            _context = context;
        }

        public async Task<JwtToken> SignInAsync(SignInModel model)
        {
            var user = await userManager.FindByNameAsync(model.Name);


            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);
                return new JwtToken
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo.ToLocalTime(),
                    name = user.UserName,
                    customerId = user.Id,
                    Roles = userRoles.ToList(),
                };
            }
            return new JwtToken
            {
                token = null,
                expiration = DateTime.MinValue
            };
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]!));

            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha512Signature)
                );

            return token;
        }

        public async Task<Respone> SignUpAsync(SignUpModel model)
        {
            var userEmailExists = await userManager.FindByEmailAsync(model.Email);
            var userNameExists = await userManager.FindByNameAsync(model.Name);
            if (userEmailExists != null)
            {
                return new Respone
                {
                    Message = "Email đã có người dùng !!",
                    Status = 409,
                };
            }

            if (userNameExists != null)
            {
                return new Respone
                {
                    Message = "Tên đã có người dùng !!",
                    Status = 409,
                };
            }

            var user = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Name,
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            if (!await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));
            }
            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            }
            var result = await userManager.CreateAsync(user, model.Password);
            if (model.Role == UserRoles.User)
            {
                await userManager.AddToRoleAsync(user, UserRoles.User);
            }
            if (model.Role == UserRoles.Admin)
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }

            if (result.Succeeded)
            {
                var userId = user.Id;
                var newCustomerModel = new CustomerModel
                {
                    customerId = userId,
                    Name = model.Name,
                    Email = model.Email,
                };
                var newCustomer = _mapper.Map<Customer>(newCustomerModel);
                _context.Customers!.Add(newCustomer);
                await _context.SaveChangesAsync();

                return new Respone
                {
                    Message = "User have created !",
                    Status = 201,
                };
            }
            return new Respone
            {
                Message = "Error in create user !",
                Status = 417,
            };
        }
    }
}
