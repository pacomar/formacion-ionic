import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SuperHeroRoutingModule } from './super-hero-routing.module';
import { SupeHeroListPageComponent } from './pages/supe-hero-list-page/supe-hero-list-page.component';
import { SupeHeroDetailPageComponent } from './pages/supe-hero-detail-page/supe-hero-detail-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperHeroRoutingModule
  ],
  declarations: [
    SupeHeroListPageComponent,
    SupeHeroDetailPageComponent
  ],
})
export class SuperHeroModule { }
