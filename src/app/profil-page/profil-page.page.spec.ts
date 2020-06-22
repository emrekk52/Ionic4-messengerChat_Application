import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilPagePage } from './profil-page.page';

describe('ProfilPagePage', () => {
  let component: ProfilPagePage;
  let fixture: ComponentFixture<ProfilPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
