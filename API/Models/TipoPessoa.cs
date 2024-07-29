using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class TipoPessoa
    {
        public TipoPessoa()
        {
            Pessoas = new HashSet<Pessoa>();
        }

        public short TipCodi { get; set; }
        public string TipDesc { get; set; } = null!;
        public bool TipStat { get; set; }

        public virtual ICollection<Pessoa> Pessoas { get; set; }
    }
}
