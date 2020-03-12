import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DosComponent } from './dos.component';

describe('DosComponent', () => {
  let component: DosComponent;
  let fixture: ComponentFixture<DosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
