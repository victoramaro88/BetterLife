import { ImportsModule } from '../../imports';
import { Component, OnInit } from '@angular/core';
import { QRCodeService } from '../../services/qr-code.service';
import { HttpService } from '../../services/http-service.service';
import { CarteiraBariatricaModel } from '../../models/carteirabariatrica.model';
import { ActivatedRoute } from '@angular/router';
import { Base64Service } from '../../services/base64.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-carteira-bariatrica',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './carteira-bariatrica.component.html',
  styleUrl: './carteira-bariatrica.component.css'
})
export class CarteiraBariatricaComponent implements OnInit {

  isFlipped: boolean = false;
  qrData = '';
  qrCodeImage: string | undefined;
  objCarteira: CarteiraBariatricaModel | undefined;
  docNume: string = '';

  constructor(
    private qrCodeService: QRCodeService
    , private http: HttpService
    , private route: ActivatedRoute
    , private base64Service: Base64Service
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.docNume = params['data'];
    });

    if (this.docNume) {
      this.GetCarteira(this.base64Service.decodeBase64ToString(this.docNume));
    }

    //-> Montando o QR-Code da carteira
    this.qrData = environment.urlValidaCarteira + this.docNume;
    this.qrCodeService.generateQRCode(this.qrData).then(qrCode => {
      this.qrCodeImage = qrCode;
    }).catch(error => {
      console.error('Erro ao gerar QR code:', error);
    });
  }

  GetCarteira(docNume: string) {
    this.http.GetCarteira(docNume).subscribe({
      next: (response) => {
        this.objCarteira = response;

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
