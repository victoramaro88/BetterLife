using API_BetterLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultorioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConsultorioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Consultorio>>> GetConsultorios()
        {
            return Ok(await _context.Consultorios.ToListAsync());
        }

        [HttpGet("{conCodi}")]
        public async Task<ActionResult<Consultorio>> GetTipoDocumentos(int conCodi)
        {
            var consultorio = await _context.Consultorios.FindAsync(conCodi);

            if (consultorio == null)
            {
                return NotFound();
            }

            return Ok(consultorio);
        }

        [HttpPost]
        public async Task<ActionResult<ConsultorioDTO>> PostConsultorio(ConsultorioDTO consultorioDTO)
        {
            try
            {
                var consultorio = new Consultorio
                {
                    ConCodi = _context.Consultorios
                        .OrderByDescending(lastId => lastId)
                        .Select(lastId => lastId.ConCodi)
                        .FirstOrDefault() + 1,
                    ConDesc = consultorioDTO.ConDesc,
                    ConStat = true, //-> Ativo sempre que insere.
                    ConFoto = consultorioDTO.ConFoto
                };

                _context.Consultorios.Add(consultorio);
                await _context.SaveChangesAsync();

                return Ok(consultorio);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " \n " + ex.InnerException?.Message);
            }
        }

        [HttpPost("{conCodi}")]
        public async Task<ActionResult<ConsultorioDTO>> PostPessoaConsultorio(int conCodi, ConsultorioDTO consultorioDTO)
        {
            try
            {
                var consultorio = new Consultorio
                {
                    ConCodi = _context.Consultorios
                        .OrderByDescending(lastId => lastId)
                        .Select(lastId => lastId.ConCodi)
                        .FirstOrDefault() + 1,
                    ConDesc = consultorioDTO.ConDesc,
                    ConStat = true, //-> Ativo sempre que insere.
                    ConFoto = consultorioDTO.ConFoto
                };

                _context.Consultorios.Add(consultorio);
                await _context.SaveChangesAsync();

                return Ok(consultorio);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " \n " + ex.InnerException?.Message);
            }
        }

        [HttpPut("{conCodi}")]
        public async Task<ActionResult<ConsultorioDTO>> PutConsultorio(int conCodi, ConsultorioDTO consultorioDTO)
        {
            if (conCodi != consultorioDTO.ConCodi)
            {
                return BadRequest();
            }

            var consultorio = await _context.Consultorios.FindAsync(conCodi);
            if (consultorio == null)
            {
                return NotFound();
            }

            consultorio.ConDesc = consultorioDTO.ConDesc;
            consultorio.ConFoto = consultorioDTO.ConFoto;
            consultorio.ConStat = consultorioDTO.ConStat;

            _context.Entry(consultorio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsultorioExists(conCodi))
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

        private bool ConsultorioExists(long id)
        {
            return _context.Consultorios.Any(e => e.ConCodi == id);
        }
    }
}
