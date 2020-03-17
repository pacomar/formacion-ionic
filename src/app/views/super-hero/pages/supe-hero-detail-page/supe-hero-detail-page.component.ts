import { SuperheroService } from './../../../../core/services/superhero.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../../core/models/hero';

@Component({
  selector: 'app-supe-hero-detail-page',
  templateUrl: './supe-hero-detail-page.component.html',
  styleUrls: ['./supe-hero-detail-page.component.scss'],
})
export class SupeHeroDetailPageComponent implements OnInit {
  hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private superheroService: SuperheroService
  ) {}

  ngOnInit() {
    this.superheroService.getSuperheroDetail(this.route.snapshot.paramMap.get('id'))
      .subscribe(data => {
        console.log(data);
        this.hero = data;
      }, err => console.log(err));
  }

}
