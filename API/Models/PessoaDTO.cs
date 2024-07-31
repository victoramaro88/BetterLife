namespace API_BetterLife.Models
{
    public class PessoaDTO
    {
        public long PesCodi { get; set; }
        public string PesNome { get; set; } = null!;
        public string PesFoto { get; set; } = null!;
        public DateTime PesNasc { get; set; }
        public bool PesStat { get; set; }
        public short TipCodi { get; set; }
        public short GenCodi { get; set; }

        public List<ContatoDTO>? listaContatos { get; set; }
        public List<DocumentoDTO>? listaDocumentos { get; set; }
    }
}
