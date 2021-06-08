import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'ajout-post',
    loadChildren: () => import('./ajout-post/ajout-post.module').then( m => m.AjoutPostPageModule)
  },
  {
    path: 'consulter-poste',
    loadChildren: () => import('./modals/consulter-poste/consulter-poste.module').then( m => m.ConsulterPostePageModule)
  },
  {
    path: 'map-ajout',
    loadChildren: () => import('./modals/map-ajout/map-ajout.module').then( m => m.MapAjoutPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profiles',
    loadChildren: () => import('./profiles/profiles.module').then( m => m.ProfilesPageModule)
  },
  {
    path: 'consulter-liste-abonne',
    loadChildren: () => import('./modals/consulter-liste-abonne/consulter-liste-abonne.module').then( m => m.ConsulterListeAbonnePageModule)
  },
  {
    path: 'consulter-abonnement',
    loadChildren: () => import('./modals/consulter-abonnement/consulter-abonnement.module').then( m => m.ConsulterAbonnementPageModule)
  },
  {
    path: 'consulter-post-enregistrer',
    loadChildren: () => import('./modals/consulter-post-enregistrer/consulter-post-enregistrer.module').then( m => m.ConsulterPostEnregistrerPageModule)
  },
  {
    path: 'mdif-image-user',
    loadChildren: () => import('./modals/mdif-image-user/mdif-image-user.module').then( m => m.MdifImageUserPageModule)
  },
  {
    path: 'story',
    loadChildren: () => import('./modals/story/story.module').then( m => m.StoryPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
