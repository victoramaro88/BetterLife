using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_BetterLife.Models;

namespace MinhaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Produces("application/json")]
    public class TipoDocumentosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TipoDocumentosController(AppDbContext context)
        {
            _context = context;
        }

        //-> Teste para retorno de erros:
        //[HttpGet]
        //public IActionResult RetornoErros(int status)
        //{
        //    var statusRetorno = StatusCode(0);
        //    switch (status)
        //    {
        //        case StatusCodes.Status404NotFound:
        //            throw new KeyNotFoundException("Retorno NotFound (404).");
        //        case StatusCodes.Status400BadRequest:
        //            throw new ArgumentNullException("Retorno BadRequest (400).");
        //        case StatusCodes.Status500InternalServerError:
        //            throw new Exception("Retorno InternalServerError (00).");
        //        default:
        //            break;
        //    }

        //    return statusRetorno;
        //    //throw new Exception("This is a test exception.");
        //    //throw new ArgumentNullException("This is a bad request exception.");
        //    //throw new KeyNotFoundException("This is a not found exception.");
        //}

        // GET: api/TipoDocumentos

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoDocumento>>> GetTipoDocumentos()
        {
            return Ok(await _context.TipoDocumentos.ToListAsync());
        }

        // GET: api/TipoDocumentos/5
        [HttpGet("{tidCodi}")]
        public async Task<ActionResult<TipoDocumento>> GetTipoDocumentos(short tidCodi)
        {
            var tipoDocumento = await _context.TipoDocumentos.FindAsync(tidCodi);

            if (tipoDocumento == null)
            {
                return NotFound();
            }

            return Ok(tipoDocumento);
        }

        // POST: api/TipoDocumentos
        [HttpPost]
        public async Task<ActionResult<TipoDocumento>> PostTipoDocumento(TipoDocumento tipoDocumento)
        {
            try
            {
                _context.TipoDocumentos.Add(tipoDocumento);
                var retorno = await _context.SaveChangesAsync();

                //return CreatedAtAction(nameof(GetTipoDocumento), new { id = tipoDocumento.TidCodi }, tipoDocumento);
                return Ok(tipoDocumento);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " \n " + ex.InnerException?.Message);
            }
        }

        // PUT: api/TipoDocumentos/5
        [HttpPut("{tidCodi}")]
        public async Task<IActionResult> PutTipoDocumento(int tidCodi, TipoDocumento tipoDocumento)
        {
            if (tidCodi != tipoDocumento.TidCodi)
            {
                return BadRequest();
            }

            _context.Entry(tipoDocumento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoDocumentoExists(tidCodi))
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

        // DELETE: api/TipoDocumentos/5
        [HttpDelete("{tidCodi}")]
        public async Task<IActionResult> DeleteTipoDocumento(short tidCodi)
        {
            var tipoDocumento = await _context.TipoDocumentos.FindAsync(tidCodi);
            if (tipoDocumento == null)
            {
                return NotFound();
            }

            _context.TipoDocumentos.Remove(tipoDocumento);
            await _context.SaveChangesAsync();

            return Ok("Removido com sucesso!");
        }

        private bool TipoDocumentoExists(int id)
        {
            return _context.TipoDocumentos.Any(e => e.TidCodi == id);
        }
    }
}
