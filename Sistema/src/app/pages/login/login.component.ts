import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ImportsModule } from '../../imports';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  boolLoading = false;
  msgs: any[] = [];

  constructor(
    private router: Router,
    private http: HttpService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      cpf: ['', Validators.required],
      senha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  ValidaFormulario(): void {
    if (this.formulario.valid) {
      this.Login();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  Login(): void {
    this.msgs = [];
    this.boolLoading = true;
    this.http.ValidarLogin(this.formulario.value.cpf.replace('.', '').replace('.', '').replace('-', ''), this.formulario.value.senha).subscribe({
      next: (response) => {
        console.warn('Perfil carregado:', response);
        console.warn('*** NECESSITA VALIDAR O SERVIÇO E LOGIN DA PESSOA ***');
        if (response == "OK") {
          this.router.navigate(['/home']);
          this.boolLoading = false;
        }
      },
      error: (error) => {
        this.msgs = [];
        console.log(error);
        this.boolLoading = false;
        if(error.error ==='Usuario não encontrado.') {
          this.messageService.add({severity:'error', summary:'Erro: ', detail: error.error});
        } else if(error.error ==='Senha inválida.') {
          this.messageService.add({severity:'error', summary:'Erro: ', detail: error.error});
        } else {
          this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
        }
      }
    });
  }

}
