import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss'],
})
export class UnoComponent implements OnInit {
  @Input() p1: number;
  @Input() p2: number;
  @Input() p3: number = 7;

  suma: number;

  constructor() { }

  ngOnInit() {
    this.suma = this.p1 + this.p2 + this.p3;
  }

}
