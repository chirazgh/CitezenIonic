import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsulterAbonnementPageRoutingModule } from './consulter-abonnement-routing.module';

import { ConsulterAbonnementPage } from './consulter-abonnement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsulterAbonnementPageRoutingModule
  ],
  declarations: [ConsulterAbonnementPage]
})
export class ConsulterAbonnementPageModule {}
