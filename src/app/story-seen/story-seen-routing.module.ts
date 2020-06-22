import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorySeenPage } from './story-seen.page';

const routes: Routes = [
  {
    path: '',
    component: StorySeenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorySeenPageRoutingModule {}
