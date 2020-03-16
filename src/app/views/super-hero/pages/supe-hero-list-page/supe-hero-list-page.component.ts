import { Component, OnInit } from '@angular/core';
import { SuperheroService } from '../../../../core/services/superhero.service';
import { Hero } from '../../../../core/models/hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supe-hero-list-page',
  templateUrl: './supe-hero-list-page.component.html',
  styleUrls: ['./supe-hero-list-page.component.scss'],
})
export class SupeHeroListPageComponent implements OnInit {
  heroes: Hero[];
  constructor(
    private superheroService: SuperheroService,
    private router: Router
  ) { }

  ngOnInit() {
    this.superheroService.getSuperheroAll().subscribe(data => {
      const aux = [];
      data.map(item => {
        aux.push(new Hero(item.id, item.name, []));
      });
      this.heroes = aux;
      console.log(this.heroes);
    }, err => {
      console.log('Error SupeHeroListPageComponent-getSuperheroAll: ' + err);
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['super-hero', 'detail', id]);
  }
}
