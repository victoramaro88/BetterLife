import { ValidaCarteiraComponent } from './pages/valida-carteira/valida-carteira.component';
import { Routes } from '@angular/router';
import { CarteiraBariatricaComponent } from './pages/carteira-bariatrica/carteira-bariatrica.component';

export const routes: Routes = [
  { path: '', component: CarteiraBariatricaComponent },
  { path: 'valida', component: ValidaCarteiraComponent },
];
