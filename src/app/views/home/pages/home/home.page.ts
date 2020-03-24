import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { DosComponent } from '../../components/dos/dos.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  p1: number = undefined;
  p2: number = 3;
  login: string;

  @ViewChild(DosComponent, { static: true }) component2: DosComponent;

  images = [944, 1011, 984].map(n => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    public authService: AuthService
  ) { }

  getNumber1(): number {
    return this.p1 + this.p2;
  }

  ngOnInit(): void {
    this.p1 = 2;
    // console.log( this.authService.afs.firestore.doc); 
    console.log(this.authService.userData);
    this.authService.userInformation$.subscribe(data => {
      console.log(data); 
      this.authService.userData = data;
      
       
    


    });

  }
  ngAfterViewInit(): void {
    // this.component2.sendInfo();

  }
  ngOnDestroy(): void {
    console.log('Adios');
  }
  showInfo(inVal) {
    console.log(inVal);
  }
}
