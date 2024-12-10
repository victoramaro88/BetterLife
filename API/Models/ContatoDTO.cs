namespace API_BetterLife.Models
{
    public class ContatoDTO
    {
        public long CttCodi { get; set; }
        public string CttDesc { get; set; } = null!;
        public bool CttStat { get; set; }
        public short TicCodi { get; set; }
    }
}
