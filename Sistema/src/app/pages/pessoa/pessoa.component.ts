import { Component, OnInit } from '@angular/core';
import { PessoaDTO } from '../../models/PessoaDTO.Model';
import { ImportsModule } from '../../imports';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http-service.service';
import { TipoPessoaModel } from '../../models/TipoPessoa.Model';
import { GeneroModel } from '../../models/Genero.Model';
import { MessageService } from 'primeng/api';
import { TipoDocumentoModel } from '../../models/TipoDocumento.Model';
import { DocumentoModel } from '../../models/Documento.Model';
import { TipoContatoModel } from '../../models/TipoContato.Model';
import { ContatoModel } from '../../models/Contato.Model';


@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [ImportsModule, FormsModule],
  templateUrl: './pessoa.component.html',
  styleUrl: './pessoa.component.css',
  providers: [MessageService]
})
export class PessoaComponent implements OnInit {

  objPessoa: PessoaDTO = new PessoaDTO();
  uploadedFiles: any[] = [];
  blockLoading: boolean = true;

  lstTipoPessoa: TipoPessoaModel[] = [];
  objTipoPessoa: TipoPessoaModel = new TipoPessoaModel();
  lstGenero: GeneroModel[] = [];
  objGenero: GeneroModel = new GeneroModel();
  lstTipoDocumento: TipoDocumentoModel[] = [];
  objTipoDocumento: TipoDocumentoModel = new TipoDocumentoModel();
  lstDocumento: DocumentoModel[] = [];
  objDocumento: DocumentoModel = new DocumentoModel();
  lstTipoContato: TipoContatoModel[] = [];
  objTipoContato: TipoContatoModel = new TipoContatoModel();
  lstContato: ContatoModel[] = [];
  objContato: ContatoModel = new ContatoModel();

  constructor(
    private http: HttpService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.GetTipoPessoa();
  }

