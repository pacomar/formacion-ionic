import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-forms-shops-page',
  templateUrl: './forms-shops-page.component.html',
  styleUrls: ['./forms-shops-page.component.scss'],
})
export class FormsShopsPageComponent implements OnInit {

  newDarTeamForm = new FormGroup({
    teamName: new FormControl('', Validators.required),
    teamDescription: new FormControl(''),
  })

  constructor(private afs: AngularFirestore) { }

  ngOnInit() { }

  onSubmit() {
    this.afs.collection('dartTeamTest').add(
      {
        name: this.newDarTeamForm.value.teamName,
        description: this.newDarTeamForm.value.teamDescription
      }
    ).then(res => { alert("created!"); }, err => console.log(err));

  }
}




