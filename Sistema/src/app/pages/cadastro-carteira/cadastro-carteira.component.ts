import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service.service';
import { Utils } from '../../services/utils';
import { Router } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { Base64Service } from '../../services/base64.service';
import { ImportsModule } from '../../imports';
import { FormsModule } from '@angular/forms';
import { HospitalModel } from '../../models/Hospital.Model';
import { MessageService } from 'primeng/api';
import { TipoCirurgia } from '../../models/TipoCirurgia.Model';
import { CarteiraByConsultorioModel } from '../../models/CarteiraByConsultorio.Model';
import { UsuarioLogadoModel } from '../../models/UsuarioLogado.Model';
import { PessoaConsultorioRetornoModel } from '../../models/PessoaConsultorioRetorno.Model';
import { MedicoConsultorioModel } from '../../models/MedicoConsultorio.Model';
import { CarteiraBariatricaModel } from '../../models/carteirabariatrica.model';
import { CarteiraModel } from '../../models/Carteira.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cadastro-carteira',
  standalone: true,
  imports: [ImportsModule, FormsModule],
  templateUrl: './cadastro-carteira.component.html',
  styleUrl: './cadastro-carteira.component.css',
  providers: [MessageService]
})
export class CadastroCarteiraComponent implements OnInit {

  blockLoading: boolean = true;
  novoObjUsr: UsuarioLogadoModel = new UsuarioLogadoModel();
  boolEditarSalvar: boolean = false;

