import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePagePageRoutingModule } from './user-profile-page-routing.module';

import { UserProfilePagePage } from './user-profile-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePagePageRoutingModule
  ],
  declarations: [UserProfilePagePage]
})
export class UserProfilePagePageModule {}
