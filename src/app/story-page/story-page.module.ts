import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoryPagePageRoutingModule } from './story-page-routing.module';

import { StoryPagePage } from './story-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoryPagePageRoutingModule
  ],
  declarations: [StoryPagePage]
})
export class StoryPagePageModule {}
