import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { CarteiraBariatricaModel } from "../models/carteirabariatrica.model";

@Injectable({
    providedIn: 'root'
  })

export class HttpService {

    constructor(private http: HttpClient) { }

    public GetCarteira(docNume: string): Observable<CarteiraBariatricaModel> {
        return this.http.get<CarteiraBariatricaModel>(`${environment.apiServicos}/CarteiraBariatrica/${docNume}`);
    }

}
