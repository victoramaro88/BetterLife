import { ValidaCarteiraComponent } from './pages/valida-carteira/valida-carteira.component';
import { RouterModule, Routes } from '@angular/router';
import { CarteiraBariatricaComponent } from './pages/carteira-bariatrica/carteira-bariatrica.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { PessoaComponent } from './pages/pessoa/pessoa.component';
import { HomeComponent } from './pages/home/home.component';
import { ConsultorioComponent } from './pages/consultorio/consultorio.component';
import { CadastroCarteiraComponent } from './pages/cadastro-carteira/cadastro-carteira.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'valida', component: ValidaCarteiraComponent },
  { path: 'carteira', component: CarteiraBariatricaComponent },
  { path: 'pessoa', component: PessoaComponent },
  { path: 'consultorio', component: ConsultorioComponent },
  { path: 'cadastro-carteira', component: CadastroCarteiraComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
