using API_BetterLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarteiraBariatricaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CarteiraBariatricaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarteiraBariatrica>>> GetCarteiraBariatrica()
        {
            return Ok(await _context.CarteiraBariatricas.ToListAsync());
        }
    }
}
