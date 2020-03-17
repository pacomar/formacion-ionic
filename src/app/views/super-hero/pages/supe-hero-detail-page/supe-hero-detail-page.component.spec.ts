import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupeHeroDetailPageComponent } from './supe-hero-detail-page.component';

describe('SupeHeroDetailPageComponent', () => {
  let component: SupeHeroDetailPageComponent;
  let fixture: ComponentFixture<SupeHeroDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupeHeroDetailPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupeHeroDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
