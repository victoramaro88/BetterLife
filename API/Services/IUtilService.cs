using Microsoft.AspNetCore.Identity;

namespace API_BetterLife.Services
{
    public interface IUtilService
    {
        PasswordVerificationResult VerifyPassword(string hashedPassword, string plainPassword);
        string CriptografarSenha(string senha);
    }
}
