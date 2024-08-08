import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-valida-carteira',
  standalone: true,
  imports: [],
  templateUrl: './valida-carteira.component.html',
  styleUrl: './valida-carteira.component.css'
})
export class ValidaCarteiraComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const param = params['param'];
      //this.router.navigate(['/carteira'], { queryParams: { data: param } });
    });
  }
}
