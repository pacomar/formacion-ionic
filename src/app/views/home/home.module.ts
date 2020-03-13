import { DosComponent } from './components/dos/dos.component';
import { UnoComponent } from './components/uno/uno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSliderModule } from '@angular/material/slider';
import { HomePage } from './pages/home/home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    NgbCarouselModule,
    MatSliderModule
  ],
  declarations: [HomePage, UnoComponent, DosComponent]
})
export class HomePageModule {}
