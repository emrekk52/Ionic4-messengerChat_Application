import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagePagePage } from './message-page.page';

describe('MessagePagePage', () => {
  let component: MessagePagePage;
  let fixture: ComponentFixture<MessagePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
