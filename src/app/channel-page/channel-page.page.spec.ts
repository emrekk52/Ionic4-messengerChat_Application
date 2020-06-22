import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChannelPagePage } from './channel-page.page';

describe('ChannelPagePage', () => {
  let component: ChannelPagePage;
  let fixture: ComponentFixture<ChannelPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
