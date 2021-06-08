import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulter-abonnement',
  templateUrl: './consulter-abonnement.page.html',
  styleUrls: ['./consulter-abonnement.page.scss'],
})
export class ConsulterAbonnementPage implements OnInit {

  @Input() public listeAbnId;
  
  suivisAbonne;

  constructor(private _us: UserService, private modalController: ModalController,private router:Router) { }

  ngOnInit() {

    this._us.getSuiviUsers().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.suivisAbonne = a.message1;
    })
  }

  async closeModel() {
    await this.modalController.dismiss();
  }

  async goToUserProfile(id) {
    console.log(id);
    this.router.navigate(['/profiles', { idUser: id }]);
    await this.modalController.dismiss();
  }


}
