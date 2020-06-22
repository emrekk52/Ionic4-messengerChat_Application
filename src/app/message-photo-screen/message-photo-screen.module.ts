import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagePhotoScreenPageRoutingModule } from './message-photo-screen-routing.module';

import { MessagePhotoScreenPage } from './message-photo-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagePhotoScreenPageRoutingModule
  ],
  declarations: [MessagePhotoScreenPage]
})
export class MessagePhotoScreenPageModule {}
