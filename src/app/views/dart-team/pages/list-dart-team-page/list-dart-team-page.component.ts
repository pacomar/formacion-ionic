import { AppURl } from 'src/app/config/app-urls.config';
import { DartTeam } from './../../../../core/models/dart-team';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppCollections } from '../../../../config/app-collections.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-dart-team-page',
  templateUrl: './list-dart-team-page.component.html',
  styleUrls: ['./list-dart-team-page.component.scss'],
})
export class ListDartTeamPageComponent implements OnInit {
  teams: DartTeam[];
  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.firestore.collection(AppCollections.dartTeam).snapshotChanges().subscribe(data => {
      this.teams = data.map(elem =>
        // tslint:disable-next-line:no-string-literal
        new DartTeam(elem.payload.doc.id, elem.payload.doc.data()['name'], elem.payload.doc.data()['description']));
    }, err => {
      console.log(err);
    });
  }

  goToDetail(id: string) {
    // TODO: fix this url
    this.router.navigate([AppURl.AppDartTeam, 'detail', id]);
  }
}
