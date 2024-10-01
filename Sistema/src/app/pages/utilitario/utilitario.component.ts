import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Base64Service } from '../../services/base64.service';
import { HttpService } from '../../services/http-service.service';
import { ImportsModule } from '../../imports';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utilitario',
  standalone: true,
  imports: [ImportsModule, FormsModule],
  templateUrl: './utilitario.component.html',
  styleUrl: './utilitario.component.css'
})
export class UtilitarioComponent implements OnInit {

  cpf: string = "";
  cpfBase64: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base64Service: Base64Service,
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }

  ConverterCPFBase64() {
    this.cpfBase64 = this.base64Service.convertStringToBase64(this.cpf);
  }

}