  GetTipoPessoa() {
    try {
      this.http.GetTipoPessoa().subscribe({
        next: (response) => {
          this.lstTipoPessoa = response;
          // console.warn("TipoPessoa:", this.lstTipoPessoa);
          this.GetGenero();
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  GetGenero() {
    try {
      this.http.GetGenero().subscribe({
        next: (response) => {
          this.lstGenero = response;
          // console.warn("Genero:", this.lstGenero);
          this.GetTipoDocumento();
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  GetTipoDocumento() {
    try {
      this.http.GetTipoDocumento().subscribe({
        next: (response) => {
          this.lstTipoDocumento = response;
          // console.warn("TipoDoc:", this.lstTipoDocumento);
          this.GetTipoContato();
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  GetTipoContato() {
    try {
      this.http.GetTipoContato().subscribe({
        next: (response) => {
          this.lstTipoContato = response;
          // console.warn("TipoCtt:", this.lstTipoContato);
          this.blockLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  AddDoc() {
    this.objDocumento.DocStat = true;
    this.objDocumento.TidCodi = this.objTipoDocumento ? this.objTipoDocumento.TidCodi : 0;
    if (this.objDocumento.TidCodi > 0) {
      if (this.objDocumento.DocNume.length > 0) {
        let existeDoc: boolean = false;
        this.lstDocumento.forEach(itemDoc => {
          existeDoc = itemDoc.TidCodi === this.objDocumento.TidCodi;
        });

        if (!existeDoc) {
          this.lstDocumento.push(this.objDocumento);
          this.RetornaNomeDoc(this.objDocumento.TidCodi);

          this.objDocumento = new DocumentoModel();
          this.objTipoDocumento = new TipoDocumentoModel();
        } else {
          this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Tipo de documento já cadastrado.'});
        }
      } else {
        this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Insira o número do documento.'});
      }
    } else {
      this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione o tipo do documento.'});
    }
  }

  AddCtt() {
    this.objContato.CttStat = true;
    this.objContato.TicCodi = this.objTipoContato ? this.objTipoContato.TicCodi : 0;
    if (this.objContato.TicCodi > 0) {
      if (this.objContato.CttDesc.length > 0) {
        this.lstContato.push(this.objContato);
        this.RetornaNomeCtt(this.objContato.TicCodi);
        console.log(this.lstContato);
        this.objContato = new ContatoModel();
        this.objTipoContato = new TipoContatoModel();
      } else {
        this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Insira os dados do contato.'});
      }
    } else {
      this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione o tipo do contato.'});
    }
  }

  DelDoc(DocNume: string) {
    let indice = this.lstDocumento.findIndex(i => i.DocNume === DocNume);
    if (indice !== -1) {
      this.lstDocumento.splice(indice, 1);
    }
  }

  DelCtt(CttDesc: string) {
    let indice = this.lstContato.findIndex(i => i.CttDesc === CttDesc);
    if (indice !== -1) {
      this.lstContato.splice(indice, 1);
    }
  }

  Salvar() {
    this.objPessoa.pesStat = true;
    this.objPessoa.pesFoto = this.base64Image!;
    this.objPessoa.tipCodi = this.objTipoPessoa.TipCodi;
    this.objPessoa.genCodi = this.objGenero.GenCodi;
    this.objPessoa.listaDocumentos = this.lstDocumento;
    this.objPessoa.listaContatos = this.lstContato;

    if (this.Valida()) {
      console.warn("Pessoa: ", this.objPessoa);
    }
  }

  Cancelar() {
    this.objPessoa = new PessoaDTO();
    this.objGenero = new GeneroModel();
    this.objTipoPessoa = new TipoPessoaModel();
    this.objTipoDocumento = new TipoDocumentoModel();
    this.objTipoContato = new TipoContatoModel();
    this.objDocumento.DocNume = "";
    this.objContato.CttDesc = "";
    this.lstDocumento = [];
    this.lstContato = [];

    this.buttonLabel = 'Escolher arquivo';
    this.imageName = '';
    this.imagePreview = '';
    this.selectedFile = null;
    this.base64Image = '';
  }

  Valida() {
    if (this.objPessoa.pesNome.length >= 5) {
      if (this.objPessoa.pesNasc.getFullYear() !== new Date().getFullYear()) {
        if (this.objPessoa.tipCodi > 0) {
          if (this.objPessoa.genCodi > 0) {
            if (this.objPessoa.pesFoto && this.objPessoa.pesFoto.length > 0) {
              let medico: boolean = false;
              if (this.objPessoa.tipCodi === 1) {
                this.objPessoa.listaDocumentos.forEach(item => {
                  medico = item.TidCodi === this.objPessoa.tipCodi;
                });
              }
              if (this.objPessoa.tipCodi !== 1 || !medico) {
                if (this.lstDocumento.length > 0) {
                  if (this.lstContato.length > 0) {
                    return true;
                  } else {
                    this.blockLoading = false;
                    this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Adicione pelo menos um contato da pessoa.'});
                    return false;
                  }
                } else {
                  this.blockLoading = false;
                  this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Adicione pelo menos um documento da pessoa.'});
                  return false;
                }

              } else {
                this.blockLoading = false;
                this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'O Médico precisa ter um CRM cadastrado.'});
                return false;
              }
            } else {
              this.blockLoading = false;
              this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione a foto da pessoa.'});
              return false;
            }
          } else {
            this.blockLoading = false;
            this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione o gênero da pessoa.'});
            return false;
          }
        } else {
          this.blockLoading = false;
          this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione o tipo de pessoa.'});
          return false;
        }
      } else {
        this.blockLoading = false;
        this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione uma data de nascimento.'});
        return false;
      }
    } else {
      this.blockLoading = false;
      this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Insira um nome.'});
      return false;
    }
  }

  RetornaNomeDoc(TidCodi: number) {
    let ret = this.lstTipoDocumento.find(d => d.TidCodi === TidCodi);
    return ret?.TidDesc;
  }

  RetornaNomeCtt(TicCodi: number) {
    let ret = this.lstTipoContato.find(d => d.TicCodi === TicCodi);
    return ret?.TicDesc;
  }

  // #region PARÂMETROS DA IMAGEM
  imageName: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  base64Image: string | null = null;
  buttonLabel: string = 'Escolher arquivo'; // Rótulo fixo do botão
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.base64Image = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Atualiza o rótulo do botão para mostrar que um arquivo foi selecionado
      this.buttonLabel = 'Arquivo selecionado';
    }
  }
  // #endregion
}
