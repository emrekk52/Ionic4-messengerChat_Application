import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorySeenPageRoutingModule } from './story-seen-routing.module';

import { StorySeenPage } from './story-seen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorySeenPageRoutingModule
  ],
  declarations: [StorySeenPage]
})
export class StorySeenPageModule {}
