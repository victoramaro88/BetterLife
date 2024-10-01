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

  GetCarteiraByConsultorio(conCodi: number) {
    try {
      this.http.GetCarteiraByConsultorio(conCodi).subscribe({
        next: (response) => {
          this.lstCarteira = response;
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

  GetCarteiraByCPF(docNume: string) {
    // console.warn(docNume);
    this.blockLoading = true;
    try {
      this.http.GetCarteiraByCPF(docNume).subscribe({
        next: (response) => {
          this.objCarteira = response;
          // console.warn(this.objCarteira);
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

  NovoRegistro() {
    this.boolEditarSalvar = true;
    this.GetPessoaByIdConsultorio(this.novoObjUsr.conCodi);
  }

  CancelaForm() {
    this.router.navigate(['/home']);
  }

  Salvar() {
  }

  Cancelar() {
    this.boolEditarSalvar = false;
  }
}
