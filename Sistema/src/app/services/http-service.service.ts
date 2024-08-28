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

@Injectable({
    providedIn: 'root'
  })

export class HttpService {

  constructor(private http: HttpClient) { }

  // #region GET

  public GetCarteira(docNume: string): Observable<CarteiraBariatricaModel> {
      return this.http.get<CarteiraBariatricaModel>(`${environment.apiServicos}/CarteiraBariatrica/${docNume}`);
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

  public GetConsultorio(): Observable<ConsultorioModel[]> {
    return this.http.get<ConsultorioModel[]>(`${environment.apiServicos}/Consultorio`);
  }

  // #endregion

  // #region POST
  public PostPessoa(objPessoa: PessoaDTO): Observable<string> {
    return this.http.post<string>(`${environment.apiServicos}/Pessoa`, objPessoa);
  }

  public ValidarLogin(cpf: string, senha: string): Observable<string> {
    // return this.http.post<string>(`${environment.apiServicos}/Pessoa`, objPessoa);
    return of("OK");
  }

  // #endregion

}
