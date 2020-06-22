import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullUserListPage } from './full-user-list.page';

describe('FullUserListPage', () => {
  let component: FullUserListPage;
  let fixture: ComponentFixture<FullUserListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullUserListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FullUserListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
