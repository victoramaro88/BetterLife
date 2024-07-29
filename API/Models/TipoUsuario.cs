using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class TipoUsuario
    {
        public TipoUsuario()
        {
            UsuarioPessoas = new HashSet<UsuarioPessoa>();
        }

        public short TusCodi { get; set; }
        public string TusDesc { get; set; } = null!;
        public bool TusStat { get; set; }

        public virtual ICollection<UsuarioPessoa> UsuarioPessoas { get; set; }
    }
}
