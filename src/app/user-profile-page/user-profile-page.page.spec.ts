import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserProfilePagePage } from './user-profile-page.page';

describe('UserProfilePagePage', () => {
  let component: UserProfilePagePage;
  let fixture: ComponentFixture<UserProfilePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfilePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfilePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
