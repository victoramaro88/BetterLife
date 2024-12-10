using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class PessoaContato
    {
        public long PctCodi { get; set; }
        public bool PctStat { get; set; }
        public long PesCodi { get; set; }
        public long CttCodi { get; set; }

        public virtual Contato CttCodiNavigation { get; set; } = null!;
        public virtual Pessoa PesCodiNavigation { get; set; } = null!;
    }
}
