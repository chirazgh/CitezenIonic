import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsulterPostePage } from './consulter-poste.page';

const routes: Routes = [
  {
    path: '',
    component: ConsulterPostePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulterPostePageRoutingModule {}
