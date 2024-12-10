using System;
using System.Collections.Generic;

namespace API_BetterLife.Models
{
    public partial class Consultorio
    {
        public Consultorio()
        {
            PessoaConsultorios = new HashSet<PessoaConsultorio>();
        }

        public int ConCodi { get; set; }
        public string ConDesc { get; set; } = null!;
        public bool ConStat { get; set; }
        public string? ConFoto { get; set; }

        public virtual ICollection<PessoaConsultorio> PessoaConsultorios { get; set; }
    }
}
