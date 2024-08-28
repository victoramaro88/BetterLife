import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ImportsModule } from '../../imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
      this.items = [
        {
          label: 'Pessoa',
          route: '/pessoa'
        },
        {
          label: 'Consultórios',
          route: '/consultorio'
        },
        {
          label: 'Logout',
          command: () => {
            this.logout();
          },
        }
      ];
  }

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
