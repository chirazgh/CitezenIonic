import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import * as $ from "jquery";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulter-post-enregistrer',
  templateUrl: './consulter-post-enregistrer.page.html',
  styleUrls: ['./consulter-post-enregistrer.page.scss'],
})
export class ConsulterPostEnregistrerPage implements OnInit {

  @Input() public idPost: Number;
  @Input() public idUserPost: Number;

  constructor(private modalController: ModalController, private _us: UserService,private router:Router,
    public toastController: ToastController, private fb: FormBuilder, private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log("postID: " + this.idPost);
    console.log("userID: " + this.idUserPost);
  }

  async closeModel() {
    await this.modalController.dismiss(this.idPost);
    console.log(this.idPost);
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
            this._us.userModifPost({'idUserPost': this.idUserPost, 'idPost': this.idPost, 'novDescription': data.novDescription }).subscribe((res) => {
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


  supprimerPostEnregistrer() {

    this._us.deletePostEnregistrer(this.idPost).subscribe((res) => {
      this.toastController.create({
        message: 'Poste Retirer des enregistrements!',
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

  goToUserProfile(id) {
    console.log(id);
    
    this.router.navigate(['profiles', { idUser: id }]);
  }


}
