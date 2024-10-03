import { CarteiraModel } from './../models/Carteira.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from "../../environments/environment";
import { CarteiraBariatricaModel } from "../models/carteirabariatrica.model";
import { TipoPessoaModel } from "../models/TipoPessoa.Model";
import { GeneroModel } from "../models/Genero.Model";
import { TipoDocumentoModel } from "../models/TipoDocumento.Model";
import { TipoContatoModel } from "../models/TipoContato.Model";
import { PessoaDTO } from "../models/PessoaDTO.Model";
import { ConsultorioModel } from "../models/Consultorio.Model";
import { LoginModel } from "../models/Login.Model";
import { UsuarioLogadoModel } from "../models/UsuarioLogado.Model";
import { PessoaConsultorioRetornoModel } from "../models/PessoaConsultorioRetorno.Model";
import { CarteiraByConsultorioModel } from "../models/CarteiraByConsultorio.Model";
import { MedicoConsultorioModel } from "../models/MedicoConsultorio.Model";

@Injectable({
    providedIn: 'root'
  })

export class HttpService {

  constructor(private http: HttpClient) { }

  // #region GET

  public GetCarteiraByCPF(docNume: string): Observable<CarteiraBariatricaModel> {
    return this.http.get<CarteiraBariatricaModel>(`${environment.apiServicos}/CarteiraBariatrica/GetCarteiraByCPF/${docNume}`);
  }

  public GetCarteiraById(carCodi: number): Observable<CarteiraModel> {
    return this.http.get<CarteiraModel>(`${environment.apiServicos}/CarteiraBariatrica/GetCarteiraById/${carCodi}`);
  }

  public GetCarteiraByConsultorio(conCodi: number): Observable<CarteiraByConsultorioModel[]> {
      return this.http.get<CarteiraByConsultorioModel[]>(`${environment.apiServicos}/CarteiraBariatrica/GetCarteiraByConsultorio/${conCodi}`);
  }

  public GetTipoPessoa(): Observable<TipoPessoaModel[]> {
    return this.http.get<TipoPessoaModel[]>(`${environment.apiServicos}/TipoPessoa`);
  }

  public GetGenero(): Observable<GeneroModel[]> {
    return this.http.get<GeneroModel[]>(`${environment.apiServicos}/Genero`);
  }

  public GetTipoDocumento(): Observable<TipoDocumentoModel[]> {
    return this.http.get<TipoDocumentoModel[]>(`${environment.apiServicos}/TipoDocumentos`);
  }

  public GetTipoContato(): Observable<TipoContatoModel[]> {
    return this.http.get<TipoContatoModel[]>(`${environment.apiServicos}/TipoContato`);
  }

  public GetConsultorios(): Observable<ConsultorioModel[]> {
    return this.http.get<ConsultorioModel[]>(`${environment.apiServicos}/Consultorio`);
  }

  public GetConsultorio(conCodi: number): Observable<ConsultorioModel> {
    return this.http.get<ConsultorioModel>(`${environment.apiServicos}/Consultorio/${conCodi}`);
  }

  public GetPessoaByIdConsultorio(conCodi: number): Observable<PessoaConsultorioRetornoModel[]> {
    return this.http.get<PessoaConsultorioRetornoModel[]>(`${environment.apiServicos}/Pessoa/GetPessoaByIdConsultorio/${conCodi}`);
  }

  public GetPessoaById(pesCodi: number): Observable<any> {
    return this.http.get<any>(`${environment.apiServicos}/Pessoa/GetPessoaById/${pesCodi}`);
  }

  public GetPessoaByCPF(cpf: string): Observable<any> {
    return this.http.get<any>(`${environment.apiServicos}/Pessoa/GetPessoaByCPF/${cpf}`);
  }

  public AlteraStatusPessoa(pesCodi: number, statusAtual: boolean): Observable<string> {
    return this.http.get<string>(`${environment.apiServicos}/Pessoa/AlteraStatusPessoa/${pesCodi}/${statusAtual}`);
  }

  public GetTipoCirurgia(tpcCodi: number): Observable<any> {
    if (tpcCodi > 0) {
      return this.http.get<any>(`${environment.apiServicos}/TipoCirurgia/${tpcCodi}`);
    } else {
      return this.http.get<any>(`${environment.apiServicos}/TipoCirurgia`);
    }
  }

  public GetHospital(hosCodi: number): Observable<any> {
    if (hosCodi > 0) {
      return this.http.get<any>(`${environment.apiServicos}/Hospital/${hosCodi}`);
    } else {
      return this.http.get<any>(`${environment.apiServicos}/Hospital`);
    }
  }

  public GetMedicoByConsultorio(conCodi: number): Observable<MedicoConsultorioModel[]> {
    return this.http.get<MedicoConsultorioModel[]>(`${environment.apiServicos}/PessoaConsultorio/GetMedicoByConsultorio/${conCodi}`);
  }

  // #endregion

  // #region POST
  public InserirPessoa(objPessoa: PessoaDTO): Observable<string> {
    return this.http.post<string>(`${environment.apiServicos}/Pessoa/InserirPessoa`, objPessoa);
  }
  public EditarPessoa(pesCodi: number, objPessoa: PessoaDTO): Observable<string> {
    return this.http.put<string>(`${environment.apiServicos}/Pessoa/EditarPessoa/${pesCodi}`, objPessoa);
  }

  public PostConsultorio(objConsultorio: ConsultorioModel): Observable<string> {
    return this.http.post<string>(`${environment.apiServicos}/Consultorio`, objConsultorio);
  }

  public PostCarteira(objCarteira: CarteiraModel): Observable<string> {
    return this.http.post<string>(`${environment.apiServicos}/CarteiraBariatrica/PostCarteira`, objCarteira);
  }

  public ValidarLogin(usuario: string, senha: string): Observable<UsuarioLogadoModel> {
    let objLogin: LoginModel = new LoginModel();
    objLogin.usuario = usuario;
    objLogin.senha = senha;
    return this.http.post<UsuarioLogadoModel>(`${environment.apiServicos}/Util/Login`, objLogin);
  }

  // #endregion

  // #region PUT
  public PutConsultorio(conCodi: number, objConsultorio: ConsultorioModel): Observable<string> {
    return this.http.put<string>(`${environment.apiServicos}/Consultorio/${conCodi}`, objConsultorio);
  }
  // #endregion

}
