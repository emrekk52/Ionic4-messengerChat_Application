import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullUserListPageRoutingModule } from './full-user-list-routing.module';

import { FullUserListPage } from './full-user-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullUserListPageRoutingModule
  ],
  declarations: [FullUserListPage]
})
export class FullUserListPageModule {}
