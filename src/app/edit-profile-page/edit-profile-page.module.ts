import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePagePageRoutingModule } from './edit-profile-page-routing.module';

import { EditProfilePagePage } from './edit-profile-page.page';
import { ComponentsModule } from 'src/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditProfilePagePage]
})
export class EditProfilePagePageModule {}
