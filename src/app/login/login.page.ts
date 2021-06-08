import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUserForm: FormGroup;
  
  constructor(private t: Title, private fb: FormBuilder, private router: Router,
    private _us: UserService, private toastController: ToastController, private app: AppComponent) {
    this.t.setTitle("Login");

    this.loginUserForm = fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      motDePass: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      //remember_me: new FormControl(false),
    });
  }

  get email() {
    return this.loginUserForm.get('email');
  }

  get motDePass() {
    return this.loginUserForm.get('motDePass');
  }


  ngOnInit(): void {
    
    this.app.ngOnInit();
  }

  over() {
    $(".vertical-center").css("background-image", "url('../../../../assets/LoginTemplate/images/bg-01.jpg')");
    $(".vertical-center").css("opacity", "1");
  }
  out() {
    $(".vertical-center").css("background-image", "url('../../../../assets/LoginTemplate/images/bg-01.jpg')");
    $(".vertical-center").css("opacity", "0.7");
  }


  login() {
    let data = this.loginUserForm.value;
    this._us.loginUser(data).subscribe( (res) => {

      let a =  res;

      console.log("test");
      

      localStorage.setItem("access_token", a.access_token);
      //localStorage.setItem("remember_me", data.remember_me.toString());

      this.router.navigateByUrl('/map')
      this.toastController.create({
        message: 'Bienvenue!',
        color: 'success',
        duration: 2000
      }).then(toast => toast.present());
    }, (err) => {
      this.toastController.create({
        message: JSON.stringify(err),
        color: 'danger',
        duration: 7000
      }).then(toast => toast.present());
    }
    )
  }
  goToInscription() {
    this.router.navigateByUrl('/inscription');
  }

}
