import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroRoutingModule } from './super-hero-routing.module';
import { SuperheroService } from '../../core/services/superhero.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SuperHeroRoutingModule
  ],
  providers: [
    SuperheroService
  ]
})
export class SuperHeroModule { }
