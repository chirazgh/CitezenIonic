import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {

  @Input() public idd;
  @Input() public s;
  @Input() public idU;



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
  idUserPost;

  constructor(private modalController: ModalController, private _us: UserService,private router: Router) { }

  ngOnInit() {
    this.backGStory = JSON.parse(localStorage.getItem("backGStory"));
    this._us.getStoryUser().subscribe((res) => {
      let a = <any>Object;
      a = res;
      var user = a;
      this.storysUser = user;
      console.log(this.storysUser);
      
      /* this.imagePS
      $("#imagePs").attr("src", "" + this.imagePS); */
    });

    this.getDtailsPostByUserId(this.idd[this.lengthTbSt]);
    this._us.getUserById(this.s.datePost.id).subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.idUserPost = this.s.datePost.id;
      this.imageUserS = a.img;
      this.nomUserS = (a.nom + " " + a.prenom).toUpperCase();
      $("#usernames").html(this.nomUserS);
      $("#imageUsers").attr("src", this.imageUserS);
    })
    
    /* this.backGStory.push(this.s.id);
    localStorage.setItem("backGStory", JSON.stringify(this.backGStory));
    $("#backGStory").css("background-color", "LightGray"); */
  
    
  }


  
  getDtailsPostByUserId(id) {
    this._us.getDetailsPost(id).subscribe((res) => {
      let a = <any>Object;
      a = res;
      var post = a.message1;
      this.idPostS = post.id;

      this.imagePS = post.imageP;
      this.descriptionPS = post.description;
      this.regionPS = post.id_region;
      console.log(this.imagePS);
      
      $("#descriptionP").html(this.descriptionPS);
      $("#regionP").html(this.regionPS);
      $("#imagePs").attr("src", this.imagePS);

      $("#loader").css("display", "none");
      $("#imageP").css("display", "block");
    })
  }


  ToPrevious() {
    console.log("prev");
    
    if (this.lengthTbSt > 0) {
      this.lengthTbSt = this.lengthTbSt - 1;
      this.getDtailsPostByUserId(this.idd[this.lengthTbSt]);

    }
  }
  ToNext() {
    console.log("suiv");
    if (this.lengthTbSt < this.idd.length - 1) {
      this.lengthTbSt = this.lengthTbSt + 1;
      this.getDtailsPostByUserId(this.idd[this.lengthTbSt]);

    }
  }

  async closeModel() {
    await this.modalController.dismiss();
  }


  async goToUserProfileS() {
    await this.modalController.dismiss();
    this.router.navigate(["/profiles", { idUser: this.idU }]);
  }

}
