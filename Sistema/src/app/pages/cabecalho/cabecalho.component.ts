import { Router } from '@angular/router';
import { ImportsModule } from './../../imports';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {

  constructor(
    private router: Router
  ) {}

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });

    this.router.navigate(['/login']);
  }

}
