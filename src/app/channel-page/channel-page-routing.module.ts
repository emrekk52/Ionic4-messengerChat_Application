import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelPagePage } from './channel-page.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelPagePageRoutingModule {}
