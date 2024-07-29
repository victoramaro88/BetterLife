using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class Pessoa
    {
        public Pessoa()
        {
            CarteiraBariatricas = new HashSet<CarteiraBariatrica>();
            Documentos = new HashSet<Documento>();
            PessoaConsultorios = new HashSet<PessoaConsultorio>();
            PessoaContatos = new HashSet<PessoaContato>();
            UsuarioPessoas = new HashSet<UsuarioPessoa>();
        }

        public long PesCodi { get; set; }
        public string PesNome { get; set; } = null!;
        public string PesFoto { get; set; } = null!;
        public DateTime PesNasc { get; set; }
        public bool PesStat { get; set; }
        public short TipCodi { get; set; }
        public short GenCodi { get; set; }

        public virtual Genero GenCodiNavigation { get; set; } = null!;
        public virtual TipoPessoa TipCodiNavigation { get; set; } = null!;
        public virtual ICollection<CarteiraBariatrica> CarteiraBariatricas { get; set; }
        public virtual ICollection<Documento> Documentos { get; set; }
        public virtual ICollection<PessoaConsultorio> PessoaConsultorios { get; set; }
        public virtual ICollection<PessoaContato> PessoaContatos { get; set; }
        public virtual ICollection<UsuarioPessoa> UsuarioPessoas { get; set; }
    }
}
