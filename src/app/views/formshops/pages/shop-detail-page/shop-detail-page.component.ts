import { AppCollections } from './../../../../config/app-collections.config';
import { Component, OnInit, Directive } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Shops } from 'src/app/core/models/shops';
import { FormGroup, FormControl } from '@angular/forms';

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
    shopName: new FormControl({
      value: '',
      disabled: false
    }),
    openHour: new FormControl({
      value: '',
      disabled: false
    }),
    closeHour: new FormControl({
      value: '',
      disabled: false
    }),
    latitude: new FormControl({
      value: '',
      disabled: false
    }),
    longitude: new FormControl({
      value: '',
      disabled: false
    }),
    comentarie: new FormControl({
      value: '',
      disabled: false
    })
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
      this.item["id"] = this.identificator;
      console.log(this.item);
    });
  }

  update(item: Shops) {
    this.itemDoc.update(item);
  }

  Modify(id, name, longitude, latitude, openHour, closeHour, comentarie) {

    this.newShopFrom = new FormGroup({
      shopName: new FormControl({
        value: name,
        disabled: false
      }),
      openHour: new FormControl({
        value: openHour,
        disabled: false
      }),
      closeHour: new FormControl({
        value: closeHour,
        disabled: false
      }),
      latitude: new FormControl({
        value: latitude,
        disabled: false
      }),
      longitude: new FormControl({
        value: longitude,
        disabled: false
      }),
      comentarie: new FormControl({
        value: comentarie,
        disabled: false
      }),
      id: new FormControl(id),
    })
  }

  delete(id) {
    this.firestore.collection("quarenteneStore").doc(id).delete().then(function () { console.log("exito al borrar") }).catch(function (error) { console.log("error man", error) });
  }

  onSubmit() {
    const FromValues = this.newShopFrom.value;
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
        console.log("Document successfully updated!");
        this.newShopFrom = new FormGroup({
          shopName: new FormControl({
            value: '',
            disabled: true
          }),
          openHour: new FormControl({
            value: '',
            disabled: true
          }),
          closeHour: new FormControl({
            value: '',
            disabled: true
          }),
          latitude: new FormControl({
            value: '',
            disabled: true
          }),
          longitude: new FormControl({
            value: '',
            disabled: true
          }),
          comentarie: new FormControl({
            value: '',
            disabled: true
          })
        })
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });



  }



}