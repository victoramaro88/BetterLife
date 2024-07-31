namespace API_BetterLife.Models
{
    public class ConsultorioDTO
    {
        public int ConCodi { get; set; }
        public string ConDesc { get; set; } = null!;
        public bool ConStat { get; set; }
        public string? ConFoto { get; set; }
    }
}
