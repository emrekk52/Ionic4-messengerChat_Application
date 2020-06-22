import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StorySeenPage } from './story-seen.page';

describe('StorySeenPage', () => {
  let component: StorySeenPage;
  let fixture: ComponentFixture<StorySeenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorySeenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StorySeenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
