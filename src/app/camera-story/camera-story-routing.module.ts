import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraStoryPage } from './camera-story.page';

const routes: Routes = [
  {
    path: '',
    component: CameraStoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraStoryPageRoutingModule {}
