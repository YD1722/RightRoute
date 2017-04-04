import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {AppService} from '../../providers/app';
import {ReviewPage} from '../../pages/review/review';
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
  mapNotLoaded:any;
  mapLoaded:any;

  @ViewChild('map') mapElement;
  map :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
              private appService:AppService) {
    this.root= navParams.get('root')[0];
  }

  ionViewDidLoad(){
    this.mapNotLoaded="true";
    this.mapLoaded=null;
    this.root.chunkPath= this.appService.chunkList(this.root.path,4);
    console.log(this.root)
  }
  loadMap(){
    this.mapNotLoaded=null;
    this.mapLoaded="true";
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

  getMyLoacation(){

  }

  showReview(){
    this.navCtrl.push(ReviewPage,{root:this.root});
  }

}
