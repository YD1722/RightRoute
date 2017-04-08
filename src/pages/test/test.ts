import { Component,ViewChild } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController, LoadingController,AlertController} from 'ionic-angular';
import {AppService} from '../../providers/app';
import {ReviewPage} from '../../pages/review/review';
import {AddReviewPage} from '../../pages/add-review/add-review';
import { Auth } from '@ionic/cloud-angular';
import {LoginPage} from '../../pages/login/login';
import {Review} from '../../providers/review';
declare var google;

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})

export class TestPage {
  root: any;
  mapNotLoaded: any;
  mapLoaded: any;

  @ViewChild('map') mapElement;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private appService: AppService, private modalCtrl: ModalController, public auth: Auth,
              private loadCtrl:LoadingController,private alertCtrl:AlertController,private reviewService:Review) {
    this.root = navParams.get('root')[0];
  }

  ionViewDidLoad() {
    this.mapNotLoaded = "true";
    this.mapLoaded = null;
    this.root.chunkPath = this.appService.chunkList(this.root.path, 4);
    console.log(this.root)
  }

  loadMap() {
    this.mapNotLoaded = null;
    this.mapLoaded = "true";
    this.initMap();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: 6.923543, lng: 79.856034},
      zoom: 12
    });

    let ctaLayer = new google.maps.KmlLayer({
      url: this.root.kml_path,
      map: this.map
    });
    ctaLayer.setMap(this.map)

  }

  getMyLoacation() {

  }


  showAddReview() {
    if (this.auth.isAuthenticated()) {
      this.navCtrl.push(AddReviewPage);
    } else {
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    }
  }

  logout() {
    let loader = this.loadCtrl.create({
      content: "Logging out..."
    });
    loader.present();
    this.auth.logout();
    loader.dismissAll();
    let alert = this.alertCtrl.create({
      title:'LogOutSuccefuly',
      buttons:['OK']
    });   // NEED MORE ATTENTION HERE
    alert.present();
  }

  showReview(){
    this.reviewService.getReview(this.root.name)
      .then(review=>{
        let modal=this.modalCtrl.create(ReviewPage,{reviews:review[0].reviews});
        modal.present();
       /*console.log(review);
       console.log(review[0].reviews);*/
      }
      );
  }
}


