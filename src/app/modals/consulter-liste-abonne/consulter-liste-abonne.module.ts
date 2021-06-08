import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsulterListeAbonnePageRoutingModule } from './consulter-liste-abonne-routing.module';

import { ConsulterListeAbonnePage } from './consulter-liste-abonne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsulterListeAbonnePageRoutingModule
  ],
  declarations: [ConsulterListeAbonnePage]
})
export class ConsulterListeAbonnePageModule {}
