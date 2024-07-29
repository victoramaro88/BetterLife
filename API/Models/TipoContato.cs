using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class TipoContato
    {
        public TipoContato()
        {
            Contatos = new HashSet<Contato>();
        }

        public short TicCodi { get; set; }
        public string TicDesc { get; set; } = null!;
        public bool TicStat { get; set; }

        public virtual ICollection<Contato> Contatos { get; set; }
    }
}
