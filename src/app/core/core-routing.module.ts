import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppURl } from '../config/app-urls.config';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: AppURl.AppRoot, redirectTo: AppURl.AppHome, pathMatch: 'full' },
  { path: AppURl.AppAuth, loadChildren: () => import('../views/auth/auth.module').then(m => m.AuthModule) },
  { path: AppURl.AppHome, loadChildren: () => import('../views/home/home.module').then(m => m.HomePageModule) },
  { path: AppURl.AppInfo, loadChildren: () => import('../views/info/info.module').then(m => m.InfoModule) },
  {
    path: AppURl.AppSuperHero, loadChildren: () => import('../views/super-hero/super-hero.module')
      .then(m => m.SuperHeroModule), canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
