namespace API_BetterLife.Models
{
    public class DocumentoDTO
    {
        public long DocCodi { get; set; }
        public string DocNume { get; set; } = null!;
        public bool DocStat { get; set; }
        public long PesCodi { get; set; }
        public short TidCodi { get; set; }
    }
}
