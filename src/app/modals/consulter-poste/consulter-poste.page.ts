import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import * as $ from "jquery";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfilesPage } from 'src/app/profiles/profiles.page';


@Component({
  selector: 'app-consulter-poste',
  templateUrl: './consulter-poste.page.html',
  styleUrls: ['./consulter-poste.page.scss'],
})
export class ConsulterPostePage implements OnInit {

  @Input() public idPost: Number;
  @Input() public idUserPost: Number;
  public novDescription;
  signalerForm: FormGroup;

  constructor(private modalController: ModalController, private _us: UserService, private router: Router,
    public toastController: ToastController, private fb: FormBuilder, private alertCtrl: AlertController) {
    this.signalerForm = fb.group({
      resSignale: new FormControl("", [Validators.required])
    });
  }

  get resSignale() {
    return this.signalerForm.get('resSignale');
  }

  ngOnInit() {
    console.log("postID: " + this.idPost);
    console.log("userID: " + this.idUserPost);

  }

  async closeModel() {
    await this.modalController.dismiss();
  }

  enregistrerPost() {

    this._us.userEnregistrerPost(this.idPost).subscribe((res) => {
      this.toastController.create({
        message: 'Poste Enregistré!',
        color: 'success',
        duration: 2000
        
      }).then(toast => toast.present());

      this.modalController.dismiss();

    }, (err) => {
      this.toastController.create({
        message: 'Echec!',
        color: 'danger',
        duration: 2000
      }).then(toast => toast.present());
    })
  }

  //Signaler un post

  async siganler() {
    let alert = this.alertCtrl.create({

      header: "Ce post vous dérange ? Dites pourquoi: ",
      inputs: [
        {
          name: 'Raison',
          placeholder: 'Taper içi vos reproches',
          id: 'resSignale'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Envoyer',
          handler: data => {
            this._us.userSignalePost({ 'idUserPost': this.idUserPost, 'idPost': this.idPost, 'resSignale': data.Raison }).subscribe((res) => {
              this.toastController.create({
                message: 'Demande envoyée!',
                color: 'success',
                duration: 5000
              }).then(toast => toast.present());
              $('#signalModal').hide;
            }, (err) => {
              this.toastController.create({
                message: 'Echec!',
                color: 'danger',
                duration: 5000
              }).then(toast => toast.present());
            })
          }
        }
      ]
    });
    (await alert).present();
    this._us.userEnregistrerPost(this.idPost).subscribe((res) => {
      this.toastController.create({
        message: 'Poste Supprimer!',
        color: 'success',
        duration: 2000
        
      }).then(toast => toast.present());

      this.modalController.dismiss();

    }, (err) => {
      this.toastController.create({
        message: 'Echec!',
        color: 'danger',
        duration: 2000
      }).then(toast => toast.present());
    })
  }


  async supprimerPost() {
    let alert = this.alertCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Annuler',
          role: 'Annuler',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this._us.deletePost(this.idPost).subscribe((res) => {
              this.toastController.create({
                message: 'Poste Supprimer!',
                color: 'success',
                duration: 2000
              }).then(toast => toast.present());

              this.modalController.dismiss();
            }, (err) => {
              this.toastController.create({
                message: 'Echec!',
                color: 'danger',
                duration: 2000
              }).then(toast => toast.present());
            });
          }
        }
      ]
    });
    (await alert).present();
    
  }

  async modifier() {
    let alert = this.alertCtrl.create({

      header: "Cette description ne vous parait pas satisfaisantes vous vouller la modifier ? ",
      inputs: [
        {
          name: 'novDescription',
          placeholder: 'Taper içi votre nouvelle description',
          id: 'novDescription'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Envoyer',
          handler: data => {
            this._us.userModifPost({ 'idUserPost': this.idUserPost, 'idPost': this.idPost, 'novDescription': data.novDescription }).subscribe((res) => {
              this.toastController.create({
                message: 'Demande envoyée!',
                color: 'success',
                duration: 5000
              }).then(toast => toast.present());
            }, (err) => {
              this.toastController.create({
                message: 'Echec!',
                color: 'danger',
                duration: 5000
              }).then(toast => toast.present());
            })
          }
        }
      ]
    });
    (await alert).present();
  }


  goToUserProfile() {
    console.log(this.idUserPost);
    this.router.navigate(['/profiles', { idUser: this.idUserPost }]);
    this.modalController.dismiss(this.idUserPost);
  }


}
