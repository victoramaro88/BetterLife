import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Base64Service } from '../../services/base64.service';
import { HttpService } from '../../services/http-service.service';
import { CarteiraBariatricaModel } from '../../models/carteirabariatrica.model';
import { ImportsModule } from '../../imports';

@Component({
  selector: 'app-valida-carteira',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './valida-carteira.component.html',
  styleUrl: './valida-carteira.component.css'
})
export class ValidaCarteiraComponent implements OnInit {

  blockLoading: boolean = true;
  objCarteira: CarteiraBariatricaModel = new CarteiraBariatricaModel();
  docNume: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base64Service: Base64Service,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.docNume = params['data'];
      console.log(this.docNume);
      if (this.docNume) {
        this.ValidaCarteira(this.base64Service.decodeBase64ToString(this.docNume));
      }



      // console.info("Validada!", this.base64Service.decodeBase64ToString(param));
    });
  }

  ValidaCarteira(docNume: string) {
    console.info(docNume);
    this.GetCarteiraByCPF(docNume);
  }

  GetCarteiraByCPF(docNume: string) {
    try {
      this.http.GetCarteiraByCPF(docNume).subscribe({
        next: (response) => {
          this.objCarteira = response;

          this.blockLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
          // this.msgs = [];
          // this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
