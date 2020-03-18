import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsShopsRoutingModule } from './forms-shops-routing.module';
import { FormsShopsPageComponent } from './pages/forms-shops-page/forms-shops-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopsListPageComponent } from './pages/shops-list-page/shops-list-page.component';
import { BackgroundPageComponent } from './pages/background-page/background-page.component';

//Ver si es necesario o no los exports o sólo los declarations

@NgModule({
  declarations: [BackgroundPageComponent,FormsShopsPageComponent, ShopsListPageComponent],
  imports: [
    CommonModule,
    FormsShopsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class FormsShopsModule { }


