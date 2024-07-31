using API_BetterLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PessoaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
        {
            return Ok(await _context.Pessoas
                .Include(p => p.GenCodiNavigation)
                .Include(p => p.TipCodiNavigation)
                .Include(p => p.CarteiraBariatricas)
                .Include(p => p.Documentos)
                .Include(p => p.PessoaConsultorios)
                .Include(p => p.PessoaContatos)
                .Include(p => p.UsuarioPessoas)
                .ToListAsync());
        }

        [HttpGet("{pesCodi}")]
        public async Task<ActionResult<Pessoa>> GetPessoas(long pesCodi)
        {
            var pessoa = await _context.Pessoas
                .Include(p => p.GenCodiNavigation)
                .Include(p => p.TipCodiNavigation)
                .Include(p => p.CarteiraBariatricas)
                .Include(p => p.Documentos)
                .Include(p => p.PessoaConsultorios)
                .Include(p => p.PessoaContatos)
                .Include(p => p.UsuarioPessoas)
                .FirstOrDefaultAsync(p => p.PesCodi == pesCodi);

            if (pessoa == null)
            {
                return NotFound();
            }

            return Ok(pessoa);
        }

        [HttpPost]
        public async Task<ActionResult<PessoaDTO>> PostPessoa(PessoaDTO pessoaDTO)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                //-> Adicionando a pessoa
                var pessoa = new Pessoa
                {
                    PesCodi = (short)(_context.Pessoas
                        .OrderByDescending(lastId => lastId)
                        .Select(lastId => lastId.PesCodi)
                        .FirstOrDefault() + 1),
                    PesNome = pessoaDTO.PesNome,
                    PesFoto = pessoaDTO.PesFoto,
                    PesNasc = pessoaDTO.PesNasc,
                    PesStat = pessoaDTO.PesStat,
                    TipCodi = pessoaDTO.TipCodi,
                    GenCodi = pessoaDTO.GenCodi
                };

                _context.Pessoas.Add(pessoa);
                await _context.SaveChangesAsync();

                //-> Adicionando a lista de contatos da pessoa
                if (pessoaDTO.listaContatos?.Count > 0)
                {
                    foreach (var item in pessoaDTO.listaContatos)
                    {
                        var contato = new Contato
                        {
                            CttCodi = _context.Contatos
                                .OrderByDescending(lastId => lastId)
                                .Select(lastId => lastId.CttCodi)
                                .FirstOrDefault() + 1,
                            CttDesc = item.CttDesc,
                            CttStat = true, //-> Ativo sempre que insere.
                            TicCodi = item.TicCodi
                        };

                        _context.Contatos.Add(contato);
                        await _context.SaveChangesAsync();

                        //-> Inserindo na tabela PessoaContato
                        var pessoaContato = new PessoaContato
                        {
                            PctCodi = _context.PessoaContatos
                                .OrderByDescending(lastId => lastId)
                                .Select(lastId => lastId.PctCodi)
                                .FirstOrDefault() + 1,
                            CttCodi = contato.CttCodi,
                            PctStat = true, //-> Ativo sempre que insere.
                            PesCodi = pessoa.PesCodi
                        };

                        _context.PessoaContatos.Add(pessoaContato);
                        await _context.SaveChangesAsync();
                    }
                }

                //-> Adicionando os documentos da pessoa
                if(pessoaDTO.listaDocumentos?.Count() > 0)
                {
                    foreach (var item in pessoaDTO.listaDocumentos)
                    {
                        var documento = new Documento
                        {
                            DocCodi = _context.Documentos
                                .OrderByDescending(lastId => lastId)
                                .Select(lastId => lastId.DocCodi)
                                .FirstOrDefault() + 1,
                            DocNume = item.DocNume,
                            DocStat = true, //-> Ativo sempre que insere.
                            PesCodi = pessoa.PesCodi,
                            TidCodi = item.TidCodi
                        };

                        _context.Documentos.Add(documento);
                        await _context.SaveChangesAsync();
                    }
                }

                await transaction.CommitAsync();
                return Ok(pessoa);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(ex.Message + " \n " + ex.InnerException?.Message);
            }
        }

        [HttpPut("{pesCodi}")]
        public async Task<IActionResult> PutPessoa(long pesCodi, PessoaDTO pessoaDTO)
        {
            if (pesCodi != pessoaDTO.PesCodi)
            {
                return BadRequest();
            }

            var pessoa = await _context.Pessoas.FindAsync(pesCodi);
            if (pessoa == null)
            {
                return NotFound();
            }

            pessoa.PesNome = pessoaDTO.PesNome;
            pessoa.PesFoto = pessoaDTO.PesFoto;
            pessoa.PesNasc = pessoaDTO.PesNasc;
            pessoa.PesStat = pessoaDTO.PesStat;
            pessoa.TipCodi = pessoaDTO.TipCodi;
            pessoa.GenCodi = pessoaDTO.GenCodi;

            _context.Entry(pessoa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PessoaExists(pesCodi))
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

        //[HttpDelete("{pesCodi}")]
        //public async Task<IActionResult> DeletePessoa(long pesCodi)
        //{
        //    var pessoa = await _context.Pessoas.FindAsync(pesCodi);
        //    if (pessoa == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Pessoas.Remove(pessoa);
        //    await _context.SaveChangesAsync();

        //    return Ok("Removido com sucesso!");
        //}

        private bool PessoaExists(long id)
        {
            return _context.Pessoas.Any(e => e.PesCodi == id);
        }
    }
}
