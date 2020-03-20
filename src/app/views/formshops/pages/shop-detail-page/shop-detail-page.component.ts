import { AppCollections } from './../../../../config/app-collections.config';
import { Component, OnInit, Directive } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Shops } from 'src/app/core/models/shops';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-shop-detail-page',
  templateUrl: './shop-detail-page.component.html',
  styleUrls: ['./shop-detail-page.component.scss'],
})



export class ShopDetailPageComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Shops>;
  item: Shops;
  identificator: string;
  newShopFrom = new FormGroup({
    shopName: new FormControl(''),
    openHour: new FormControl(''),
    closeHour: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    comentarie: new FormControl('')
  })


  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) { }


  ngOnInit() {
    this.itemDoc = this.firestore.doc<Shops>(AppCollections.dartTeam + '/' + this.route.snapshot.paramMap.get('id'));
    this.identificator = this.route.snapshot.paramMap.get('id');
    console.log(this.identificator);
    this.itemDoc.valueChanges().subscribe(data => {
      this.item = data;
      if (this.item != undefined) {
        this.item["id"] = this.identificator;
      }
    });
  }

  update(item: Shops) {
    this.itemDoc.update(item);
  }

  Modify(id, name, longitude, latitude, openHour, closeHour, comentarie) {

    this.newShopFrom = new FormGroup({
      shopName: new FormControl(name),
      openHour: new FormControl(openHour),
      closeHour: new FormControl(closeHour),
      latitude: new FormControl(latitude),
      longitude: new FormControl(longitude),
      comentarie: new FormControl(comentarie),
      id: new FormControl(id),
    })
  }

  delete(id) {
    let user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }
    if (email === "asuarezc91@gmail.com") {
      this.firestore.collection("quarenteneStore").doc(id).delete().then(function () { console.log("exito al borrar") }).catch(function (error) { console.log("error man", error) });
    } else {
      alert("no puedes borrarlo");
    }
  }

  onSubmit() {
    let man = this.newShopFrom;
    const FromValues = man.value;
    const id = FromValues.id;
    let washingtonRef = this.firestore.collection("quarenteneStore").doc(id);
    return washingtonRef.update({
      closeHour: FromValues.closeHour,
      latitude: FromValues.latitude,
      longitude: FromValues.longitude,
      name: FromValues.shopName,
      openHour: FromValues.openHour,
      comentarie: FromValues.comentarie
    })
      .then(function () {
        console.log(man);
        console.log("Document successfully updated!");
        man = new FormGroup({
          shopName: new FormControl(''),
          openHour: new FormControl(''),
          closeHour: new FormControl(''),
          latitude: new FormControl(''),
          longitude: new FormControl(''),
          comentarie: new FormControl('')
        })
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });



  }

  delComm(id: string) {
    let washingtonRef = this.firestore.collection("quarenteneStore").doc(id);
    return washingtonRef.update({
      comentarie: ""
    })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  }



}