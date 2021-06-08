import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsulterPostePage } from './consulter-poste.page';

describe('ConsulterPostePage', () => {
  let component: ConsulterPostePage;
  let fixture: ComponentFixture<ConsulterPostePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterPostePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsulterPostePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
