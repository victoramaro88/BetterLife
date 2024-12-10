using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class UsuarioPessoa
    {
        public long UsuCodi { get; set; }
        public string UsuLogi { get; set; } = null!;
        public string UsuSenh { get; set; } = null!;
        public bool UsuStat { get; set; }
        public long PesCodi { get; set; }
        public short TusCodi { get; set; }

        public virtual Pessoa PesCodiNavigation { get; set; } = null!;
        public virtual TipoUsuario TusCodiNavigation { get; set; } = null!;
    }
}
