import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutPostPageRoutingModule } from './ajout-post-routing.module';

import { AjoutPostPage } from './ajout-post.page';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AjoutPostPageRoutingModule,
    LeafletModule
  ],
  declarations: [AjoutPostPage],
  providers: [
    Camera,
    
  ],
})
export class AjoutPostPageModule {}
