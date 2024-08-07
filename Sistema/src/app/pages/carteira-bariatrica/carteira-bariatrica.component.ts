import { ImportsModule } from '../../imports';
import { Component, OnInit } from '@angular/core';
import { QRCodeService } from '../../services/qr-code.service';
import { HttpService } from '../../services/http-service.service';
import { CarteiraBariatricaModel } from '../../models/carteirabariatrica.model';
import { ActivatedRoute } from '@angular/router';
import { Base64Service } from '../../services/base64.service';

@Component({
  selector: 'app-carteira-bariatrica',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './carteira-bariatrica.component.html',
  styleUrl: './carteira-bariatrica.component.css'
})
export class CarteiraBariatricaComponent implements OnInit {

  isFlipped: boolean = false;
  qrData = 'https://www.google.com.br';
  qrCodeImage: string | undefined;
  objCarteira: CarteiraBariatricaModel | undefined;
  pesCodi: number = 0;

  constructor(
    private qrCodeService: QRCodeService
    , private http: HttpService
    , private route: ActivatedRoute
    , private base64Service: Base64Service
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pesCodi = params['data'];
    });
    console.log(this.pesCodi);

    let originalNumber: number = this.pesCodi;
    let base64String: string = '';
    let decodedNumber: number = 0;
    base64String = this.base64Service.convertNumberToBase64(originalNumber);
    decodedNumber = this.base64Service.decodeBase64ToNumber(base64String);
    console.warn('NÚMERO ORIGINAL: ', originalNumber);
    console.warn('NÚMERO CONVERTIDO: ', base64String);
    console.warn('NÚMERO DECODIFICADO: ', decodedNumber);

    this.GetCarteira(this.pesCodi);
    // this.GetCarteira(1);

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
        // console.warn("Retorno:", this.objCarteira);

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
