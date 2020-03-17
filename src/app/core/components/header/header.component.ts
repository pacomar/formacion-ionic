import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/share/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService.getMessages().subscribe(data => {
      console.log('AppHeader notified:' + data);
    });
  }

}
