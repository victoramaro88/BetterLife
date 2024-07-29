using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class TipoCirurgium
    {
        public TipoCirurgium()
        {
            CarteiraBariatricas = new HashSet<CarteiraBariatrica>();
        }

        public int TpcCodi { get; set; }
        public string TpcDesc { get; set; } = null!;
        public bool TpcStat { get; set; }

        public virtual ICollection<CarteiraBariatrica> CarteiraBariatricas { get; set; }
    }
}
