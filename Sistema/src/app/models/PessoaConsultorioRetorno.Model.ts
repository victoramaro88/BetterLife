export class PessoaConsultorioRetornoModel {
  pesCodi: number;
  pesCPF: string;
  pesNome: string;
  tipDesc: string;
  pesStat: boolean;

  constructor() {
    this.pesCodi = 0;
    this.pesCPF = "";
    this.pesNome = "";
    this.tipDesc = "";
    this.pesStat = false;
  }
}
