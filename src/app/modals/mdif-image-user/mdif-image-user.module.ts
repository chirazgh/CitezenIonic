import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MdifImageUserPageRoutingModule } from './mdif-image-user-routing.module';

import { MdifImageUserPage } from './mdif-image-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MdifImageUserPageRoutingModule
  ],
  declarations: [MdifImageUserPage]
})
export class MdifImageUserPageModule {}
