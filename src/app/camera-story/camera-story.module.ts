import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraStoryPageRoutingModule } from './camera-story-routing.module';

import { CameraStoryPage } from './camera-story.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraStoryPageRoutingModule
  ],
  declarations: [CameraStoryPage]
})
export class CameraStoryPageModule {}
