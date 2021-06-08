import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutPostPage } from './ajout-post.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutPostPageRoutingModule {}
