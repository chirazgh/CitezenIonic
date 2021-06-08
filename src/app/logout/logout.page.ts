import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private _us: UserService, private router: Router, private toastController: ToastController) {
    this.logout()
   }

  ngOnInit() {
    
  }


  
  logout() {

    this._us.logout().subscribe((res) => {

      console.log("cv");
      localStorage.removeItem('remember_me');
      localStorage.removeItem('tokenPushNotif');
      localStorage.removeItem('access_token');
      this.router.navigateByUrl('/');
      this.toastController.create({
        message: 'A votre prochaine découverte!!',
        color: 'success',
        duration: 2000
      }).then(toast => toast.present());
      localStorage.removeItem("backGStory");

    })
  }

}
