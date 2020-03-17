import { AppCollections } from './../../../../config/app-collections.config';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DartTeam } from '../../../../core/models/dart-team';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-dart-team-page',
  templateUrl: './detail-dart-team-page.component.html',
  styleUrls: ['./detail-dart-team-page.component.scss'],
})
export class DetailDartTeamPageComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<DartTeam>;
  item: DartTeam;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.itemDoc = this.firestore.doc<DartTeam>(AppCollections.dartTeam + '/' + this.route.snapshot.paramMap.get('id'));
    this.itemDoc.valueChanges().subscribe(data => {
      this.item = data;
    });
  }

  update(item: DartTeam) {
    this.itemDoc.update(item);
  }
}
