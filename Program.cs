using CodeMegaPayPal.Services;
using FurnitureShop.Data;
using FurnitureShop.Helper;
using FurnitureShop.Helper.Service;
using FurnitureShop.Repositories.Account;
using FurnitureShop.Repositories.BranchRepo;
using FurnitureShop.Repositories.CategoryRepo;
using FurnitureShop.Repositories.ContactRepo;
using FurnitureShop.Repositories.CustomerRepo;
using FurnitureShop.Repositories.OrderRepo;
using FurnitureShop.Repositories.ProductRepo;
using FurnitureShop.Repositories.ReviewRepo;
using FurnitureShop.Repositories.UserRepo;
using FurnitureShop.Repositories.VoucherRepo;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NuGet.Protocol.Core.Types;
using Swashbuckle.AspNetCore.Filters;
using System.Security.Cryptography;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options => options.AddPolicy("MyCors", policy =>
policy.WithOrigins("*")
.AllowAnyHeader()
.AllowAnyMethod()
.AllowAnyOrigin()
));


//Configure Password
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequiredLength = 5;
    options.Password.RequiredUniqueChars = 1;
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
});
//Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<FurnitureDbContext>().AddDefaultTokenProviders();
//Add Database
builder.Services.AddDbContext<FurnitureDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("FurnitureShop"));
});

builder.Services.AddAutoMapper(typeof(Program));

//Add Repository
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IBranchRepository, BranchRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IVnPayService, VnPayService>();

builder.Services.AddScoped<IPayPalService, PayPalService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ICustomerResponsitory, CustomerResponsitory>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();

builder.Services.AddScoped<IUserResponsitory, UserResponsitory>();
builder.Services.AddScoped<IVoucherRepository, VoucherRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();

builder.Services.AddScoped<IReviewRepository, ReviewRepository>();

//Add EmailSender
builder.Services.Configure<EmailConfiguration>(builder.Configuration.GetSection("EmailSettings"));

//Add Authorize
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
//Add Authentication & JwtBearer
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors("MyCors");

app.MapControllers();

app.Run();
