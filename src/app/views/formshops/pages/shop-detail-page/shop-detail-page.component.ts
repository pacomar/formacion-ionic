import { AppCollections } from './../../../../config/app-collections.config';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Shops } from 'src/app/core/models/shops';

@Component({
  selector: 'app-shop-detail-page',
  templateUrl: './shop-detail-page.component.html',
  styleUrls: ['./shop-detail-page.component.scss'],
})
export class ShopDetailPageComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Shops>;
  item: Shops;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.itemDoc = this.firestore.doc<Shops>(AppCollections.dartTeam + '/' + this.route.snapshot.paramMap.get('id'));
    this.itemDoc.valueChanges().subscribe(data => {
      this.item = data;
      console.log(this.item); 
    });
  }

  update(item: Shops) {
    this.itemDoc.update(item);
  }
}