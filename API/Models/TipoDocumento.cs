using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class TipoDocumento
    {
        public TipoDocumento()
        {
            Documentos = new HashSet<Documento>();
        }

        public short TidCodi { get; set; }
        public string TidDesc { get; set; } = null!;
        public bool TidStat { get; set; }

        public virtual ICollection<Documento> Documentos { get; set; }
    }
}
