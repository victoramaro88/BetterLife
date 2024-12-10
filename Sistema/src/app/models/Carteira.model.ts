export class CarteiraModel {
  carCodi: number;
  carDtCi: Date;
  tpcCodi: number;
  hosCodi: number;
  pesCodi: number;
  pecCodi: number;
  carStat: boolean;

  constructor() {
    this.carCodi = 0;
    this.carDtCi = new Date();
    this.tpcCodi = 0;
    this.hosCodi = 0;
    this.pesCodi = 0;
    this.pecCodi = 0;
    this.carStat = false;
  }
}
