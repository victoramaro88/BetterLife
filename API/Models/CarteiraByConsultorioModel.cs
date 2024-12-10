using Microsoft.Extensions.Hosting;

namespace API_BetterLife.Models
{
    public class CarteiraByConsultorioModel
    {
        public long carCodi { get; set; }
        public long pesCodi { get; set; }
        public string? pesNome { get; set; }
        public string? docNume { get; set; }
        public int pecCodi { get; set; }
        public string? medicoNome { get; set; }
        public int tpcCodi { get; set; }
        public string? tpcDesc { get; set; }
        public int hosCodi { get; set; }
        public string? hosDesc { get; set; }
        public DateTime carDtCi { get; set; }
        public bool carStat { get; set; }
    }
}