  lstHospitais: HospitalModel[] = [];
  objHospitais: HospitalModel = new HospitalModel();
  lstTipoCirurgia: TipoCirurgia[] = [];
  objTipoCirurgia: TipoCirurgia = new TipoCirurgia();
  lstCarteira: CarteiraByConsultorioModel[] = [];
  lstPessoaConsultorio: PessoaConsultorioRetornoModel[] = [];
  objPessoaConsultorio: PessoaConsultorioRetornoModel = new PessoaConsultorioRetornoModel();
  lstMedicoConsultorio: MedicoConsultorioModel[] = [];
  objMedicoConsultorio: MedicoConsultorioModel = new MedicoConsultorioModel();
  objCarteira: CarteiraBariatricaModel = new CarteiraBariatricaModel();
  objManterCarteira: CarteiraModel = new CarteiraModel();
  boolCarteiraExistente: boolean = false;
  boolVisualizaLink: boolean = false;
  urlLinkCarteira: string = "";
  boolEditar: boolean = false;
  nomePessoa: string = "";

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private utils: Utils,
    private router: Router,
    private cryptoService: CryptoService,
    private base64Service: Base64Service
  ) {
    this.novoObjUsr = JSON.parse(this.cryptoService.lerDoSessionStorage("usr"));
    // console.warn(this.novoObjUsr);
  }

  ngOnInit(): void {
    this.GetCarteiraByConsultorio(this.novoObjUsr.conCodi);
  }

  // #region CONSULTAS INICIAIS

  GetCarteiraByConsultorio(conCodi: number) {
    this.blockLoading = true;
    try {
      this.http.GetCarteiraByConsultorio(conCodi).subscribe({
        next: (response) => {
          this.lstCarteira = response;
          // console.warn("Carteiras:", this.lstCarteira);
          this.GetHospitals(0);
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  GetHospitals(hosCodi: number) {
    try {
      this.http.GetHospital(hosCodi).subscribe({
        next: (response) => {
          this.lstHospitais = response;
          this.GetTipoCirurgia(0);
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  GetTipoCirurgia(tpcCodi: number) {
    try {
      this.http.GetTipoCirurgia(tpcCodi).subscribe({
        next: (response) => {
          this.lstTipoCirurgia = response;
          this.GetMedicoByConsultorio(this.novoObjUsr.conCodi);
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  GetMedicoByConsultorio(conCodi: number) {
    this.blockLoading = true;
    this.lstPessoaConsultorio = [];
    try {
      this.http.GetMedicoByConsultorio(conCodi).subscribe({
        next: (response) => {
          this.lstMedicoConsultorio = response;
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

  // #endregion

  GetPessoaByIdConsultorio(conCodi: number) {
    this.blockLoading = true;
    this.lstPessoaConsultorio = [];
    try {
      this.http.GetPessoaByIdConsultorio(conCodi).subscribe({
        next: (response) => {
          //-> Filtrando apenas os pacientes nessa consulta.
          this.lstPessoaConsultorio = response.filter(p => p.tipDesc === 'Paciente');
          // console.warn(this.lstPessoaConsultorio);
          this.blockLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      });

      this.GetMedicoByConsultorio(conCodi);
    } catch (error) {
      console.error(error);
    }
  }

  GetCarteiraByCPF(docNume: string) {
    this.blockLoading = true;
    try {
      this.http.GetCarteiraByCPF(docNume).subscribe({
        next: (response) => {
          this.objCarteira = response;
          console.warn(this.objCarteira);
          this.blockLoading = false;
        },
        error: (error) => {
          // console.error('Erro ao carregar dados:', error);
          console.warn("Carteira não encontrada!");
          this.blockLoading = false;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  VerificaCarteiraExistente(docNume: string) {
    this.blockLoading = true;
    this.objCarteira = new CarteiraBariatricaModel();
    try {
      this.http.GetCarteiraByCPF(docNume).subscribe({
        next: (response) => {
          this.objCarteira = response;
          if (this.objCarteira.carCodi > 0) {
            this.boolCarteiraExistente = true;
          }
          this.blockLoading = false;
        },
        error: (error) => {
          // console.error('Erro ao carregar dados:', error);
          this.boolCarteiraExistente = false;
          this.blockLoading = false;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  LimpaDropPessoa() {
    this.objPessoaConsultorio = new PessoaConsultorioRetornoModel();
    this.boolCarteiraExistente = false;
  }

  NovoRegistro() {
    this.boolEditarSalvar = true;
    this.GetPessoaByIdConsultorio(this.novoObjUsr.conCodi);
  }

  CancelaForm() {
    this.router.navigate(['/home']);
  }

  Salvar() {
    this.blockLoading = true;
    this.objManterCarteira.tpcCodi = this.objTipoCirurgia.TpcCodi;
    this.objManterCarteira.hosCodi = this.objHospitais.HosCodi;
    this.objManterCarteira.pesCodi = this.objPessoaConsultorio.pesCodi;
    this.objManterCarteira.pecCodi = this.objMedicoConsultorio.pecCodi;
    this.objManterCarteira.carStat = true;

    if (this.ValidaInformacoes()) {
      console.warn("OK");
      console.warn("Carteira:", this.objManterCarteira);
      try {
        if (this.objManterCarteira.carCodi === 0) {
          console.warn('INSERE O REGISTRO');
          // this.http.PostCarteira(this.objManterCarteira).subscribe({
          //   next: (response) => {
          //     console.warn(response);
          //     this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Carteira salva com sucesso!' });
          //     this.blockLoading = false;
          //     this.Cancelar();
          //   },
          //   error: (error) => {
          //     // console.error('Erro ao carregar dados:', error);
          //     this.messageService.add({severity:'error', summary:'Erro:', detail: 'Falha ao realizar a operação.'});
          //     this.boolCarteiraExistente = false;
          //     this.blockLoading = false;
          //   }
          // });
        } else {
          console.warn('ALTERA O REGISTRO');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("CAMPOS INVÁLIDOS!");
    }
  }

  ValidaInformacoes() {
    if (this.objManterCarteira.pesCodi === 0) {
      this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione uma Pessoa.'});
      this.blockLoading = false;
      return false;
    }
    if (this.objManterCarteira.tpcCodi === 0) {
      this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione o Tipo de Cirurgia.'});
      this.blockLoading = false;
      return false;
    }
    if (this.objManterCarteira.pecCodi === 0) {
      this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione um Médico.'});
      this.blockLoading = false;
      return false;
    }
    if (this.objManterCarteira.hosCodi === 0) {
      this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione o Hospital.'});
      this.blockLoading = false;
      return false;
    }

    return true;
  }

  Cancelar() {
    this.objManterCarteira = new CarteiraModel();
    this.objPessoaConsultorio = new PessoaConsultorioRetornoModel();
    this.objTipoCirurgia = new TipoCirurgia();
    this.objMedicoConsultorio = new MedicoConsultorioModel();
    this.objHospitais = new HospitalModel();
    this.nomePessoa = "";
    this.boolEditar = false;

    this.boolEditarSalvar = false;
    this.GetCarteiraByConsultorio(this.novoObjUsr.conCodi);
  }

  EditarCarteira(carCodi: number, nomePessoa: string) {
    this.blockLoading = true;
    this.boolEditar = true;
    this.nomePessoa = nomePessoa;
    this.http.GetCarteiraById(carCodi).subscribe({
      next: (response) => {
        this.objManterCarteira = response;
        this.objPessoaConsultorio = this.lstPessoaConsultorio.find(p => p.pesCodi === response.pesCodi)!;
        this.objManterCarteira.carDtCi = new Date(response.carDtCi);
        this.objTipoCirurgia = this.lstTipoCirurgia.find(c => c.TpcCodi === response.tpcCodi)!;
        this.objMedicoConsultorio = this.lstMedicoConsultorio.find(m => m.pecCodi === response.pecCodi)!;
        this.objHospitais = this.lstHospitais.find(h => h.HosCodi === response.hosCodi)!;

        this.boolEditarSalvar = true;
        this.blockLoading = false;
      },
      error: (error) => {
        // console.error('Erro ao carregar dados:', error);
        this.messageService.add({severity:'error', summary:'Erro:', detail: 'Falha ao realizar a operação.'});
        this.boolCarteiraExistente = false;
        this.blockLoading = false;
      }
    });
  }

  ExibirLink(docNume: number) {
    this.urlLinkCarteira = environment.linkExibirCarteira + this.base64Service.convertNumberToBase64(docNume);
    this.boolVisualizaLink = true;
  }

  mensagem: string = "";
  CopiarTexto() {
    // Verifica se o navegador suporta a Clipboard API
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.urlLinkCarteira)
        .then(() => {
          this.mensagem = 'Texto copiado com sucesso!';
          // Limpa a mensagem após 3 segundos
          setTimeout(() => {
            this.mensagem = '';
          }, 3000);
        })
        .catch(err => {
          console.error('Erro ao copiar texto: ', err);
          this.mensagem = 'Falha ao copiar o texto.';
        });
    } else {
      console.warn('Clipboard API não suportada');
      this.mensagem = 'Clipboard API não suportada neste navegador.';
    }
  }
}
