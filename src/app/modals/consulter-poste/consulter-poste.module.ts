import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsulterPostePageRoutingModule } from './consulter-poste-routing.module';

import { ConsulterPostePage } from './consulter-poste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ConsulterPostePageRoutingModule
  ],
  declarations: [ConsulterPostePage]
})
export class ConsulterPostePageModule {}
