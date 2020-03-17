import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppURl } from 'src/app/config/app-urls.config'; 
import { FormsShopsPageComponent } from './pages/forms-shops-page/forms-shops-page.component';


const routes: Routes = [
  { path: AppURl.AppFromShopsRoot, component: FormsShopsPageComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsShopsRoutingModule { }





