using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class Permissao
    {
        public int PerCodi { get; set; }
        public string PerDesc { get; set; } = null!;
        public bool PerAtiv { get; set; }
        public bool PerStat { get; set; }
        public short TusCodi { get; set; }

        public virtual TipoUsuario TusCodiNavigation { get; set; } = null!;
    }
}
