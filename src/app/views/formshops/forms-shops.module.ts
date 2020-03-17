import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsShopsRoutingModule } from './forms-shops-routing.module';
import { FormsShopsPageComponent } from './pages/forms-shops-page/forms-shops-page.component';


//Ver si es necesario o no los exports o sólo los declarations

@NgModule({
  declarations: [FormsShopsPageComponent],
  imports: [
    CommonModule,
    FormsShopsRoutingModule,
  ],
  exports: [
    FormsShopsPageComponent
  ]
})

export class FormsShopsModule { }


