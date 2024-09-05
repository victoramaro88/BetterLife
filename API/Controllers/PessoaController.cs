using API_BetterLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]/[action]")]
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
        public async Task<ActionResult<Pessoa>> GetPessoaById(long pesCodi)
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
        public async Task<ActionResult<string>> InserirPessoa(PessoaDTO pessoaDTO)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                //-> Adicionando a pessoa
                var pessoa = new Pessoa
                {
                    PesCodi = _context.Pessoas.Max(p => (long?)p.PesCodi) + 1 ?? 1,
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
                            CttCodi = _context.Contatos.Max(p => (long?)p.CttCodi) + 1 ?? 1,
                            CttDesc = item.CttDesc,
                            CttStat = true, //-> Ativo sempre que insere.
                            TicCodi = item.TicCodi
                        };

                        _context.Contatos.Add(contato);

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
                if (pessoaDTO.listaDocumentos?.Count() > 0)
                {
                    foreach (var item in pessoaDTO.listaDocumentos)
                    {
                        var documento = new Documento
                        {
                            DocCodi = _context.Documentos.Max(p => (long?)p.DocCodi) + 1 ?? 1,
                            DocNume = item.DocNume,
                            DocStat = true, //-> Ativo sempre que insere.
                            PesCodi = pessoa.PesCodi,
                            TidCodi = item.TidCodi
                        };

                        _context.Documentos.Add(documento);
                        await _context.SaveChangesAsync();
                    }
                }

                //-> Adicionando na tabela de PessoaConsultorio
                if(pessoaDTO.ConCodi > 0)
                {
                    var pessoaConsultorio = new PessoaConsultorio
                    {
                        PecCodi = _context.PessoaConsultorios.Max(p => (int?)p.PecCodi) + 1 ?? 1,
                        PecStat = true,
                        PesCodi = pessoa.PesCodi,
                        ConCodi = pessoaDTO.ConCodi
                    };

                    _context.PessoaConsultorios.Add(pessoaConsultorio);
                    await _context.SaveChangesAsync();
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return Ok("OK");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(ex.Message + " \n " + ex.InnerException?.Message);
            }
        }

        [HttpPut("{pesCodi}")]
        public async Task<IActionResult> EditarPessoa(long pesCodi, PessoaDTO pessoaDTO)
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

        [HttpGet("{conCodi}")]
        public Task<ActionResult<PessoaConsultorioRetornoModel>> GetPessoaByIdConsultorio(int conCodi)
        {
            List<PessoaConsultorioRetornoModel> listaResultado =
                (from pes in _context.Pessoas
                join pesCon in _context.PessoaConsultorios on pes.PesCodi equals pesCon.PesCodi
                join tipPes in _context.TipoPessoas on pes.TipCodi equals tipPes.TipCodi
                where pesCon.ConCodi == conCodi
                orderby pes.PesNome
                select new PessoaConsultorioRetornoModel
                {
                    pesCodi = pes.PesCodi,
                    pesNome = pes.PesNome,
                    tipDesc = tipPes.TipDesc,
                    pesStat = pes.PesStat
                }).ToList();


            if (listaResultado == null)
            {
                return Task.FromResult<ActionResult<PessoaConsultorioRetornoModel>>(NotFound());
            }

            return Task.FromResult<ActionResult<PessoaConsultorioRetornoModel>>(Ok(listaResultado));
        }

        [HttpGet("{pesCodi}/{statusAtual}")]
        public async Task<ActionResult> AlteraStatusPessoa(long pesCodi, bool statusAtual)
        {
            var pessoa = await _context.Pessoas.FindAsync(pesCodi);
            if (pessoa == null)
            {
                return NotFound();
            }

            pessoa.PesStat = !statusAtual;

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
