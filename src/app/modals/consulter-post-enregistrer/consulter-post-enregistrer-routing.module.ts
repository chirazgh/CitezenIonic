import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsulterPostEnregistrerPage } from './consulter-post-enregistrer.page';

const routes: Routes = [
  {
    path: '',
    component: ConsulterPostEnregistrerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulterPostEnregistrerPageRoutingModule {}
