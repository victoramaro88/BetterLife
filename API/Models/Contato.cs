using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class Contato
    {
        public Contato()
        {
            PessoaContatos = new HashSet<PessoaContato>();
        }

        public long CttCodi { get; set; }
        public string CttDesc { get; set; } = null!;
        public bool CttStat { get; set; }
        public short TicCodi { get; set; }

        public virtual TipoContato TicCodiNavigation { get; set; } = null!;
        public virtual ICollection<PessoaContato> PessoaContatos { get; set; }
    }
}
