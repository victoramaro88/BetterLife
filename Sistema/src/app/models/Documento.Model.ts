export class DocumentoModel {
  DocCodi: number;
  DocNume: string;
  DocStat: boolean;
  PesCodi: number;
  TidCodi: number;

  constructor() {
    this.DocCodi = 0;
    this.DocNume = "";
    this.DocStat = false;
    this.PesCodi = 0;
    this.TidCodi = 0;
  }
}
