import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import { NavController,LoadingController,ModalController} from 'ionic-angular';
import {StationType} from '../../mockData/DataTypes/StationType';
import {Stations} from '../../providers/stations';
import {StationModalPage} from '../../pages/station-modal/station-modal';
import {Station} from '../../providers/station';

declare var google;
@Component({
  selector: 'page-bus-station',
  templateUrl: 'bus-station.html'
})
export class BusStationPage implements OnInit{
  stations:any[];

  searchQuery: string;
  station:any;


  @ViewChild('map') mapElement;
  map :any;

  loadMap:any='loaded';
  notLoadMap:any;
  constructor(private stationService:Station, public http:Http,public modalCtrl:ModalController){
  }

  ngOnInit(){
    //this.initStations();
    //console.log("station page",this.stations);
  }

  initMap(){
    this.notLoadMap=null;
    this.loadMap='loaded';

    const lat= this.station.coordinates[0];
    const lang= this.station.coordinates[1];

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: lat, lng:lang},
      zoom:15
    });
  }

  initStations(){
    this.stations=this.stationService.importStations();
  }


  showStations(ev: any) {
     //this.initStations();
    // Reset items back to all of the items
    //removed arry initialisation

    // set val to the value of the searchbar

    /*if(val && val.trim() != '') {
      this.routeService.getTest(this.searchQuery).subscribe(
        routes => this.items = routes
      );
    }else{
      this.items=[];
    }*/

    let val = ev.target.value;
    this.searchQuery= val;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.stationService.getTest(this.searchQuery).subscribe(
          stations=> this.stations=stations
        );
    }else{
      this.stations=[];
    }
  };


  getStation(id:string){
    console.log(id);
    this.stationService.getStationDetails(id).then(station=>{
      console.log(station);
      let stationModal=this.modalCtrl.create(StationModalPage,{
        station:station

      });
      stationModal.present();
    })
  }

  // this one should navigate to station provider :D
 /* getStationDetails(id:string){
    this.searchQuery=null;
    this.notLoadMap='notLoad';

    const url= `http://localhost:8080/api/stations/${id}`;
    return new Promise (resolve=>{
      this.http.get(url)
        .map(res=>res.json())
        .subscribe(station=>{
          this.station=station;
          resolve(station);
        })
    });
  }


 /!* getStationDetails(id:string):Promise<any>{
    const url= `http://localhost:8080/api/stations/${id}`;
    return this.http.get(url).toPromise().
      then(res=> Promise.resolve(res))
      .catch(this.handleError);
  }
*!/
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
*/  //garbage :D


}
