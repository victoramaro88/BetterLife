using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class Hospital
    {
        public Hospital()
        {
            CarteiraBariatricas = new HashSet<CarteiraBariatrica>();
        }

        public int HosCodi { get; set; }
        public string HosDesc { get; set; } = null!;
        public bool HosStat { get; set; }

        public virtual ICollection<CarteiraBariatrica> CarteiraBariatricas { get; set; }
    }
}
