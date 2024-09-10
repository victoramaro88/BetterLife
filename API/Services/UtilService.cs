using Microsoft.AspNetCore.Identity;
using API_BetterLife.Models;

namespace API_BetterLife.Services
{
    public class UtilService : IUtilService
    {
        private readonly PasswordHasher<object> _passwordHasher;

        public UtilService()
        {
            _passwordHasher = new PasswordHasher<object>();
        }

        public PasswordVerificationResult VerifyPassword(string hashedPassword, string plainPassword)
        {
            return _passwordHasher.VerifyHashedPassword(null, hashedPassword, plainPassword);
        }

        public string CriptografarSenha(string senha)
        {
            return _passwordHasher.HashPassword(null, senha);
        }
    }
}
