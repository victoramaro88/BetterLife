import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { CarteiraBariatricaModel } from "../models/carteirabariatrica.model";
import { TipoPessoaModel } from "../models/TipoPessoa.Model";
import { GeneroModel } from "../models/Genero.Model";
import { TipoDocumentoModel } from "../models/TipoDocumento.Model";
import { TipoContatoModel } from "../models/TipoContato.Model";

@Injectable({
    providedIn: 'root'
  })

export class HttpService {

    constructor(private http: HttpClient) { }

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

}
