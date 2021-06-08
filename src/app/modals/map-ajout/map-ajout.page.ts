import { Component, OnInit, Input } from '@angular/core';
import * as $ from "jquery";
import * as L from 'leaflet';
import { PhotoService } from 'src/app/services/photo.service';
import { ModalController } from '@ionic/angular';
import { AjoutPostPage } from 'src/app/ajout-post/ajout-post.page';


@Component({
  selector: 'app-map-ajout',
  templateUrl: './map-ajout.page.html',
  styleUrls: ['./map-ajout.page.scss'],
})
export class MapAjoutPage implements OnInit {

  map: any;
  mapOptions: L.MapOptions;
  theMarker: L.Marker;
  infoDestination;
  coord;
  latt;
  long;
  data = [];


  constructor(private modalController: ModalController, private _gps: PhotoService, private photoService: PhotoService,) { }

  ngOnInit() {
    this.initializeMapOptions();
  }




  private initializeMapOptions() {
    this.mapOptions = {
      center: L.latLng(36.862499, 10.195556),
      zoom: 8,
      layers: [
        L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          }),
      ],
    };
  }
  onMapReady(map: L.Map) {
    setTimeout(() => {
      $(window).trigger('resize');
    }, 0)
    $('#map').on('shown.bs.modal', function (e) {
      setTimeout(function () { map.invalidateSize() }, 0);
    })
    this.map = map;
    let t = this;
    this.map.on('click', function (e) {
      //Add a marker to show where you clicked.

      if (t.theMarker != undefined) {
        t.theMarker.setLatLng([e["latlng"].lat, e["latlng"].lng])
        t.infoDestination = {
          lat: e["latlng"].lat,
          lng: e["latlng"].lng
        }
        t.photoService.reverseSeach(e["latlng"].lat, e["latlng"].lng).subscribe((result) => {
          console.log(result)
          t.theMarker.bindPopup("<b>" + result.display_name + "</b>").openPopup();

          t.infoDestination = {
            lat: e["latlng"].lat,
            lng: e["latlng"].lng,
            name: result.display_name
          }

          $("#coordonnees").val(result.display_name).change();
          
          
          t.coord = t.infoDestination.name;
          t.latt = e["latlng"].lat;
          t.long = e["latlng"].lng;

          console.log("testdata1: "+t.infoDestination);
          t.data=t.infoDestination;

    



        }, (error) => {

        })



      } else {
        t.theMarker = new L.Marker([e["latlng"].lat, e["latlng"].lng])
          .setIcon(
            L.icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'leaflet/marker-icon.png'
            }));
        t.theMarker.addTo(map);
        t.photoService.reverseSeach(e["latlng"].lat, e["latlng"].lng).subscribe((result) => {
          //console.log(result)
          t.theMarker.bindPopup("<b>" + result.display_name + "</b>").openPopup();
          t.infoDestination = {
            lat: e["latlng"].lat,
            lng: e["latlng"].lng,
            name: result.display_name
          }
          $("#coordonnees").val(result.display_name).change();
          t.coord = t.infoDestination.name;
          t.latt = e["latlng"].lat;
          t.long = e["latlng"].lng;
          console.log("testdata2: "+t.infoDestination);

          t.data=t.infoDestination;
          /* console.log("coord 11: " + t.coord);
          console.log("latt 11: " + t.latt);
          console.log("long 11: " + t.long); */




        }, (error) => {

        });



      }




    });



  }


  async closeModel() {
    const dataa = this.data;
    await this.modalController.dismiss(dataa);
  }


}
