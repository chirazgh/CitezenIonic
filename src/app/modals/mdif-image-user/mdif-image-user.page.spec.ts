import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MdifImageUserPage } from './mdif-image-user.page';

describe('MdifImageUserPage', () => {
  let component: MdifImageUserPage;
  let fixture: ComponentFixture<MdifImageUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdifImageUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MdifImageUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
