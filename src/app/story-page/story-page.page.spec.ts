import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoryPagePage } from './story-page.page';

describe('StoryPagePage', () => {
  let component: StoryPagePage;
  let fixture: ComponentFixture<StoryPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoryPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
