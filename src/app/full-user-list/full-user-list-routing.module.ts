import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullUserListPage } from './full-user-list.page';

const routes: Routes = [
  {
    path: '',
    component: FullUserListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullUserListPageRoutingModule {}
