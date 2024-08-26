import { ContatoModel } from "./Contato.Model";
import { DocumentoModel } from "./Documento.Model";

export class PessoaDTO {
  pesCodi: number;
  pesNome: string;
  pesFoto: string;
  pesNasc: Date;
  pesStat: boolean;
  tipCodi: number;
  genCodi: number;

  listaContatos: ContatoModel[];
  listaDocumentos: DocumentoModel[];

  constructor() {
    this.pesCodi = 0;
    this.pesNome = "";
    this.pesFoto = "";
    this.pesNasc = new Date();
    this.pesStat = false;
    this.tipCodi = 0;
    this.genCodi = 0;

    this.listaContatos = [];
    this.listaDocumentos = [];
  }
}
