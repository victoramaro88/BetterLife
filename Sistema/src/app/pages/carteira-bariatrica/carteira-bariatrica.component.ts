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
  objCarteira: CarteiraBariatricaModel = new CarteiraBariatricaModel();
  docNume: string = '';
  blockLoading: boolean = true;
  mensagemRespCarteira: string = "";
  pesStat: boolean = false;

  constructor(
    private qrCodeService: QRCodeService
    , private http: HttpService
    , private route: ActivatedRoute
    , private base64Service: Base64Service
  ) { }

  ngOnInit(): void {
    try {
      this.mensagemRespCarteira = "Carregando...";
      this.route.queryParams.subscribe(params => {
        this.docNume = params['data'];
      });

      if (this.docNume) {
        this.GetCarteiraByCPF(this.base64Service.decodeBase64ToString(this.docNume));
      }

      //-> Montando o QR-Code da carteira
      this.qrData = environment.urlValidaCarteira + this.docNume;
      this.qrCodeService.generateQRCode(this.qrData).then(qrCode => {
        this.qrCodeImage = qrCode;
      }).catch(error => {
        console.error('Erro ao gerar QR code:', error);
      });
    } catch (error) {
      this.mensagemRespCarteira = "Carteira Inválida!";
      this.blockLoading = false;
    }
  }

  GetCarteiraByCPF(docNume: string) {
    try {
      this.http.GetCarteiraByCPF(docNume).subscribe({
        next: (response) => {
          this.objCarteira = response;
          console.warn("Carteira:", this.objCarteira);
          this.http.GetPessoaByCPF(this.objCarteira.docNume).subscribe({
            next: (response) => {
              console.warn("TipoPessoa:", response);
              this.pesStat = response.PesStat > 0 ? true : false;
              if (!this.pesStat) {
                this.mensagemRespCarteira = "Carteira Inválida!";
              }
            },
            error: (error) => {
              console.error('Erro ao carregar dados:', error);
            }
          });

          this.blockLoading = false;
          this.mensagemRespCarteira = "";
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}
