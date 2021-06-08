import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { ModalController } from '@ionic/angular';
import { ConsulterPostePage } from 'src/app/modals/consulter-poste/consulter-poste.page'
import { AlertController } from '@ionic/angular';
import { ConsulterListeAbonnePage } from '../modals/consulter-liste-abonne/consulter-liste-abonne.page';
import { ConsulterAbonnementPage } from '../modals/consulter-abonnement/consulter-abonnement.page';
import { MdifImageUserPage } from '../modals/mdif-image-user/mdif-image-user.page';
import { ConsulterPostEnregistrerPage } from '../modals/consulter-post-enregistrer/consulter-post-enregistrer.page';
import { format } from "date-fns";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  imageUser: string;
  nomUser: String;
  pren;
  age;
  adresse;
  tel;
  email;
  id;
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
  novDescriptionS = "";
  postValidesS = [];
  imagePS = '';
  descriptionPS = "";
  regionPS = "";
  idPostS: Number;
  idUserPostS: Number;
  imageUserS = "";
  nomUserS = "";
  titreS = "";

  //modif profile
  imageUserM: string;
  nomM;
  prenomM;
  dateNaissM;
  adresseM;
  telM;
  emailM;
  modp;
  rmdp;
  //modif image
  selectedFile: File;

  //abonne liste
  listeAbonne;
  suivisAbonne;
  imageUserL: string;
  nomUserL: String;
  listeAbonneID = [];
  suivisAbonneID = [];


  constructor(private _us: UserService, private toastController: ToastController, private router: Router,
    private modalController: ModalController, private alertCtrl: AlertController) { }

  ngOnInit(): void {
    $("#modifProf").hide();
    $("#bshowmodif").show();
    $("#bhidemodif").hide();
    $("#benregistrers").hide();
    $("#enregistrer").hide();
    $("#titreEnregs").hide();

    this._us.getCurrenUser().subscribe((res) => {
      let a = <any>Object;
      a = res;

      //calculel d'age
      let dateNaiss = new Date(a.dateNaiss);
      let ageDifMs = Date.now() - dateNaiss.getTime();
      let ageDate = new Date(ageDifMs);
      this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      //
      this.id = a.id;
      this.nomUser = a.nom.charAt(0).toUpperCase() + a.nom.slice(1) + " " + a.prenom.charAt(0).toUpperCase() + a.prenom.slice(1);
      this.tel = a.tel;
      this.email = a.email;
      this.pren = a.prenom.charAt(0).toUpperCase() + a.prenom.slice(1);
      this.adresse = a.adresse.charAt(0).toUpperCase() + a.adresse.slice(1);
      this.imageUser = a.img;
      $('#backimage').css("background-image", "url(" + this.imageUser + ")");
      this._us.getUserPosts(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.userPosts = a.message1;
      })
      this._us.getEnregistrerPosts(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.enregitrerPosts = a.message1;
      })

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
    }, (err) => {
      this.toastController.create({
        message: err.error,
        color: 'danger',
        duration: 7000,
        cssClass: 'customToastClass'
      }).then(toast => toast.present());
    }
    )

    this._us.getAbonneUsers().subscribe(async (res) => {
      let a = <any>Object;
      a = res;
      this.listeAbonne = a.message1;
    })

    this._us.getSuiviUsers().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.suivisAbonne = a.message1;
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

  /* openModalSupprimer() {
    $('#consulterEnregistrer').modal('toggle');
    $('#modalConfirmDelete').modal('show');
  }
  openModalSupprimer2() {
    $('#consulter').modal('toggle');
    $('#openModalSupprimer2').modal('show');
  } */

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


  async openModelSaved(eid) {

    this._us.getDetailsPost(eid).subscribe((res) => {
      let a = <any>Object;
      a = res;
      var post = a.message1;
      var user = a.message2;
      this.idPostS = post.id;
      this.idUserPostS = user.id;
      this.imagePS = post.imageP;
      this.descriptionPS = post.description;
      this.regionPS = post.id_region;
      this.titreS = post.titre;
      this.imageUserS = user.img;
      this.nomUserS = (user.nom + " " + user.prenom).toUpperCase();

      $("#usernameS").html(this.nomUserS);
      $("#descriptionPS").html(this.descriptionPS);
      $("#titrePS").html(this.titreS);
      $("#regionPS").html(this.regionPS);
      $("#imagePS").attr("src", this.imagePS);
      $("#imageUserS").attr("src", this.imageUserS);
      $("#loader").css("display", "none");
      $("#imageP").css("display", "block");
    })

    console.log("mapUserID: " + this.id);
    const modal = await this.modalController.create({
      component: ConsulterPostEnregistrerPage,
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

  //Modifier Profile
  modifProfile() {
    this.nomM = $("#nomM").val();
    this.prenomM = $("#prenomM").val();
    this.dateNaissM = $("#dattnaissM").val();
    this.telM = $("#telM").val();
    this.adresseM = $("#adresseM").val();
    this.emailM = $("#addemailM").val();
    let mdp = $("#motDePasseM").val();
    let rmdp = $("#reMotDePasseM").val();
    "use strict";
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.emailM)) && this.emailM != "") {
      $("#addemailM").focus();
      this.toastController.create({
        message: 'Email incorrect!',
        color: 'danger',
        duration: 2000
      }).then(toast => toast.present());
    } else if ((mdp != "" && rmdp != "") && mdp != "" && rmdp != "" && rmdp < 8 && mdp < 8) {
      $("#motDePasseM").focus();
      this.toastController.create({
        message: 'verifier votre mot de passe!',
        color: 'danger',
        duration: 2000
      }).then(toast => toast.present());
    } else if (!(this.telM.length > 7 || this.telM.length == 0)) {
      $("#telM").focus();
      this.toastController.create({
        message: 'Num Telephone incorrect!',
        color: 'danger',
        duration: 2000
      }).then(toast => toast.present());
    } else {
      if (mdp != "" && rmdp != "") {
        let mdpdb;
        this._us.getUserPw(this.id).subscribe((res) => {
          let a = <any>Object;
          a = res;
          mdpdb = a.message;
          if (bcrypt.compare(mdp, mdpdb)) {
            const salt = bcrypt.genSaltSync(10);
            this.rmdp = bcrypt.hashSync(rmdp, 10);

          }
        })

      }

      this._us.modifUser({
        'idUser': this.id,
        'nomM': this.nomM,
        'prenomM': this.prenomM,
        'dateNaissM': format(new Date(this.dateNaissM), "yyyy-MM-dd"),
        'telM': this.telM,
        'adresseM': this.adresseM,
        'emailM': this.emailM,
        'rmdp': this.rmdp
      }).subscribe((res) => {
        this.ngOnInit();
        this.toastController.create({
          message: 'Profile modifié!!',
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
    this.nomM ="";
    this.prenomM = "";
    this.dateNaissM = "";
    this.telM = "";
    this.adresseM = "";
    this.emailM ="";
    mdp = "";
    rmdp = "";
  }



  //liste abonnee
  async listAbonne() {

    let i = 0;
    this.listeAbonne.forEach(element => {
      console.log("listeAbonneID11111: " + element.id);
      this.listeAbonneID[i] = element.id;
      i++;
    });

    console.log("listeAbonneID2222: " + this.listeAbonneID);
    const modal = await this.modalController.create({
      component: ConsulterListeAbonnePage,
      componentProps: {

        listeAbnId: this.listeAbonneID
      }
    });

    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending2: ', this.listeAbonneID);

    });
  }




  //liste suivi
  async suiviAbonne() {


    this.suivisAbonne.forEach(element => {
      console.log("suivisAbonneID11111: " + element.id);
      this.suivisAbonneID = element.id
    });

    console.log("suivisAbonneID2222: " + this.suivisAbonneID);
    const modal = await this.modalController.create({
      component: ConsulterAbonnementPage,
      componentProps: {
        listeAbnId: this.suivisAbonneID
      }
    });

    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending2: ', this.suivisAbonneID);

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


}
