import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagePhotoScreenPage } from './message-photo-screen.page';

const routes: Routes = [
  {
    path: '',
    component: MessagePhotoScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagePhotoScreenPageRoutingModule {}
