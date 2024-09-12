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

  lstHospitais: HospitalModel = new HospitalModel();
  lstTipoCirurgia: TipoCirurgia = new TipoCirurgia();

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private utils: Utils,
    private router: Router,
    private cryptoService: CryptoService,
    private base64Service: Base64Service
  ) { }

  ngOnInit(): void {
    this.GetHospitals(0);
  }

  GetHospitals(hosCodi: number) {
    try {
      this.http.GetHospital(hosCodi).subscribe({
        next: (response) => {
          this.lstHospitais = response;
          console.warn("Hospitais:", this.lstHospitais);
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
          console.warn("TipoCirurgias:", this.lstTipoCirurgia);
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
}
