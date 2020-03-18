import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-forms-shops-page',
  templateUrl: './forms-shops-page.component.html',
  styleUrls: ['./forms-shops-page.component.scss'],
})
export class FormsShopsPageComponent implements OnInit {

  newShopFrom = new FormGroup({
    // teamName: new FormControl('', Validators.required),
    shopName: new FormControl(''),
    openHour: new FormControl(''),
    closeHour: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
  })

  constructor(private afs: AngularFirestore) { }

  ngOnInit() { }

  onSubmit() {
    alert("ese");
    console.log(this.newShopFrom);
    this.afs.collection('quarenteneStore').add(
      {
        name: this.newShopFrom.value.shopName,
        openHour: this.newShopFrom.value.openHour,
        closeHour: this.newShopFrom.value.closeHour,
        latitude: this.newShopFrom.value.latitude,
        longitude: this.newShopFrom.value.longitude,
      }
    ).then(res => { alert("created!"); }, err => console.log(err));
  }
}




