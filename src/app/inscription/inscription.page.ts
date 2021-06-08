import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UserModule } from 'src/app/models/user/user.module';
import { UserService } from 'src/app/services/user.service'
import { format } from "date-fns";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  @ViewChild('signupSlider') signupSlider;

  inscriptionUserForm: FormGroup;
  user: UserModule;

  public submitAttempt: boolean = false;


  image: any = '';
  private file: File;
  selectedFile: File;


  constructor(public formBuilder: FormBuilder, public toastController: ToastController, private _us: UserService,
    private router: Router, private fb: FormBuilder, private camera: Camera) {

    this.inscriptionUserForm = fb.group({
      nom: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z]+")
      ]),
      prenom: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z]+")
      ]),
      dateNaiss: new FormControl("", [
        Validators.required,
      ]),
      adresse: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z][0-9]+")
      ]),
      tel: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8)
      ]),
      cin: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8),
        Validators.maxLength(8)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      motDePass: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      ReMotDePass: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      img: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {

  }

  get nom() {
    return this.inscriptionUserForm.get('nom');
  }

  get prenom() {
    return this.inscriptionUserForm.get('prenom');
  }

  get dateNaiss() {
    return this.inscriptionUserForm.get('dateNaiss');
  }

  get adresse() {
    return this.inscriptionUserForm.get('adresse');
  }

  get tel() {
    return this.inscriptionUserForm.get('nom');
  }

  get cin() {
    return this.inscriptionUserForm.get('cin');
  }

  get email() {
    return this.inscriptionUserForm.get('email');
  }

  get motDePass() {
    return this.inscriptionUserForm.get('motDePass');
  }

  get ReMotDePass() {
    return this.inscriptionUserForm.get('ReMotDePass');
  }

  get img() {
    return this.inscriptionUserForm.get('img');
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


  async inscription() {

    const fd = new FormData();
    let data1 = this.inscriptionUserForm.value;

    const usr = new UserModule(data1.nom, data1.prenom, format(new Date(data1.dateNaiss), "yyyy-MM-dd"), data1.adresse, data1.email, data1.motDePass,
      data1.cin, data1.tel, null);
    ///console.log("img"+this.file);

    let blob = await fetch(this.image).then(r => r.blob());
    
    fd.append('img', blob, "file.jpg");
    fd.append('user', JSON.stringify(usr));

    this._us.addUser(fd, data1.ReMotDePass).subscribe(() => {

      this.router.navigateByUrl('/')
      this.toastController.create({
        message: 'Inscription avec succée!',
        color: 'success',
        duration: 7000
      }).then(toast => toast.present());
    }, (err) => {
      this.toastController.create({
        message: JSON.stringify(err),
        color: 'danger',
        duration: 1000
      }).then(toast => toast.present());
    }
    )
  }


}
