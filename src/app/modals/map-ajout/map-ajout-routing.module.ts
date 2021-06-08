import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapAjoutPage } from './map-ajout.page';

const routes: Routes = [
  {
    path: '',
    component: MapAjoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapAjoutPageRoutingModule {}
