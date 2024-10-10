using API_BetterLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PermissaoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PermissaoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Permissao>>> GetPermissoes()
        {
            return Ok(await _context.Permissaos
                .OrderBy(tc => tc.PerDesc)
                .ToListAsync());
        }

        [HttpGet("{tusCodi}")]
        public async Task<ActionResult<Permissao>> GetPermissaoByTusCodi(int tusCodi)
        {
            var permissoesTipoUsuario = await _context.Permissaos
                .Where(p => p.TusCodi == tusCodi)
                .OrderBy(p => p.PerDesc)
                .ToListAsync();

            if (permissoesTipoUsuario == null)
            {
                return NotFound();
            }

            return Ok(permissoesTipoUsuario);
        }
    }
}
