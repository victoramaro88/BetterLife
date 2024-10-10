import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ImportsModule } from '../../imports';
import { HttpService } from '../../services/http-service.service';
import { UsuarioLogadoModel } from '../../models/UsuarioLogado.Model';
import { CryptoService } from '../../services/crypto.service';

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
  objUsuarioLogado: UsuarioLogadoModel = new UsuarioLogadoModel();

  constructor(
    private router: Router,
    private http: HttpService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private cryptoService: CryptoService
  ) {
    this.formulario = this.formBuilder.group({
      usr: ['', Validators.required],
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
    this.boolLoading = true;
    try {
      this.http.ValidarLogin(this.formulario.value.usr.replace('.', '').replace('.', '').replace('-', ''), this.formulario.value.senha).subscribe({
        next: (response) => {
          // console.warn('Perfil carregado:', response);
          this.objUsuarioLogado = response;
          this.cryptoService.salvarNoSessionStorage("usr", JSON.stringify(this.objUsuarioLogado));
          // console.warn(this.cryptoService.lerDoSessionStorage("usr"));
          this.router.navigate(['/home']);
          this.boolLoading = false;

          // this.http.GetPermissaoByTusCodi(this.objUsuarioLogado.).subscribe({
          //   next: (responsePermissao) => {
          //     console.warn('Permissões:', responsePermissao);
          //     this.cryptoService.salvarNoSessionStorage("perm", JSON.stringify(responsePermissao));
          //     // console.warn(this.cryptoService.lerDoSessionStorage("usr"));
          //     this.router.navigate(['/home']);
          //     this.boolLoading = false;
          //   },
          //   error: (error) => {
          //     this.boolLoading = false;
          //     if(error.error ==='Senha incorreta.') {
          //       this.messageService.add({severity:'error', summary:'Erro: ', detail: error.error});
          //     } else if(error.error ==='Usuário não encontrado.') {
          //       this.messageService.add({severity:'error', summary:'Erro: ', detail: error.error});
          //     } else {
          //       this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
          //     }
          //   }
          // });
        },
        error: (error) => {
          this.boolLoading = false;
          if(error.error ==='Senha incorreta.') {
            this.messageService.add({severity:'error', summary:'Erro: ', detail: error.error});
          } else if(error.error ==='Usuário não encontrado.') {
            this.messageService.add({severity:'error', summary:'Erro: ', detail: error.error});
          } else {
            this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
          }
        }
      });
    } catch (error) {
      console.warn(error);
    }
  }

}
