import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsulterListeAbonnePage } from './consulter-liste-abonne.page';

describe('ConsulterListeAbonnePage', () => {
  let component: ConsulterListeAbonnePage;
  let fixture: ComponentFixture<ConsulterListeAbonnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterListeAbonnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsulterListeAbonnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
