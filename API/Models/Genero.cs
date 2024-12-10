using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class Genero
    {
        public Genero()
        {
            Pessoas = new HashSet<Pessoa>();
        }

        public short GenCodi { get; set; }
        public string GenDesc { get; set; } = null!;
        public bool GenStat { get; set; }

        public virtual ICollection<Pessoa> Pessoas { get; set; }
    }
}
