import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-mdif-image-user',
  templateUrl: './mdif-image-user.page.html',
  styleUrls: ['./mdif-image-user.page.scss'],
})
export class MdifImageUserPage implements OnInit {


  
  //modif image
  id;


  
  image: any = '';
  private file: File;
  selectedFile: File;

  constructor(private _us: UserService, private toastController: ToastController, private router: Router,
    private modalController: ModalController,private camera: Camera) { }

  ngOnInit() {
  }

   //modif image
   onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  async addPhoto() {
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpg;base64,' + libraryImage;
    


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

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    return await this.camera.getPicture(options);
  }

   async modifierImageUser() {
     const fd = new FormData();
    
      let blob = await fetch(this.image).then(r => r.blob());
    
      fd.append('img', blob, "file.jpg");
       fd.append("idUser", this.id);
       this._us.modifImageUser(fd).subscribe((res) => {
         this.ngOnInit();
         
         this.toastController.create({
          message: 'image modifiée!',
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
     
       await this.modalController.dismiss();
   }


   async closeModel() {
    await this.modalController.dismiss();
  }

}
