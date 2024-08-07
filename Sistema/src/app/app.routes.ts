import { ValidaCarteiraComponent } from './pages/valida-carteira/valida-carteira.component';
import { RouterModule, Routes } from '@angular/router';
import { CarteiraBariatricaComponent } from './pages/carteira-bariatrica/carteira-bariatrica.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'valida/:param', component: ValidaCarteiraComponent },
  { path: 'carteira', component: CarteiraBariatricaComponent },
  // { path: 'valida', component: ValidaCarteiraComponent },
  { path: '**', redirectTo: 'carteira' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
