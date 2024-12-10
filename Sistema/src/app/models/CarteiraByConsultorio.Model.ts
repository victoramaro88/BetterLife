export class CarteiraByConsultorioModel {
  carCodi: number;
  pesCodi: number;
  pesNome: string;
  docNume: string;
  pecCodi: number;
  medicoNome: string;
  tpcCodi: number;
  tpcDesc: string;
  hosCodi: number;
  hosDesc: string;
  carDtCi: Date;
  carStat: boolean;

  constructor() {
    this.carCodi = 0;
    this.pesCodi = 0;
    this.pesNome = "";
    this.docNume = "";
    this.pecCodi = 0;
    this.medicoNome = "";
    this.tpcCodi = 0;
    this.tpcDesc = "";
    this.hosCodi = 0;
    this.hosDesc = "";
    this.carDtCi = new Date;
    this.carStat = false;
  }
}
