import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppURl } from 'src/app/config/app-urls.config';
import { CreateDartTeamPageComponent } from './pages/create-dart-team-page/create-dart-team-page.component';
import { DetailDartTeamPageComponent } from './pages/detail-dart-team-page/detail-dart-team-page.component';
import { ListDartTeamPageComponent } from './pages/list-dart-team-page/list-dart-team-page.component';

const routes: Routes = [
    { path: AppURl.AppDartTeamRoot, redirectTo: AppURl.AppDartTeamList, pathMatch: 'full' },
    { path: AppURl.AppDartTeamNew, component: CreateDartTeamPageComponent },
    { path: AppURl.AppDartTeamList, component: ListDartTeamPageComponent },
    { path: AppURl.AppDartTeamDetail, component: DetailDartTeamPageComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: []
})
export class DartTeamRoutingModule { }
