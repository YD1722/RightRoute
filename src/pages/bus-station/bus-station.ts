import { Component,ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import { NavController,LoadingController,ModalController} from 'ionic-angular';
import {StationType} from '../../mockData/DataTypes/StationType';
import {Stations} from '../../providers/stations';
import {StationModalPage} from '../../pages/station-modal/station-modal';
declare var google;
@Component({
  selector: 'page-bus-station',
  templateUrl: 'bus-station.html'
})
export class BusStationPage {
  stations:any[];
  searchQuery: string;
  station:any;


  @ViewChild('map') mapElement;
  map :any;

  loadMap:any='loaded';
  notLoadMap:any;
  constructor(private stationService:Stations, public http:Http,public modalCtrl:ModalController){
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
    this.stations=this.stationService.getStations();
  }

  showStations(ev: any) {

    // Reset items back to all of the items
    this.initStations();

    // set val to the value of the searchbar
    let val = ev.target.value;
    this.searchQuery= val;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.stations = this.stations.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  };

  getStation(id:string){
    this.getStationDetails(id).then(station=>{
      let stationModal=this.modalCtrl.create(StationModalPage,{
        station:station
      });
      stationModal.present();
    })
  }

  // this one should navigate to station provider :D
  getStationDetails(id:string){
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


 /* getStationDetails(id:string):Promise<any>{
    const url= `http://localhost:8080/api/stations/${id}`;
    return this.http.get(url).toPromise().
      then(res=> Promise.resolve(res))
      .catch(this.handleError);
  }
*/
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



}
