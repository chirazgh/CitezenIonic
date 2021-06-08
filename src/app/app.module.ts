import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Component } from '@angular/core';



import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscriptionPageModule } from './inscription/inscription.module';
import { AjoutPostPageModule } from './ajout-post/ajout-post.module';
import { ConsulterPostePageModule } from 'src/app/modals/consulter-poste/consulter-poste.module';
import { MapAjoutPageModule } from 'src/app/modals/map-ajout/map-ajout.module';
import { ConsulterListeAbonnePageModule } from 'src/app/modals/consulter-liste-abonne/consulter-liste-abonne.module';
import { ConsulterAbonnementPageModule } from 'src/app/modals/consulter-abonnement/consulter-abonnement.module';
import { MdifImageUserPageModule } from 'src/app/modals/mdif-image-user/mdif-image-user.module';
import { StoryPageModule } from 'src/app/modals/story/story.module';
import { ConsulterPostEnregistrerPageModule } from 'src/app/modals/consulter-post-enregistrer/consulter-post-enregistrer.module';


import { AutoCompleteModule } from 'ionic4-auto-complete';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AutoCompleteModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InscriptionPageModule,
    AjoutPostPageModule,
    HttpModule,
    ConsulterPostePageModule,
    MapAjoutPageModule,
    ConsulterListeAbonnePageModule,
    ConsulterAbonnementPageModule,
    MdifImageUserPageModule,
    StoryPageModule,
    ConsulterPostEnregistrerPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    
    HTTP,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
