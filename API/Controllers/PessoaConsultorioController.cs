using API_BetterLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PessoaConsultorioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PessoaConsultorioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<PessoaConsultorioDTO>>> PostPessoaConsultorio(List<PessoaConsultorioDTO> lstPessoaConsultorioDTO)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                if(lstPessoaConsultorioDTO.Count > 0)
                {
                    //-> Removendo todos os registros referentes a esse consultório.
                    var registrosDelete = _context.PessoaConsultorios.Where(r => r.ConCodi == lstPessoaConsultorioDTO[0].ConCodi).ToList();
                    _context.PessoaConsultorios.RemoveRange(registrosDelete);
                    _context.SaveChanges();

                    foreach (var item in lstPessoaConsultorioDTO)
                    {
                        var pessoaConsultorio = new PessoaConsultorio {
                            PecCodi = _context.PessoaConsultorios
                                .OrderByDescending(lastId => lastId)
                                .Select(lastId => lastId.PecCodi)
                                .FirstOrDefault() + 1,
                            PecStat = true,
                            PesCodi = item.PesCodi,
                            ConCodi = item.ConCodi
                        };

                        _context.PessoaConsultorios.Add(pessoaConsultorio);
                        await _context.SaveChangesAsync();
                    }
                }

                await transaction.CommitAsync();
                return Ok(lstPessoaConsultorioDTO);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(ex.Message + " \n " + ex.InnerException?.Message);
            }
        }

        [HttpGet("{conCodi}")]
        public Task<ActionResult<IEnumerable<MedicoConsultorioModel>>> GetMedicoByConsultorio(int conCodi)
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var query = from pessoa in context.Pessoas
                                join pessoaConsultorio in context.PessoaConsultorios
                                on pessoa.PesCodi equals pessoaConsultorio.PesCodi
                                where pessoaConsultorio.ConCodi == conCodi && pessoa.TipCodi == 1
                                select new
                                {
                                    pesCodi = pessoa.PesCodi,
                                    pecCodi = pessoaConsultorio.PecCodi,
                                    pesNome = pessoa.PesNome
                                };
                    var list = query.ToList();

                    if (list != null)
                    {
                        return Task.FromResult<ActionResult<IEnumerable<MedicoConsultorioModel>>>(Ok(list));
                    }
                }

                return Task.FromResult<ActionResult<IEnumerable<MedicoConsultorioModel>>>(NotFound());
            }
            catch (Exception ex)
            {
                return Task.FromResult<ActionResult<IEnumerable<MedicoConsultorioModel>>>(
                    BadRequest(ex.Message + " \n " + ex.InnerException?.Message));
            }
        }
    }
}
