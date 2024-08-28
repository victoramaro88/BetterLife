import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http-service.service';
import { ImportsModule } from '../../imports';
import { ConsultorioModel } from '../../models/Consultorio.Model';

@Component({
  selector: 'app-consultorio',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './consultorio.component.html',
  styleUrl: './consultorio.component.css'
})
export class ConsultorioComponent implements OnInit {

  blockLoading: boolean = true;
  lstConsultorio: ConsultorioModel[] = [];

  constructor(
    private http: HttpService
    , private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.GetConsultorio();
  }

  GetConsultorio() {
    try {
      this.http.GetConsultorio().subscribe({
        next: (response) => {
          this.lstConsultorio = response;
          console.warn('Consultórios:', this.lstConsultorio);

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
