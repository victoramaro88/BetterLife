using API_BetterLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoPessoaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TipoPessoaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoPessoa>>> GetTipoPessoas()
        {
            return Ok(await _context.TipoPessoas.ToListAsync());
        }

        [HttpGet("{tipCodi}")]
        public async Task<ActionResult<TipoPessoa>> GetTipoPessoas(short tipCodi)
        {
            var tipoPessoa = await _context.TipoPessoas.FindAsync(tipCodi);

            if (tipoPessoa == null)
            {
                return NotFound();
            }

            return Ok(tipoPessoa);
        }

        [HttpPost]
        public async Task<ActionResult<TipoPessoa>> PostTipoDocumento(TipoPessoa tipoPessoa)
        {
            try
            {
                tipoPessoa.TipCodi = (short)(_context.TipoPessoas
                    .OrderByDescending(lastId => lastId)
                    .Select(lastId => lastId.TipCodi)
                    .FirstOrDefault() + 1);

                _context.TipoPessoas.Add(tipoPessoa);
                var retorno = await _context.SaveChangesAsync();

                return Ok(tipoPessoa);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " \n " + ex.InnerException?.Message);
            }
        }

        [HttpPut("{tipCodi}")]
        public async Task<IActionResult> PutTipoPessoa(short tipCodi, TipoPessoa tipoPessoa)
        {
            if (tipCodi != tipoPessoa.TipCodi)
            {
                return BadRequest();
            }

            _context.Entry(tipoPessoa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoDocumentoExists(tipCodi))
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

        [HttpDelete("{tipCodi}")]
        public async Task<IActionResult> DeleteTipoDocumento(short tipCodi)
        {
            var tipoPessoa = await _context.TipoPessoas.FindAsync(tipCodi);
            if (tipoPessoa == null)
            {
                return NotFound();
            }

            _context.TipoPessoas.Remove(tipoPessoa);
            await _context.SaveChangesAsync();

            return Ok("Removido com sucesso!");
        }

        private bool TipoDocumentoExists(int id)
        {
            return _context.TipoPessoas.Any(e => e.TipCodi == id);
        }
    }
}
