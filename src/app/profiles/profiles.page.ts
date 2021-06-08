import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ConsulterPostePage } from '../modals/consulter-poste/consulter-poste.page';
import { MdifImageUserPage } from '../modals/mdif-image-user/mdif-image-user.page';




@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {

  imageUser: string;
  nomUser: String;
  pren;
  age;
  adresse;
  tel;
  email;
  id;
  idUser;
  userPosts;
  enregitrerPosts;

  nbPosts;
  nbSuivits;
  nbAbonements;

  //consulter
  novDescription: String = "";
  postValides = [];
  imageP: String = '';
  descriptionP: String;
  regionP: String;
  idPost: Number;
  idUserPost: Number;
  titre;

  //consulter saved
  novDescriptionS: String = "";
  postValidesS = [];
  imagePS: String = '';
  descriptionPS: String;
  regionPS: String;
  idPostS: Number;
  idUserPostS: Number;
  imageUserS: string;
  nomUserS: String;
  titreS;

  //modif profile
  imageUserM: string;
  nomM = "";
  prenomM = "";
  dateNaissM;
  adresseM = "";
  telM = "";
  emailM = "";
  modp = "";
  rmdp = "";
  //modif image
  selectedFile: File;

  //abonne liste
  listeAbonne;
  suivisAbonne;
  imageUserL: string;
  nomUserL: String;
  idCurrentUser;

  signalerForm: FormGroup;


  constructor(private _us: UserService, public toastController: ToastController, private router:Router,
     private modalController: ModalController, private alertCtrl: AlertController) { }

  ngOnInit(): void {
    $("#modifProf").hide();
    $("#bshowmodif").show();
    $("#bhidemodif").hide();
    $("#benregistrers").hide();
    $("#enregistrer").hide();
    $("#titreEnregs").hide();
    
    this.id = this.router.url.substr(17);
    console.log("get from url : " + this.router.url.substr(17));
    this._us.getCurrenUser().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.idCurrentUser = a.id;
      if (this.idCurrentUser == this.id) {
        this.router.navigateByUrl('/profile');
      }
    })

    this._us.getUserById(this.id).subscribe((res) => {
      let a = <any>Object;
      a = res;
      //calculel d'age
      let dateNaiss = new Date(a.dateNaiss);
      let ageDifMs = Date.now() - dateNaiss.getTime();
      let ageDate = new Date(ageDifMs);
      this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      //
      this.nomUser = a.nom.charAt(0).toUpperCase() + a.nom.slice(1) + " " + a.prenom.charAt(0).toUpperCase() + a.prenom.slice(1);
      this.tel = a.tel;
      this.email = a.email;
      this.pren = a.prenom.charAt(0).toUpperCase() + a.prenom.slice(1);
      this.adresse = a.adresse.charAt(0).toUpperCase() + a.adresse.slice(1);
      this.imageUser = a.img;
      $('#backimage').css("background-image", "url(" + this.imageUser + ")");

      this._us.getSumPostsUser(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.nbPosts = a
      })
      this._us.getSumAbonnementsUser(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.nbAbonements = a
      })

      this._us.getSumSuivitsUser(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.nbSuivits = a
      })
      this._us.ifCurrentUFollowsUser({ 'suivi_id': this.id }).subscribe((res) => {
        let a = <any>Object;
        
        a = res;
        if (!a) {
          $("#desabonne").hide();
          $("#abonne").show();
          console.log("testtest!!!");
        } else {
          $("#abonne").hide();
          $("#desabonne").show();
        }

      })
      this._us.ifCurrentUSignaledUser({ 'user_idToS': this.id }).subscribe((res) => {
        let a = <any>Object;
        a = res;
        if (a) {
          $("#signal").hide();
          $("#siganled").show();
        } else {
          $("#siganled").hide();
          $("#signal").show();
        }

      })

      this._us.getUserPosts(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.userPosts = a.message1;
      })
    })


  }
  showmodifProf() {
    $("#modifProf").show("slow");
    $("#bshowmodif").hide();
    $("#bhidemodif").show();
  }
  hidemodifProf() {
    $("#modifProf").hide("slow");
    $("#bhidemodif").hide();
    $("#bshowmodif").show();
    $("#gallery").show();
  }


  showenregistrer() {
    $("#bposts").hide();
    $("#gallery").hide();
    $("#benregistrers").show();
    $("#enregistrer").show();
    $("#titrePosts").hide();
    $("#titreEnregs").show();
    

  }

  hideenregistrer() {
    $("#benregistrers").hide();
    $("#enregistrer").hide();
    $("#bposts").show();
    $("#gallery").show();
    $("#titreEnregs").hide();
    $("#titrePosts").show();
    
  }


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
              this.ngOnInit();
              this.toastController.create({
                message: 'Demande envoyée!',
                color: 'success',
                duration: 2000
              });
        
              this.modalController.dismiss();
              
            }, (err) => {
              this.toastController.create({
                message: 'Echec!',
                color: 'danger',
                duration: 2000
              });
            })
          }
        }
      ]
    });
    (await alert).present();
  }


  desabonner() {
    this._us.unFollowUser({ 'suivi_id': this.id }).subscribe((res) => {
      this.toastController.create({
        message: "Vous n'êtes plus un abonné de " + this.nomUser,
        color: 'success',
        duration: 2000
      }).then(toast => toast.present());
      this.ngOnInit();
    })
  }

  sabonner() {
    this._us.followUser({ 'abonne_id': this.idCurrentUser, 'suivi_id': this.id }).subscribe(async (res) => {
      let a = <any>Object;
      a =await res;
      let followerName =a.followerName;
      let t = this;
     /*  a.followeeTokens.forEach(element => {
        t._ns.pushNotif("Nouveau abonné", "Desormais, "+followerName+" vous suit", element).then((res) => {
          console.log("res", res);

        }, (err) => { console.log("res", res); });
      }); */
      this.toastController.create({
        message: "Vous êtes desormais un abonné de " + this.nomUser,
        color: 'success',
        duration: 2000
      }).then(toast => toast.present());
      this.ngOnInit();
    })
  }



  //consulter post
  async openModel(eid) {

    this._us.getDetailsPost(eid).subscribe((res) => {
      let a = <any>Object;
      a = res;
      var post = a.message1;
      var user = a.message2;
      this.idPost = post.id;
      this.idUserPost = user.id;
      this.imageP = post.imageP;
      this.descriptionP = post.description;
      this.regionP = post.id_region;
      this.titre = post.titre;
      this.imageUser = user.img;
      this.nomUser = (user.nom + " " + user.prenom).toUpperCase();

      $("#username").html("" + this.nomUser);
      $("#titreP").html(this.titre);
      $("#descriptionP").html("" + this.descriptionP);
      $("#regionP").html("" + this.regionP);
      $("#imageP").attr("src", "" + this.imageP);
      $("#imageUser").attr("src", "" + this.imageUser);
      $("#loader").css("display", "none");
      $("#imageP").css("display", "block");
    })

    console.log("mapUserID: " + this.id);
    const modal = await this.modalController.create({
      component: ConsulterPostePage,
      componentProps: {
        idPost: eid,
        idUserPost: this.id
      }
    });

    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', eid);
      console.log('Sending2: ', this.id);
    });

  }

  
  
  async mdifModal() {

    console.log("idSend: " + this.id);

    const modal = await this.modalController.create({
      component: MdifImageUserPage,
      componentProps: {
        id: this.id
      }
    });

    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending1: ', this.id);

    });

  }

   //Signaler un post

   async signalerUser() {
    let alert = this.alertCtrl.create({

      header: "Ce compte vous dérange ? Dites pourquoi: ",
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
            this._us.userSignaleUser({ 'idUserToSign': this.id, 'resSignale': data.Raison }).subscribe((res) => {
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
  }

}
