import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {StationType} from '../../mockData/DataTypes/StationType';
/*
  Generated class for the StationModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;
@Component({
  selector: 'page-station-modal',
  templateUrl: 'station-modal.html'
})
export class StationModalPage {
  station:StationType;

  @ViewChild('map') mapElement;
  map :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.station= navParams.get('station');
    console.log(this.station);
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    let lat=this.station.coordinates[1];
    let lang= this.station.coordinates[0];
    console.log(lat);
    console.log(lang);
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat:lat, lng:lang},
      zoom: 16
    });

    let marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: {lat: lat, lng: lang}
    });
    marker.addListener('click', function(){
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
