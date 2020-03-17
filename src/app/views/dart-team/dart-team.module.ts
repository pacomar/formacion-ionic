import { DetailDartTeamPageComponent } from './pages/detail-dart-team-page/detail-dart-team-page.component';
import { ListDartTeamPageComponent } from './pages/list-dart-team-page/list-dart-team-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDartTeamPageComponent } from './pages/create-dart-team-page/create-dart-team-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DartTeamRoutingModule } from './dart-team-routing.module';



@NgModule({
  declarations: [
    CreateDartTeamPageComponent,
    ListDartTeamPageComponent,
    DetailDartTeamPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DartTeamRoutingModule
  ]
})
export class DartTeamModule { }
