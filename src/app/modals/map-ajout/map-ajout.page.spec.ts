import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapAjoutPage } from './map-ajout.page';

describe('MapAjoutPage', () => {
  let component: MapAjoutPage;
  let fixture: ComponentFixture<MapAjoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAjoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapAjoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
