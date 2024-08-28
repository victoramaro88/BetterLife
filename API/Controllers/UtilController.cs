using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UtilController : Controller
    {
        private readonly IPasswordHasher<object> _passwordHasher;

        public UtilController()
        {
            _passwordHasher = new PasswordHasher<object>();
        }

        [HttpGet("{login}")]
        public string Login(string login)
        {
            string result = "";
            //var a = GerarHash(login);
            //result = Encoding.Default.GetString(a);

            //-> NOVA FORMA DE UTILIZAÇÃO:
            result = HashPassword(login);

            bool validaSenha = VerifyPassword(result, login);

            return result;
        }

        [NonAction]
        public byte[] GerarHash(string value)
        {
            byte[] arrBytes = Encoding.ASCII.GetBytes(value);
            byte[] result;
            using (SHA256 shaM = SHA256.Create())
            {
                result = shaM.ComputeHash(arrBytes);
            }

            //-> Apenas verificando a string formada pelo hash.
            var str = Encoding.Default.GetString(result);

            return result;
        }





        [NonAction]
        public string HashPassword(string password)
        {
            var hashedPassword = _passwordHasher.HashPassword(null, password);
            return hashedPassword;
        }

        [NonAction]
        public bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            var verificationResult = _passwordHasher.VerifyHashedPassword(null, hashedPassword, providedPassword);
            return verificationResult == PasswordVerificationResult.Success;
        }
    }
}
