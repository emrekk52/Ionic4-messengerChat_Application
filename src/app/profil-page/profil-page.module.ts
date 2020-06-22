import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPagePageRoutingModule } from './profil-page-routing.module';

import { ProfilPagePage } from './profil-page.page';
import { ComponentsModule } from 'src/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProfilPagePage]
})
export class ProfilPagePageModule { }
