using AutoMapper;
using FurnitureShop.Data;
using FurnitureShop.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FurnitureShop.Repositories.UserRepo
{
    public class UserResponsitory : IUserResponsitory
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly FurnitureDbContext _context;
        private readonly IMapper _mapper;

        public UserResponsitory(UserManager<ApplicationUser> userManager, IConfiguration configuration
           , RoleManager<IdentityRole> roleManager, FurnitureDbContext context, IMapper mapper)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
            _mapper = mapper;
            _context = context;
        }

        public async Task<Respone> AddUserAsync(UserModel model)
        {
            var userEmailExists = await userManager.FindByEmailAsync(model.Email);
            var userNameExists = await userManager.FindByNameAsync(model.UserName);
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
                UserName = model.UserName,
                SecurityStamp = Guid.NewGuid().ToString(),
                isLock = model.isLock,
            };
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));
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

                if (model.Role == UserRoles.User)
                {
                    var userId = user.Id;
                    var newCustomerModel = new CustomerModel
                    {
                        customerId = userId,
                        Name = model.UserName,
                        Email = model.Email,
                    };
                    var newCustomer = _mapper.Map<Customer>(newCustomerModel);
                    _context.Customers!.Add(newCustomer);
                    await _context.SaveChangesAsync();
                }

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

        public async Task<bool> DeleteUserAsync(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            var result = await userManager.DeleteAsync(user);

            return result.Succeeded;
        }

        public async Task<string> GetUserRoleAsync(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);

            if (user != null)
            {
                var roles = await userManager.GetRolesAsync(user);
                return roles.FirstOrDefault()!;
            }

            return "No Roles";
        }


        public async Task<List<UserModel>> GetAllUserAsync()
        {
            var users = await userManager.Users.ToListAsync();
            var userModels = _mapper.Map<List<UserModel>>(users);
            foreach (var userModel in userModels)
            {
                userModel.Role = await GetUserRoleAsync(userModel.Id!);
            }
            return userModels;
        }

        public async Task<UserModel> GetUserAsync(string userId)
        {
            var result = await userManager.FindByIdAsync(userId);
            var getRole = await GetUserRoleAsync(userId);
            if (result != null)
            {
                return new UserModel
                {
                    Id = result.Id,
                    UserName = result.UserName,
                    Email = result.Email,
                    isLock = result.isLock,
                    Role = getRole,
                };
            }
            return new UserModel
            {
                Id = "",
                UserName = "",
                Email = "",
                isLock = false,
            };
        }

        public async Task<Respone> UpdateUserAsync(string userId, UserModel model)
        {
            var user = await userManager.FindByIdAsync(userId);
            user.isLock = model.isLock;
            user.UserName = model.UserName;
            user.Email = model.Email;

            if (!string.IsNullOrEmpty(model.Password))
            {
                user.PasswordHash = userManager.PasswordHasher.HashPassword(user, model.Password);
            }
            var currentRoles = await userManager.GetRolesAsync(user);
            await userManager.RemoveFromRolesAsync(user, currentRoles.ToArray());
            await userManager.AddToRoleAsync(user, model.Role);
            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return new Respone
                {
                    Message = "User have updated !",
                    Status = 204,
                };
            }
            return new Respone
            {
                Message = "Error in update user !",
                Status = 417,
            };
        }
        public async Task<IEnumerable<string>> GetAllRolesAsync()
        {
            var roles = await roleManager.Roles.Select(r => r.Name).ToListAsync();
            return roles;
        }
    }
}
