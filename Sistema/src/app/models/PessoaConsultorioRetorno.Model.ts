export class PessoaConsultorioRetornoModel {
  pesCodi: number;
  pesNome: string;
  tipDesc: string;
  pesStat: boolean;

  constructor() {
    this.pesCodi = 0;
    this.pesNome = "";
    this.tipDesc = "";
    this.pesStat = false;
  }
}
