import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsulterListeAbonnePage } from './consulter-liste-abonne.page';

const routes: Routes = [
  {
    path: '',
    component: ConsulterListeAbonnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulterListeAbonnePageRoutingModule {}
