using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class TiposDocumento
    {
        public short TidCodi { get; set; }
        public string? TidDesc { get; set; }
        public bool TidStat { get; set; }
    }
}
