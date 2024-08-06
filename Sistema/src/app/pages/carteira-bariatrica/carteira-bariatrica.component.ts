import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { QRCodeService } from '../../services/qr-code.service';
import { HttpService } from '../../services/http-service.service';
import { CarteiraBariatricaModel } from '../../models/carteirabariatrica.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carteira-bariatrica',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './carteira-bariatrica.component.html',
  styleUrl: './carteira-bariatrica.component.css'
})
export class CarteiraBariatricaComponent implements OnInit {

  isFlipped: boolean = false;
  qrData = 'https://www.google.com.br';
  qrCodeImage: string | undefined;
  objCarteira: CarteiraBariatricaModel | undefined;

  constructor(
    private qrCodeService: QRCodeService
    , private http: HttpService,) { }

  ngOnInit(): void {
    this.GetCarteira(1);

    this.qrCodeService.generateQRCode(this.qrData).then(qrCode => {
      this.qrCodeImage = qrCode;
    }).catch(error => {
      console.error('Erro ao gerar QR code:', error);
    });
  }

  GetCarteira(pesCodi: number) {
    this.http.GetCarteira(pesCodi).subscribe({
      next: (response) => {
        // console.warn("Retorno:", response);
        this.objCarteira = response;
        console.warn("Retorno:", this.objCarteira);

        // this.visualizarArquivo = true;
        // this.boolLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
        // this.msgs = [];
        // this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
      }
    });
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}
