import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsulterPostEnregistrerPage } from './consulter-post-enregistrer.page';

describe('ConsulterPostEnregistrerPage', () => {
  let component: ConsulterPostEnregistrerPage;
  let fixture: ComponentFixture<ConsulterPostEnregistrerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterPostEnregistrerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsulterPostEnregistrerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
