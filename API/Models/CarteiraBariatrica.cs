using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class CarteiraBariatrica
    {
        public long CarCodi { get; set; }
        public DateTime CarDtCi { get; set; }
        public int TpcCodi { get; set; }
        public int HosCodi { get; set; }
        public long PesCodi { get; set; }
        public int PecCodi { get; set; }

        public virtual Hospital HosCodiNavigation { get; set; } = null!;
        public virtual PessoaConsultorio PecCodiNavigation { get; set; } = null!;
        public virtual Pessoa PesCodiNavigation { get; set; } = null!;
        public virtual TipoCirurgium TpcCodiNavigation { get; set; } = null!;
    }
}
