import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagePagePageRoutingModule } from './message-page-routing.module';

import { MessagePagePage } from './message-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagePagePageRoutingModule
  ],
  declarations: [MessagePagePage]
})
export class MessagePagePageModule {}
