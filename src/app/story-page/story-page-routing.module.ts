import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoryPagePage } from './story-page.page';

const routes: Routes = [
  {
    path: '',
    component: StoryPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoryPagePageRoutingModule {}
