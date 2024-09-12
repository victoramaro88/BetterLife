using API_BetterLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HospitalController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hospital>>> GetHospitais()
        {
            return Ok(await _context.Hospitals.ToListAsync());
        }

        [HttpGet("{hosCodi}")]
        public async Task<ActionResult<Hospital>> GetHospital(int hosCodi)
        {
            var hospital = await _context.Hospitals.FindAsync(hosCodi);

            if (hospital == null)
            {
                return NotFound();
            }

            return Ok(hospital);
        }

        [HttpPost]
        public async Task<ActionResult<Hospital>> PostHospital(Hospital hospital)
        {
            try
            {
                hospital.HosCodi = _context.Hospitals.Max(p => (int?)p.HosCodi) + 1 ?? 1;

                _context.Hospitals.Add(hospital);
                var retorno = await _context.SaveChangesAsync();

                return Ok(hospital);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " \n " + ex.InnerException?.Message);
            }
        }

        [HttpPut("{hosCodi}")]
        public async Task<IActionResult> PutHospital(int hosCodi, Hospital hospital)
        {
            if (hosCodi != hospital.HosCodi)
            {
                return BadRequest();
            }

            _context.Entry(hospital).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HospitalExists(hosCodi))
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

        private bool HospitalExists(int id)
        {
            return _context.Hospitals.Any(e => e.HosCodi == id);
        }
    }
}
