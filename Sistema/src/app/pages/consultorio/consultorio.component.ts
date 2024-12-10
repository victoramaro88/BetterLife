import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http-service.service';
import { ImportsModule } from '../../imports';
import { ConsultorioModel } from '../../models/Consultorio.Model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consultorio',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './consultorio.component.html',
  styleUrl: './consultorio.component.css',
  providers: [MessageService]
})
export class ConsultorioComponent implements OnInit {

  blockLoading: boolean = true;
  boolEditarSalvar: boolean = false;
  lstConsultorio: ConsultorioModel[] = [];
  objConsultorio: ConsultorioModel = new ConsultorioModel();
  boolModoEdicao: boolean = false;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.GetConsultorios();
  }

  GetConsultorios() {
    try {
      this.blockLoading = true;
      this.http.GetConsultorios().subscribe({
        next: (response) => {
          this.lstConsultorio = response;
          // console.warn('Consultórios:', this.lstConsultorio);

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

  EditarConsultorio(conCodi: number) {
    this.blockLoading = true;
    this.boolEditarSalvar = true;
    this.boolModoEdicao = true;

    this.http.GetConsultorio(conCodi).subscribe({
      next: (response) => {
        this.blockLoading = false;
        this.objConsultorio = response;
        this.imageName = "Imagem";
        this.imagePreview = this.objConsultorio.ConFoto;
        // console.warn('Retorno Pesquisa: ', this.objConsultorio);
      },
      error: (error) => {
        this.blockLoading = false;
        console.error('Erro ao inserir o registro:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: 'Erro ao inserir o registro:' + error.status });
      }
    });
  }

  NovoRegistro() {
    this.boolEditarSalvar = true;
  }

  Salvar() {
    this.blockLoading = true;
    this.objConsultorio.ConFoto = this.base64Image!;
    this.objConsultorio.ConStat = true;

    if (this.Valida()) {
      try {
        if (!this.boolModoEdicao) { //-> SE NÃO FOR EDIÇÃO, INSERE
          this.http.PostConsultorio(this.objConsultorio).subscribe({
            next: (response) => {
              this.blockLoading = false;
              if (response === "OK") {
                this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro salvo com sucesso!' });
                this.Cancelar();
              }
            },
            error: (error) => {
              this.blockLoading = false;
              console.error('Erro ao inserir o registro:', error);
              this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: 'Erro ao inserir o registro:' + error.status });
            }
          });
        } else { //-> SENÃO, ALTERA
          this.http.PutConsultorio(this.objConsultorio.ConCodi, this.objConsultorio).subscribe({
            next: (response) => {
              this.blockLoading = false;
              if (response === "OK") {
                this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro salvo com sucesso!' });
                this.Cancelar();
              }
            },
            error: (error) => {
              this.blockLoading = false;
              console.error('Erro ao inserir o registro:', error);
              this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: 'Erro ao inserir o registro:' + error.status });
            }
          });
        }
      } catch (error) {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro: ', detail: 'Erro ao inserir o registro:' + error});
      }
    }
  }

  Cancelar() {
    this.boolEditarSalvar = false;
    this.objConsultorio = new ConsultorioModel();
    this.imageName = "";
    this.imagePreview = "";
    this.GetConsultorios();
  }

  CancelaForm() {
    this.router.navigate(['/home']);
  }

  Valida() {
    if (this.objConsultorio.ConDesc.length > 3) {
      if (this.objConsultorio.ConFoto && this.objConsultorio.ConFoto.length > 10) {
        return true;
      } else {
        this.blockLoading = false;
        this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Selecione o logotipo do consultório.'});
        return false;
      }
    } else {
      this.blockLoading = false;
      this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Digite o nome do consultório.'});
      return false;
    }
  }

  // #region PARÂMETROS DA IMAGEM
  imageName: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  base64Image: string | null = null;
  buttonLabel: string = 'Escolher arquivo'; // Rótulo fixo do botão
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.base64Image = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Atualiza o rótulo do botão para mostrar que um arquivo foi selecionado
      this.buttonLabel = 'Arquivo selecionado';
    }
  }
  // #endregion
}
