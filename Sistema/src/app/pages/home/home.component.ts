import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ImportsModule } from '../../imports';
import { Router } from '@angular/router';
import { UsuarioLogadoModel } from '../../models/UsuarioLogado.Model';
import { CryptoService } from '../../services/crypto.service';
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImportsModule, CabecalhoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  items: MenuItem[] | undefined;
  objUsuarioLogado: UsuarioLogadoModel = new UsuarioLogadoModel();
  novoObjUsr: UsuarioLogadoModel = new UsuarioLogadoModel();

  constructor(
    private router: Router,
    private cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.novoObjUsr = JSON.parse(this.cryptoService.lerDoSessionStorage("usr"));
    // console.warn(novoObjUsr);

      this.items = [
        {
          label: 'Pessoa',
          route: '/pessoa'
        },
        {
          label: 'Consultórios',
          route: '/consultorio',
          visible: this.ValidaPermissao('Menu Cadastro de Consultório')
        },
        {
          label: 'Carteira',
          route: '/cadastro-carteira'
        },
        // {
        //   label: 'Logout',
        //   command: () => {
        //     this.logout();
        //   },
        // }
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

  ValidaPermissao(perDesc: string) {
    let perm = this.novoObjUsr.lstPermissoes.find(p => p.PerDesc === perDesc)?.PerAtiv;
    return perm;
  }
}
