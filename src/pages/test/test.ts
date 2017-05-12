import { Component,ViewChild } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController, LoadingController,AlertController} from 'ionic-angular';
import {AppService} from '../../providers/app';
import {ReviewPage} from '../../pages/review/review';
import {AddReviewPage} from '../../pages/add-review/add-review';
import {LoginPage} from '../../pages/login/login';
import {Review} from '../../providers/review';
import {Auth} from '../../providers/auth';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})

export class TestPage {
  root: any;
  mapNotLoaded: any;
  mapLoaded: any;
  loading:any;
  @ViewChild('map') mapElement;
  map: any;
  path:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private appService: AppService, private modalCtrl: ModalController,
              private loadCtrl:LoadingController,private alertCtrl:AlertController,private reviewService:Review,
              private authService:Auth,private geolocation: Geolocation) {
    this.root = navParams.get('root')[0];
  }

  ionViewDidLoad() {
    this.mapNotLoaded = "true";
    this.mapLoaded = null;
    this.path= this.root.path;
    //this.root.chunkPath = this.appService.chunkList(this.root.path, 4);
    console.log(this.root);
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
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude,resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  showAddReview() {
    this.showLoader();
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      this.navCtrl.push(AddReviewPage);
      this.loading.dismiss();
    }, (err) => {
      let modal=this.modalCtrl.create(LoginPage);
      modal.present();
      this.loading.dismiss();
    });
   /* if (this.auth.isAuthenticated()) {
      this.navCtrl.push(AddReviewPage);
    } else {
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    }*/
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

  showLoader(){

    this.loading = this.loadCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
}


