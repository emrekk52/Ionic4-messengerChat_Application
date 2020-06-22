import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagePhotoScreenPage } from './message-photo-screen.page';

describe('MessagePhotoScreenPage', () => {
  let component: MessagePhotoScreenPage;
  let fixture: ComponentFixture<MessagePhotoScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagePhotoScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagePhotoScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
