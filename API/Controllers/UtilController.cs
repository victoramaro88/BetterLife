using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UtilController : Controller
    {
        [HttpGet("{login}")]
        public string Login(string login)
        {
            string result = "";

            var a = GerarHash(login);

            result = Encoding.Default.GetString(a);

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
    }
}
