import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonApp } from '@ionic/angular';

import { InscriptionPageRoutingModule } from './inscription-routing.module';


import { InscriptionPage } from './inscription.page';

@NgModule({
  declarations: [
    InscriptionPage
  ],
  imports: [
    CommonModule,
    IonicModule,  
    InscriptionPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
 
  entryComponents: [
    InscriptionPage
  ],
  bootstrap: [IonApp],
})
export class InscriptionPageModule { }
