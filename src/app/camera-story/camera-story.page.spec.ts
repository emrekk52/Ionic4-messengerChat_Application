import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CameraStoryPage } from './camera-story.page';

describe('CameraStoryPage', () => {
  let component: CameraStoryPage;
  let fixture: ComponentFixture<CameraStoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraStoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraStoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
