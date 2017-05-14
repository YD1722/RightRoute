import { Component,ViewChild } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController, LoadingController,AlertController} from 'ionic-angular';
import {AppService} from '../../providers/app';
import {ReviewPage} from '../../pages/review/review';
import {AddReviewPage} from '../../pages/add-review/add-review';
import {LoginPage} from '../../pages/login/login';
import {Review} from '../../providers/review';
import {Auth} from '../../providers/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';

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
  gridPath:any;
  isToggled: boolean;
  watch:any;
  //location_service_on:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private appService: AppService, private modalCtrl: ModalController,
              private loadCtrl:LoadingController,private alertCtrl:AlertController,private reviewService:Review,
              private authService:Auth,private geolocation: Geolocation,private socialSharing: SocialSharing) {
    this.root = navParams.get('root')[0];
  }

  ionViewDidLoad() {
    //this.location_service_on=false;
    this.isToggled = false;
    this.mapNotLoaded = "true";
    this.mapLoaded = null;
    this.path= this.root.path;

    this.gridPath=this.makeDataMoreReadable(this.root.path);
    //this.root.chunkPath = this.appService.chunkList(this.root.path, 4);
    console.log(this.root);
  }

  wtzAppShare(){
    this.socialSharing.shareViaWhatsApp("Mate,check out this route",null,"AppLink");
  }

  notify(event: any) { 
    //console.log("Toggled: "+ this.isToggled); 
   
    if(this.isToggled){
      //show location
      this.watch = this.geolocation.watchPosition()
                  .filter((p) => p.coords !== undefined) //Filter Out Errors
                  .subscribe(position => {
                    let x = position.coords.longitude;
                    let y = position.coords.latitude;
                    console.log(x," ",y);
                    let latLng = new google.maps.LatLng(x,y);

                    let marker = new google.maps.Marker({
                      map: this.map,
                      icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                            new google.maps.Size(22, 22),
                            new google.maps.Point(0, 18),
                            new google.maps.Point(11, 11)),
                            position: latLng
                     });
                    
              });

    }else{
      this.watch.unsubscribe();
    }
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

  makeDataMoreReadable(r1_list:any){
    let r1_grid_list:any=[]; // list of arrays

    let rowNum=0;
    for (let i = 0; i < r1_list.length; i+=4) { //iterate images

    r1_grid_list[rowNum] = Array(4); //declare two elements per row

    if (r1_list[i]) { //check file URI exists
      r1_grid_list[rowNum][0] = r1_list[i] //insert image
    }

    if (r1_list[i+1]) { //repeat for the second image
      r1_grid_list[rowNum][1] = r1_list[i+1]
    }
    if (r1_list[i+2]) { //repeat for the second image
      r1_grid_list[rowNum][2] = r1_list[i+2]
    }
    if (r1_list[i+3]) { //repeat for the second image
      r1_grid_list[rowNum][3] = r1_list[i+3]
    }

      rowNum++; //go on to the next row
  }
  return r1_grid_list;
  }

  showAddReview() {
    this.showLoader();
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      this.navCtrl.push(AddReviewPage,{
        route_name:this.root.name
      });
      this.loading.dismiss();
    },(err) => {
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
      });
  }

  showLoader(){

    this.loading = this.loadCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
}


