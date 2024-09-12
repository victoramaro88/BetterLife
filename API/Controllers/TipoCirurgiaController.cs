using API_BetterLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoCirurgiaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TipoCirurgiaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoCirurgium>>> GetTipoCirurgias()
        {
            return Ok(await _context.TipoCirurgia.ToListAsync());
        }

        [HttpGet("{tpcCodi}")]
        public async Task<ActionResult<TipoCirurgium>> GetTipoCirurgia(int tpcCodi)
        {
            var tipoCirurgia = await _context.TipoCirurgia.FindAsync(tpcCodi);

            if (tipoCirurgia == null)
            {
                return NotFound();
            }

            return Ok(tipoCirurgia);
        }

        [HttpPost]
        public async Task<ActionResult<TipoCirurgium>> PostTipoCirurgia(TipoCirurgium tipoCirurgia)
        {
            try
            {
                tipoCirurgia.TpcCodi = _context.TipoCirurgia.Max(p => (int?)p.TpcCodi) + 1 ?? 1;

                _context.TipoCirurgia.Add(tipoCirurgia);
                var retorno = await _context.SaveChangesAsync();

                return Ok(tipoCirurgia);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " \n " + ex.InnerException?.Message);
            }
        }

        [HttpPut("{tpcCodi}")]
        public async Task<IActionResult> PutTipoCirurgia(int tpcCodi, TipoCirurgium tipoCirurgia)
        {
            if (tpcCodi != tipoCirurgia.TpcCodi)
            {
                return BadRequest();
            }

            _context.Entry(tipoCirurgia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoCirurgiaExists(tpcCodi))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Alterado com sucesso!");
        }

        private bool TipoCirurgiaExists(int id)
        {
            return _context.TipoCirurgia.Any(e => e.TpcCodi == id);
        }
    }
}
