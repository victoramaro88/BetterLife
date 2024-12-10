import { PermissaoDTOModel } from "./PermissaoDTO.Model";

export class UsuarioLogadoModel {
  usuCodi: number;
  pesCodi: number;
  pesNome: string;
  pecCodi: number;
  conCodi: number;
  lstPermissoes: PermissaoDTOModel[];

  constructor() {
    this.usuCodi = 0;
    this.pesCodi = 0;
    this.pesNome = "";
    this.pecCodi = 0;
    this.conCodi = 0;
    this.lstPermissoes = [];
  }
}
