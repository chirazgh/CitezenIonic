import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulter-liste-abonne',
  templateUrl: './consulter-liste-abonne.page.html',
  styleUrls: ['./consulter-liste-abonne.page.scss'],
})
export class ConsulterListeAbonnePage implements OnInit {

  @Input() public listeAbnId;
  
  listeAbonne=[];

  constructor(private _us: UserService, private modalController: ModalController,private router:Router) { }

  ngOnInit() {
    
     
    this._us.getAbonneUsers().subscribe(async (res) => {
      let a = <any>Object;
      a = res;
      this.listeAbonne = a.message1;
      console.log("testID: " + this.listeAbonne);
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
