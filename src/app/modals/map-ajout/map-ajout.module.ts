import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapAjoutPageRoutingModule } from './map-ajout-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MapAjoutPage } from './map-ajout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapAjoutPageRoutingModule,
    LeafletModule
  ],
  declarations: [MapAjoutPage]
})
export class MapAjoutPageModule {}
