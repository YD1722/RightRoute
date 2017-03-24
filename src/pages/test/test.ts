import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

/*
  Generated class for the Test page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})

export class TestPage {
  root:any;

  @ViewChild('map') mapElement;
  map :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.root= navParams.get('root')[0];
  }

  loadMap(){
    this.initMap();
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: 6.923543, lng:  79.856034},
      zoom:12
    });

let ctaLayer = new google.maps.KmlLayer({
      url: this.root.kml_path,
      map: this.map
    });
    ctaLayer.setMap(this.map)

  }

}
