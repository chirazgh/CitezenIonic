import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import * as $ from "jquery";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  ImageUser;
  UserName: String;
  listUsers: any = [];
  isItemAvailable = false;
  listAll: any = [];
  searchBarEmpty;

  

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.listAll = this.listAll.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  
  public appPages = [
    {
      title: 'Accueil',
      url: '/map',
      icon: 'home'
    },
    {
      title: "Ajouter un point d'intérêt",
      url: '/ajout-post',
      icon: 'add-circle'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Déconnexion',
      url: '/logout',
      icon: 'log-out'
    },
  ];
  constructor(private _us: UserService, private router: Router, private toastController: ToastController,
    public menuCtrl: MenuController) {
    /* this.menuCtrl.enable(true, 'first'); */
    /*if(('#userInexistant').valueOf()!=""){
      this.searchBarEmpty=false;
    }
    else 
    this.searchBarEmpty=true;*/

    

  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  doRefresh(ev:any)
  {
    console.log("refresh");
    
  }

  ngOnInit() {

    this._us.getCurrenUser().subscribe(async(user) => {
      let usr = <any>Object;
      usr = user;
      this.UserName = usr.nom.toUpperCase() + " " + usr.prenom.toUpperCase();
      this.ImageUser = await usr.img;
      this.menuCtrl.enable(true, 'first');
    }
    );

    this._us.getAllUsersNames().subscribe((res) => {

      this.listUsers = res;
      console.log(this.listUsers)
      this.listUsers.map((el) => {
        this.listAll.push({ id: Number(("" + el).substring(0, el.indexOf(" "))), name: ("" + el).substring(el.indexOf(" "), ("" + el).length) })
      })
      console.log(this.listAll)
    }, (err) => { })

  }


  goToProfile() {
    this.menuCtrl.close();
    this.router.navigateByUrl('/profile')
  }

  searchUser(id) {
    this._us.ifUserExists(id).subscribe(async (res) => {
      let a = <any>Object;
      a = await res;
      if (a.message) {
        this.router.navigate(['/profiles', { idUser: id }]);
      }
      else {
        $("#userInexistant").show;
      }

    })

  }




}
