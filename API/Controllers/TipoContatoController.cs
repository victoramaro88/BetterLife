using API_BetterLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoContatoController : ControllerBase
    {

        private readonly AppDbContext _context;

        public TipoContatoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoContato>>> GetTipoContatos()
        {
            return Ok(await _context.TipoContatos.ToListAsync());
        }
    }
}
