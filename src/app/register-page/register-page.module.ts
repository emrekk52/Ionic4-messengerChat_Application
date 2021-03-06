import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPagePageRoutingModule } from './register-page-routing.module';

import { RegisterPagePage } from './register-page.page';
import { ComponentsModule } from 'src/components/components.module';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPagePageRoutingModule,
    ComponentsModule, AngularFireAuthModule
  ],
  declarations: [RegisterPagePage]
})
export class RegisterPagePageModule { }
