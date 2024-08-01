import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { WSOModel } from "../models/WSO.Model";
import { GrupoAcessoModel } from "../models/MA/GrupoAcessoModel.model";
import { LoginSingesModel } from "../models/loginSinges.Model";
import { ListaChamadosUORModel } from "../models/Sistema/ListaChamadosUOR.Model";

@Injectable({
    providedIn: 'root'
  })
  
export class HttpService {

    constructor(private http: HttpClient) { }

    public GetCarteira(pesCodi: number): Observable<CarteiraBariatricaModel[]> {
        return this.http.get<ListaChamadosUORModel[]>(`${environment.apiServicos}/GetCarteira/${pesCodi}`);
    }

}