import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppCollections } from '../../../../config/app-collections.config';

@Component({
  selector: 'app-create-dart-team-page',
  templateUrl: './create-dart-team-page.component.html',
  styleUrls: ['./create-dart-team-page.component.scss'],
})
export class CreateDartTeamPageComponent implements OnInit {
  newDarTeamForm = new FormGroup({
    teamName: new FormControl('', Validators.required),
    teamDescription: new FormControl(''),
  });

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit() {}

  onSubmit() {
    this.afs
      .collection(AppCollections.dartTeam)
      .add(
        {
          name: this.newDarTeamForm.value.teamName,
          description: this.newDarTeamForm.value.teamDescription,
        }
      )
      .then(res => {alert('Created!'); }, err => console.log(err));
  }
}
