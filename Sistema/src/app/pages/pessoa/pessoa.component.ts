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
import { Utils } from '../../services/utils';
import { Router } from '@angular/router';
import { UsuarioLogadoModel } from '../../models/UsuarioLogado.Model';
import { CryptoService } from '../../services/crypto.service';
import { PessoaConsultorioRetornoModel } from '../../models/PessoaConsultorioRetorno.Model';


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
  novoObjUsr: UsuarioLogadoModel = new UsuarioLogadoModel();

  listaPessoaConsultorio: PessoaConsultorioRetornoModel[] = [];
  objUsuarioLogado: UsuarioLogadoModel = new UsuarioLogadoModel();
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
  boolEditarSalvar: boolean = false;

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private utils: Utils,
    private router: Router,
    private cryptoService: CryptoService
  ) { }

  ngOnInit(): void {
    this.novoObjUsr = JSON.parse(this.cryptoService.lerDoSessionStorage("usr"));
    // console.warn(this.novoObjUsr);

    this.GetPessoaByIdConsultorio(this.novoObjUsr.conCodi);
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

  GetPessoaByIdConsultorio(conCodi: number) {
    this.blockLoading = true;
    this.listaPessoaConsultorio = [];
    try {
      this.http.GetPessoaByIdConsultorio(conCodi).subscribe({
        next: (response) => {
          this.listaPessoaConsultorio = response;
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

  GetPessoaById(pesCodi: number) {
    this.blockLoading = true;
    try {
      this.http.GetPessoaById(pesCodi).subscribe({
        next: (response) => {
          // console.warn("Retorno:", response);
          this.objPessoa.pesCodi = response.PesCodi;
          this.objPessoa.pesNome = response.PesNome;
          this.objPessoa.pesNasc = new Date(response.PesNasc);

          this.base64Image = response.PesFoto;
          this.imagePreview = response.PesFoto;
          this.imageName = "Imagem";
          this.objTipoPessoa = this.lstTipoPessoa.find(p => p.TipCodi === response.TipCodi)!;
          this.objGenero = this.lstGenero.find(g => g.GenCodi === response.GenCodi)!;
          response.Documentos.forEach((item: any) => {
            let objDoc: DocumentoModel = {
              DocCodi: item.DocCodi,
              DocNume: item.DocNume,
              DocStat: true,
              PesCodi: item.PesCodi,
              TidCodi: item.TidCodi
            };
            this.lstDocumento.push(objDoc);
          });
          response.PessoaContatos.forEach((itemCtt: any) => {
            let objContato: ContatoModel = {
              CttCodi: itemCtt.CttCodiNavigation.CttCodi,
              CttDesc: itemCtt.CttCodiNavigation.CttDesc,
              CttStat: itemCtt.CttCodiNavigation.CttStat,
              TicCodi: itemCtt.CttCodiNavigation.TicCodi
            };
            this.lstContato.push(objContato);
          });

          this.boolEditarSalvar = true;
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

  AlteraStatusPessoa(pesCodi: number, pesStat: boolean) {
    this.blockLoading = true;
    try {
      this.http.AlteraStatusPessoa(pesCodi, pesStat).subscribe({
        next: (response) => {
          if (response === "Alterado com sucesso!")
          {
            this.messageService.add({severity:'success', summary:'Sucesso!', detail: 'Alterado com sucesso!'});
          }
          this.GetPessoaByIdConsultorio(this.novoObjUsr.conCodi);
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
          this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  EditarPessoa(pesCodi: number) {
    this.blockLoading = true;
  }

  AddDoc() {
    this.objDocumento.DocStat = true;
    this.objDocumento.TidCodi = this.objTipoDocumento ? this.objTipoDocumento.TidCodi : 0;
    if (this.objDocumento.TidCodi > 0) {
      if (this.objDocumento.DocNume.length > 0) {
        //-> Verificando se já existe um tipo de documento já cadastrado, que pode apenas um.
        const existeDoc = this.lstDocumento.some(d => d.TidCodi === this.objDocumento.TidCodi);
        if (!existeDoc) {
          if (this.objDocumento.TidCodi === 1) { //-> CPF
            let cpfValido: boolean = this.utils.ValidarCpf(this.objDocumento.DocNume);
            if (cpfValido) {
              this.lstDocumento.push(this.objDocumento);
              this.RetornaNomeDoc(this.objDocumento.TidCodi);

              this.objDocumento = new DocumentoModel();
              this.objTipoDocumento = new TipoDocumentoModel();
            } else {
              this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Número de CPF inválido.'});
            }
          } else {
            this.lstDocumento.push(this.objDocumento);
            this.RetornaNomeDoc(this.objDocumento.TidCodi);

            this.objDocumento = new DocumentoModel();
            this.objTipoDocumento = new TipoDocumentoModel();
          }
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
        if (this.objContato.TicCodi === 2) { //-> E-mail
          if (this.utils.ValidarEmail(this.objContato.CttDesc)) {
            this.lstContato.push(this.objContato);
            this.RetornaNomeCtt(this.objContato.TicCodi);
            this.objContato = new ContatoModel();
            this.objTipoContato = new TipoContatoModel();
          } else {
            this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'E-mail inválido.'});
          }
        } else {
          this.lstContato.push(this.objContato);
          this.RetornaNomeCtt(this.objContato.TicCodi);
          this.objContato = new ContatoModel();
          this.objTipoContato = new TipoContatoModel();
        }
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

  NovoRegistro() {
    this.boolEditarSalvar = true;
  }

  CancelaForm() {
    this.router.navigate(['/home']);
  }

  Salvar() {
    this.blockLoading = true;

    this.objPessoa.pesStat = true;
    this.objPessoa.pesFoto = this.base64Image!;
    this.objPessoa.tipCodi = this.objTipoPessoa.TipCodi;
    this.objPessoa.genCodi = this.objGenero.GenCodi;
    this.objPessoa.conCodi = this.novoObjUsr.conCodi;
    this.objPessoa.listaDocumentos = this.lstDocumento;
    this.objPessoa.listaContatos = this.lstContato;

    if (this.Valida()) {
      // console.warn("Pessoa: ", this.objPessoa);
      if (this.objPessoa.pesCodi == 0) {
        try {
          this.http.InserirPessoa(this.objPessoa).subscribe({
            next: (response) => {
              this.blockLoading = false;
              if (response === "OK") {
                this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro salvo com sucesso!' });
              }
            },
            error: (error) => {
              this.blockLoading = false;
              console.error('Erro ao inserir a pessoa:', error);
              this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: 'Erro ao inserir a pessoa:' + error.status });
            }
          });
        } catch (error) {
          this.blockLoading = false;
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: 'Erro ao inserir a pessoa:' + error });
        }
      } else {
        this.blockLoading = false;
        console.warn('FAZER ROTINA PARA ALTERAR A PESSOA');
        this.messageService.add({ severity: 'error', summary: 'ATENÇÃO!', detail: 'FAZER ROTINA PARA ALTERAR A PESSOA' });
      }
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

    this.boolEditarSalvar = false;

    // this.router.navigate(['/home']);
    this.GetPessoaByIdConsultorio(this.novoObjUsr.conCodi);
  }

  Valida() {
    //-> Verificando se o cadastro possui um número de CPF como documento:
    let possuiCPF: boolean = false;
    this.objPessoa.listaDocumentos.forEach(itemDoc => {
      possuiCPF = itemDoc.TidCodi === 1;
    });

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
                    if (possuiCPF) {
                      return true;
                    } else {
                      this.blockLoading = false;
                      this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Documento CPF é obrigatório para o cadastro.'});
                      return false;
                    }
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
