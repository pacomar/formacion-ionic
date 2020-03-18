import { Component, OnInit } from '@angular/core';
import { Shops } from 'src/app/core/models/shops';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops-list-page',
  templateUrl: './shops-list-page.component.html',
  styleUrls: ['./shops-list-page.component.scss'],
})
export class ShopsListPageComponent implements OnInit {
  shops: Shops[];
  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) { }


  ngOnInit() {
    
    this.firestore.collection('quarenteneStore').snapshotChanges().subscribe(data => {
      this.shops = data.map(elem =>
        new Shops(elem.payload.doc.data()['closeHour'], elem.payload.doc.data()['latitude'], elem.payload.doc.data()['longitude'], elem.payload.doc.data()['name'], elem.payload.doc.data()['openHour']));
        console.log(this.shops); 
    }, err => {
      console.log(err);
    });
  }




  // goToDetail(id: string) {
  //   // TODO: fix this url
  //   this.router.navigate([AppURl.AppDartTeam, 'detail', id]);
  // }

}



 