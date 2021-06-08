import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MdifImageUserPage } from './mdif-image-user.page';

const routes: Routes = [
  {
    path: '',
    component: MdifImageUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MdifImageUserPageRoutingModule {}
