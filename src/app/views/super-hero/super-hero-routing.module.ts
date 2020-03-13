import { SupeHeroDetailPageComponent } from './pages/supe-hero-detail-page/supe-hero-detail-page.component';
import { SupeHeroListPageComponent } from './pages/supe-hero-list-page/supe-hero-list-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppURl } from 'src/app/config/app-urls.config';

const routes: Routes = [
  { path: AppURl.AppSuperHeroRoot, redirectTo: AppURl.AppSuperHeroList, pathMatch: 'full' },
  { path: AppURl.AppSuperHeroList, component: SupeHeroListPageComponent},
  { path: AppURl.AppSuperHeroDetail, component: SupeHeroDetailPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SuperHeroRoutingModule { }
