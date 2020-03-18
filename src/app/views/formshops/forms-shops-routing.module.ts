import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppURl } from 'src/app/config/app-urls.config';
import { FormsShopsPageComponent } from './pages/forms-shops-page/forms-shops-page.component';
import { BackgroundPageComponent } from './pages/background-page/background-page.component';
import { ShopsListPageComponent } from './pages/shops-list-page/shops-list-page.component';


const routes: Routes = [
  { path: AppURl.AppFormBackgroundShopsRoot, redirectTo: AppURl.AppFormBackgroundShops, pathMatch: 'full' },
  {
    path: AppURl.AppFormBackgroundShops, component: BackgroundPageComponent, children: [
      { path: AppURl.AppFormShops, component: FormsShopsPageComponent },
      { path: AppURl.AppShopList, component: ShopsListPageComponent },
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FormsShopsRoutingModule { }