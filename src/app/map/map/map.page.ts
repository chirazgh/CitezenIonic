import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import * as L2 from 'leaflet.markercluster';
import 'leaflet.markercluster';
import "leaflet/dist/images/marker-shadow.png";
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import * as $ from "jquery";
import { ModalController } from '@ionic/angular';
import { ConsulterPostePage } from 'src/app/modals/consulter-poste/consulter-poste.page'
import { StoryPage } from 'src/app/modals/story/story.page';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit {
  idS;
  isLoggedIn
  mapOptions: L.MapOptions;
  theMarker: L.Marker;
  infoDestination;
  map: any;
  markers = new L2.MarkerClusterGroup();
  novDescription: String = "";
  // resSignale: String = "";
  postValides = [];
  userPostValides;
  imageP: String = '';
  descriptionP: String;
  regionP: String;
  imageUser: String;
  nomUser: String;
  idPost: Number;
  idUserPost;
  signalerForm: FormGroup;
  titre;


  //story
  idPostS: Number;
  descriptionPS = "";
  regionPS = "";
  imagePS = "";
  imageUserS = "";
  nomUserS = "";
  idUS: Number;
  storysUser = [];
  backGStory = [];
  lengthTbSt = 0;
  tstoryUser = [];

  //search
  nomUserCher: String;

  UserName: String;
  listUsers: any = [];
  isItemAvailable = false;
  listAll: any = [];

  icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      // specify the path here
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'leaflet/marker-shadow.png',
    })
  };
  icon2 = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      // specify the path here
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'leaflet/marker-shadow.png',
    })
  };

  x = "normalmap";
  constructor(private _us: UserService, private t: Title, public toastController: ToastController,
    private router: Router, private fb: FormBuilder, private modalController: ModalController,
    public menuCtrl: MenuController) {
    this.t.setTitle("Home");
    this.signalerForm = fb.group({
      resSignale: new FormControl("", [Validators.required])
    });


    this._us.getAllUsersNames().subscribe((res) => {

      this.listUsers = res;
      console.log(this.listUsers)
      this.listUsers.map((el) => {
        this.listAll.push({ id: Number(("" + el).substring(0, el.indexOf(" "))), name: ("" + el).substring(el.indexOf(" "), ("" + el).length) })
      })
      console.log(this.listAll)
    }, (err) => { })


  }


  toggleMenu() {
    this.menuCtrl.toggle();
  }
  

  ionClear(ev: any) { 
    this.x = "normalmap";
    this.markers.clearLayers();
    this.ngOnInit(); 
    console.log("cancel!! ");  
  }


  get resSignale() {
    return this.signalerForm.get('resSignale');
  }

  getItemsUser(ev: any) {
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

  searchUserPost(id) {
    this.idS = id;
    this.markers.clearLayers();
    this.mapOptions = L2.MapOptions;
    this.theMarker = L2.Marker;
    this.markers = new L2.MarkerClusterGroup();
    this.x = "search";
    this.ngOnInit();
  }

  ngOnInit() {

    this.init();
    setTimeout(() => {
      $(window).trigger('resize');
    }, 50)


    setTimeout(() => {
      $(window).trigger('resize');
    }, 50);

    if (this.x == "search") {
      console.log("ids" + this.idS);

      this._us.getValideUserPosts(this.idS).subscribe(async (res) => {
        let a = <any>Object;
        a = res;
        this.postValides = await a.message1;
        this.onMapReady(this.map);
      });
    }
    else {
     
      this._us.getValidePosts().subscribe(async (res) => {
        let a = <any>Object;
        a = res;
        this.postValides = await a.message1;
        this.onMapReady(this.map);
        this.x = "normalmap";
      });
    }

    this.backGStory = JSON.parse(localStorage.getItem("backGStory"));
    this.init();
    this._us.getStoryUser().subscribe((res) => {
      let a = <any>Object;
      a = res;
      var user = a;
      this.storysUser = user;

    });

  }


  init() {
    setTimeout(() => {
      $(window).trigger('resize');

    }, 50)
    this.initializeMapOptions();

  }




  private initializeMapOptions() {

    this.mapOptions = {
      center: L.latLng(36.862499, 10.195556),
      zoom: 8,
      layers: [
        L.tileLayer(
          'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
          {
            maxZoom: 19,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };

  }
  onMapReady(map: L.Map) {
    setTimeout(() => {
      setTimeout(() => {
        setTimeout(function () { map.invalidateSize() }, 0);
      }, 50);
      this.map = map;
      let t = this;

      this.postValides.forEach(element => {
        //this.idPost = element.id;
        let t = this;
        this.markers.addLayer(L.marker([element.id_region.latitude, element.id_region.longitude], element.signe == "positive" ? this.icon : this.icon2)
          .bindTooltip(element.titre, { permanent: false, direction: 'top' })
          .on('click', function () {
            t.openModel(element.id);
          })
        );

        map.addLayer(this.markers);
      });

    }, 0);
  }


  async openModel(eid) {
    this._us.getDetailsPost(eid).subscribe(async (res) => {
      let a = <any>Object;
      a = res;
      var post = a.message1;
      var user = a.message2;
      this.idPost = post.id;
      this.idUserPost = user.id;
      this.imageP = post.imageP;
      this.descriptionP = post.description;
      this.regionP = post.id_region;
      this.imageUser = user.img;
      this.titre = post.titre;
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

    console.log(this.idUserPost);

    console.log("mapUserID: " + this.userPostValides);
    const modal = await this.modalController.create({
      component: ConsulterPostePage,
      componentProps: {
        idPost: eid,
        idUserPost: this.idUserPost
      }
    });

    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', eid);
      console.log('Sending2: ', this.idUserPost);
    });

  }

  storys(s) {
    this._us.getStoryUserId(s.user_id).subscribe(async (res) => {
      let a = <any>Object;
      a = res;
      this.tstoryUser = await a;

   

      const modal = await this.modalController.create({
        component: StoryPage,
        componentProps: {
          s: s,
          idd: this.tstoryUser,
          idU:s.user_id,
        }
      });

      return await modal.present().then(_ => {
        // triggered when opening the modal
        console.log('Sending: ',this.tstoryUser);
      });
    });



  }




}