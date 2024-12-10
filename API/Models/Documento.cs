using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class Documento
    {
        public long DocCodi { get; set; }
        public string DocNume { get; set; } = null!;
        public bool DocStat { get; set; }
        public long PesCodi { get; set; }
        public short TidCodi { get; set; }

        public virtual Pessoa PesCodiNavigation { get; set; } = null!;
        public virtual TipoDocumento TidCodiNavigation { get; set; } = null!;
    }
}
