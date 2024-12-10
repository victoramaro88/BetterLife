namespace API_BetterLife.Models
{
    public class PessoaConsultorioRetornoModel
    {
        public long pesCodi { get; set; }
        public string? pesCPF { get; set; }
        public string? pesNome { get; set; }
        public string? tipDesc { get; set; }
        public bool pesStat { get; set; }
    }
}
