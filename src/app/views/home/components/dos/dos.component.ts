import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.component.html',
  styleUrls: ['./dos.component.scss'],
})
export class DosComponent implements OnInit {
  @Output() exit: EventEmitter<string> = new EventEmitter<string>();

  message: string = 'default';

  constructor() { }

  ngOnInit() {}

  sendInfo() {
    this.exit.emit(this.message);
  }

}
