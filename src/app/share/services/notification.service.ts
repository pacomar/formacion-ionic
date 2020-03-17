import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // message: string = undefined;
  observer = new BehaviorSubject<string>('');

  constructor() { }

  notify( messageToNotify: string) {
    this.observer.next(messageToNotify);
  }

  getMessages(): Observable<string> {
    return this.observer.asObservable()
  }
}
