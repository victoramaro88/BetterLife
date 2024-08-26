import { ValidaCarteiraComponent } from './pages/valida-carteira/valida-carteira.component';
import { RouterModule, Routes } from '@angular/router';
import { CarteiraBariatricaComponent } from './pages/carteira-bariatrica/carteira-bariatrica.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { PessoaComponent } from './pages/pessoa/pessoa.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'valida', component: ValidaCarteiraComponent },
  { path: 'carteira', component: CarteiraBariatricaComponent },
  { path: 'pessoa', component: PessoaComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
