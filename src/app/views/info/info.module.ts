import { ContactTwoPageComponent } from './pages/contact-two-page/contact-two-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoRoutingModule } from './info-routing.module';
import { ContactOnePageComponent } from './pages/contact-one-page/contact-one-page.component';
import {CardModule} from 'primeng/card';



@NgModule({
  declarations: [
    AboutPageComponent,
    ContactPageComponent,
    ContactOnePageComponent,
    ContactTwoPageComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    CardModule
  ],
  providers: []
})
export class InfoModule { }
