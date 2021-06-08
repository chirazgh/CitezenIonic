import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsulterPostEnregistrerPageRoutingModule } from './consulter-post-enregistrer-routing.module';

import { ConsulterPostEnregistrerPage } from './consulter-post-enregistrer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsulterPostEnregistrerPageRoutingModule
  ],
  declarations: [ConsulterPostEnregistrerPage]
})
export class ConsulterPostEnregistrerPageModule {}
