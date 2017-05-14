import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController, ToastController,LoadingController} from 'ionic-angular';
import {StationType} from '../../mockData/DataTypes/StationType';
import {Routes} from '../../providers/routes';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-station-modal',
  templateUrl: 'station-modal.html'
})
export class StationModalPage {
  station:StationType;
  bus_routes:any;
  locate_stat:boolean=true;  
  @ViewChild('map') mapElement;
  map :any;
  marker:any;
  my_marker:any;
  station_latLng:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController, private routeService:Routes,
    private geolocation: Geolocation,private toastCtrl: ToastController,
    private loadingCtrl:LoadingController) {

    this.station= navParams.get('station');

    }

  ionViewDidLoad() {
    this.station_latLng = new google.maps.LatLng(
      {lat:this.station.coordinates[1], lng: this.station.coordinates[0]}
      );
    this.initMap();
    this.load_bus_routes();

  }

  initMap(){
    
    /*let lat=this.station.coordinates[1];
    let lang= this.station.coordinates[0];*/
    //console.log(lat);
    //console.log(lang);

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.station_latLng,
      zoom: 16
    });
    let marker=this.marker;
    marker = new google.maps.Marker({
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: this.station_latLng
    });

    marker.addListener('click', function(){
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  }

  load_bus_routes(){
    this.routeService.find_busses_from(this.station.station_name).subscribe(routes=>{
      this.bus_routes=routes;
    });


  }

  getMyLocation(){

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'getting your location'
     });

     loading.present();

    this.locate_stat=false;
    this.geolocation.getCurrentPosition().then((resp)=>{

       let lat=resp.coords.latitude;
       let lang= resp.coords.longitude;
       let myLatLng = new google.maps.LatLng({lat:lat, lng: lang});

       /*this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: myLatLng,
          zoom: 10
        });*/

        //this.map['center']= myLatLng;
        this.map.panTo(myLatLng);
        loading.dismiss();

        this.my_marker = new google.maps.Marker({
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: myLatLng,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8.5,
              fillColor: "#2980B9  ",
              fillOpacity: 0.4,
              strokeWeight: 0.4
          },

        });
    //catch position??
    }).catch(err=>{
        loading.dismiss();
          let toast = this.toastCtrl.create({
          message: 'something went wrong',
          position:'middle',
          duration: 1000
          });
          toast.present();
          this.locate_stat=true;
      });
  }

  getStationLocation(){
    this.my_marker.setMap(null);
    this.locate_stat=true;
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'getting station location'
    });

    this.map.panTo(this.station_latLng);
    loading.dismiss();



  }



  closeModal(){
    this.viewCtrl.dismiss();
  }

}
