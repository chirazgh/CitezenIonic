import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsulterAbonnementPage } from './consulter-abonnement.page';

const routes: Routes = [
  {
    path: '',
    component: ConsulterAbonnementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulterAbonnementPageRoutingModule {}
