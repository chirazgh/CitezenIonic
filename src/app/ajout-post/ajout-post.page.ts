import { Component, OnInit, Input } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import * as L from 'leaflet';
import { Post } from 'src/app/models/post/post.module';
import { Region } from 'src/app/models/region/region.module';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { MapAjoutPage } from 'src/app/modals/map-ajout/map-ajout.page'
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { GpsService } from '../services/gps.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-ajout-post',
  templateUrl: './ajout-post.page.html',
  styleUrls: ['./ajout-post.page.scss'],
})
export class AjoutPostPage implements OnInit {


  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };


  //public photos: Photo[] = [];
  public images = [];

  status : String = "un point négatif."
  ajoutPostForm: FormGroup;
  selectedFile: File;
  map: any;
  mapOptions: L.MapOptions;
  theMarker: L.Marker;
  infoDestination;
  signeP = false;
  pictureSource;   // picture source
  destinationType; // sets the format of returned value 
  image = '';

  @Input() public coordonnees;
  @Input() public latt;
  @Input() public long;
  @Input() public dataa;

  regCoord=[];


  constructor(private t: Title, private camera: Camera, public actionSheetController: ActionSheetController,
    private fb: FormBuilder, private router: Router, private _gps: GpsService, private gpsService: GpsService,
    private photoService: PhotoService, private modalController: ModalController, private toastController: ToastController) {

    this.t.setTitle("Ajout post");

    this.ajoutPostForm = fb.group({
      descriptionP: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z]+")
      ]),

      titreP: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z]+")
      ]),

      signe: new FormControl("", [
        Validators.required,
      ]),

      img: new FormControl("", [Validators.required])
    });
  }



  get descriptionP() {
    return this.ajoutPostForm.get('descriptionP');
  }
  get img() {
    return this.ajoutPostForm.get('img');
  }

  get titreP() {
    return this.ajoutPostForm.get('titreP');
  }

  get signe() {
    return this.ajoutPostForm.get('signe');
  }

  ngOnInit() {
  

    $("#coordonnees").val(this.coordonnees);
    console.log(JSON.stringify(this.dataa));
    

  }


  FieldsChange(values: any) {

    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true) {
      console.log("signe: " + values.currentTarget.checked);
      
      this.status = "un point positif."
    } else {
      console.log("signe: " + values.currentTarget.checked);
      this.status = "un point négatif."
   
    }
  }

  async addPhotoGallerie() {
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpg;base64,' + libraryImage;
  }
  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async addPhotoCamera() {
    const cameraPhoto = await this.openCamera();
    this.image = 'data:image/jpg;base64,' + cameraPhoto;

  }
  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

   //Usage example:
   b64toBlob(dataURI) {

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  async ajoutPost() {
    const fd = new FormData();
    let data = this.ajoutPostForm.value;
    // if (data.signe == true)
    this.signeP = data.signe;
    const post = new Post(null, data.titreP, data.descriptionP, this.signeP.toString(), null);
    
    let region = new Region(this.coordonnees, this.latt, this.long);

    let blob = await fetch(this.image).then(r => r.blob());
    
    fd.append('img', blob, "file.jpg");
    fd.append("titre", data.titreP);
    fd.append("des", data.descriptionP);
    console.log("latitude: "+ this.long);
    console.log("longitude: "+ this.latt);
    console.log("nom_region: "+ this.coordonnees);

    


    console.log("data : ddd", this.signeP);
    if (this.signeP == true) {
      fd.append("signe", "positive");
      //document.getElementById('this.signeP').checked = true;
      //console.log("local : ",localStorage.getItem("this.signeP"));
      console.log("data : ", this.signeP);
    }
    if (this.signeP == false) {
      fd.append("signe", "negative");
      //console.log("local : ",localStorage.getItem("this.signeP"));
      console.log("data : ", this.signeP);
    }
    console.log("data : ", this.signeP);

    fd.append('region', JSON.stringify(region));
    console.dir(fd.get("region"));
    console.log(data.titreP);

    this._gps.addPost(fd).subscribe((res) => {
      this.toastController.create({
        message: 'Ajout avec succée!',
        color: 'success',
        duration: 2000
      }).then(toast => toast.present());
      this.router.navigateByUrl('/map')
    }, (err) => {
      this.toastController.create({
        message: JSON.stringify(err),
        color: 'danger',
        duration: 7000
      }).then(toast => toast.present());
    }
    ); 
  }


  



  async openmap() {

    const modal = await this.modalController.create({
      component: MapAjoutPage,
      componentProps: {

        coordonnees: this.coordonnees,
        latt: this.latt,
        long: this.long
      }
    });

    const datas =  modal.onDidDismiss().then((res)=>{
      this.coordonnees = res.data.name 
      this.latt = res.data.lat
      this.long = res.data.lng
    });
    console.log(this.coordonnees);
    console.log(this.latt);

    /*
    const reg = dataa;
        
         
    */
       


    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending Map: ' + datas);
    });

    

  }


}
