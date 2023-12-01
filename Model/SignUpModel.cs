﻿using System.ComponentModel.DataAnnotations;

namespace FurnitureShop.Model
{
    public class SignUpModel
    {
        public string Name { get; set; } = null!;
        [EmailAddress]
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string confirmPass { get; set; } = null!;
        public string Role { get; set; } = null!;

        public string cusName { get; set; } = null!;
        public string Phone { get; set; } = null!;

    }
}