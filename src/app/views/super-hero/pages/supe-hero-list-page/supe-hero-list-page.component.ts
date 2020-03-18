import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SuperheroService } from '../../../../core/services/superhero.service';
import { Hero } from '../../../../core/models/hero';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IonicCourseState } from 'src/app/core/store/reducers';
import * as superHeroListState from '../../../../core/store/super-hero-list/super-hero-list.state';
import { SetSuperHeroList } from 'src/app/core/store/super-hero-list/super-hero-list.action';

@Component({
  selector: 'app-supe-hero-list-page',
  templateUrl: './supe-hero-list-page.component.html',
  styleUrls: ['./supe-hero-list-page.component.scss'],
})
export class SupeHeroListPageComponent implements OnInit {
  heroes: Hero[];
  heroes$: Observable<Hero[]>;

  constructor(
    private superheroService: SuperheroService,
    private router: Router,
    private store: Store<IonicCourseState>
  ) { }

  ngOnInit() {
    this.superheroService.getSuperheroAll().subscribe(data => {
      const aux = [];
      data.map(item => {
        aux.push(new Hero(item.id, item.name, []));
      });
      // this.heroes = aux;
      this.store.dispatch(new SetSuperHeroList(aux));
      console.log(this.heroes);
    }, err => {
      console.log('Error SupeHeroListPageComponent-getSuperheroAll: ' + err);
    });

    this.heroes$ = this.store.select(superHeroListState.getSuperHeroList);
    this.heroes$.subscribe(data => this.heroes = data);
  }

  goToDetail(id: number) {
    this.router.navigate(['super-hero', 'detail', id]);
  }
}
