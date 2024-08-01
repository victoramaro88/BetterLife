import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { QRCodeService } from '../../services/qr-code.service';

@Component({
  selector: 'app-carteira-bariatrica',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './carteira-bariatrica.component.html',
  styleUrl: './carteira-bariatrica.component.css'
})
export class CarteiraBariatricaComponent implements OnInit {

  isFlipped: boolean = false;
  qrData = 'https://www.google.com.br';
  qrCodeImage: string | undefined;

  constructor(private qrCodeService: QRCodeService) { }

  ngOnInit(): void {
    this.qrCodeService.generateQRCode(this.qrData).then(qrCode => {
      this.qrCodeImage = qrCode;
    }).catch(error => {
      console.error('Erro ao gerar QR code:', error);
    });
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}
