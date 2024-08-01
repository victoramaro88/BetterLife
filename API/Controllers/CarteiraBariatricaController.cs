﻿using API_BetterLife.Models;
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
        public async Task<ActionResult<IEnumerable<CarteiraBariatrica>>> GetCarteira()
        {
            return Ok(await _context.CarteiraBariatricas.ToListAsync());
        }

        [HttpGet("{pesCodi}")]
        public Task<ActionResult<IEnumerable<CarteiraBariatrica>>> GetCarteira(long pesCodi)
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var query = from carteira in context.CarteiraBariatricas
                                join tipoCirurgia in context.TipoCirurgia
                                on carteira.TpcCodi equals tipoCirurgia.TpcCodi
                                join hosp in context.Hospitals
                                on carteira.HosCodi equals hosp.HosCodi
                                join pessoa in context.Pessoas
                                on carteira.PesCodi equals pessoa.PesCodi
                                join pessoaCons in context.PessoaConsultorios
                                on carteira.PecCodi equals pessoaCons.PecCodi
                                join consultorio in context.Consultorios
                                on pessoaCons.ConCodi equals consultorio.ConCodi
                                join documento in context.Documentos
                                on pessoa.PesCodi equals documento.PesCodi
                                where pessoa.PesCodi == pesCodi && documento.TidCodi == 1
                                select new
                                {
                                    carteira.CarCodi,
                                    pessoa.PesNome,
                                    documento.DocNume,
                                    tipoCirurgia.TpcDesc,
                                    hosp.HosDesc,
                                    consultorio.ConDesc,
                                    pessoa.PesFoto,
                                };

                    var result = query.ToList();

                    if (result.Count > 0)
                    {
                        return Task.FromResult<ActionResult<IEnumerable<CarteiraBariatrica>>>(Ok(result));
                    }
                }

                return Task.FromResult<ActionResult<IEnumerable<CarteiraBariatrica>>>(NotFound());
            }
            catch (Exception ex)
            {
                return Task.FromResult<ActionResult<IEnumerable<CarteiraBariatrica>>>(
                    BadRequest(ex.Message + " \n " + ex.InnerException?.Message));
            }
        }

        [HttpPost]
        public async Task<ActionResult<CarteiraBariatricaDTO>> PostCarteira(CarteiraBariatricaDTO carteiraDTO)
        {
            try
            {
                var carteira = new CarteiraBariatrica
                {
                    CarCodi = _context.CarteiraBariatricas
                        .OrderByDescending(lastId => lastId)
                        .Select(lastId => lastId.CarCodi)
                        .FirstOrDefault() + 1,
                    CarDtCi = carteiraDTO.CarDtCi,
                    TpcCodi = carteiraDTO.TpcCodi,
                    HosCodi = carteiraDTO.HosCodi,
                    PesCodi = carteiraDTO.PesCodi,
                    PecCodi = carteiraDTO.PecCodi,
                    CarStat = carteiraDTO.CarStat
                };

                _context.CarteiraBariatricas.Add(carteira);
                await _context.SaveChangesAsync();

                return Ok(carteira);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " \n " + ex.InnerException?.Message);
            }
        }

        [HttpPut("{carCodi}")]
        public async Task<IActionResult> PutCarteira(long carCodi, CarteiraBariatricaDTO carteiraDTO)
        {
            if (carCodi != carteiraDTO.CarCodi)
            {
                return BadRequest();
            }

            var carteira = await _context.CarteiraBariatricas.FindAsync(carCodi);
            if (carteira == null)
            {
                return NotFound();
            }

            carteira.CarDtCi = carteiraDTO.CarDtCi;
            carteira.TpcCodi = carteiraDTO.TpcCodi;
            carteira.HosCodi = carteiraDTO.HosCodi;
            carteira.PesCodi = carteiraDTO.PesCodi;
            carteira.PecCodi = carteiraDTO.PecCodi;
            carteira.CarStat = carteiraDTO.CarStat;

            _context.Entry(carteira).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarteiraExists(carCodi))
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

        private bool CarteiraExists(long id)
        {
            return _context.CarteiraBariatricas.Any(e => e.PesCodi == id);
        }
    }
}
