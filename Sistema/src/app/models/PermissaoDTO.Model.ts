export class PermissaoDTOModel {
  PerCodi: number;
  PerDesc: string;
  PerAtiv: boolean;
  PerStat: boolean;
  TusCodi: number;

  constructor() {
    this.PerCodi = 0;
    this.PerDesc = "";
    this.PerAtiv = false;
    this.PerStat = false;
    this.TusCodi = 0;
  }
}
