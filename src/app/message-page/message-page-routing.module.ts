import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagePagePage } from './message-page.page';

const routes: Routes = [
  {
    path: '',
    component: MessagePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagePagePageRoutingModule {}
