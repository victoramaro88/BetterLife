using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class PessoaConsultorio
    {
        public PessoaConsultorio()
        {
            CarteiraBariatricas = new HashSet<CarteiraBariatrica>();
        }

        public int PecCodi { get; set; }
        public bool PecStat { get; set; }
        public long PesCodi { get; set; }
        public int ConCodi { get; set; }

        public virtual Consultorio ConCodiNavigation { get; set; } = null!;
        public virtual Pessoa PesCodiNavigation { get; set; } = null!;
        public virtual ICollection<CarteiraBariatrica> CarteiraBariatricas { get; set; }
    }
}
