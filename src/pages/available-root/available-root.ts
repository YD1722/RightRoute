import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import {Stations} from '../../providers/stations';
@Component({
  selector: 'page-available-root',
  templateUrl: 'available-root.html'
})
export class AvailableRootPage {
  p1:any;
  p2:any;
  availableRoutes:any;
  connected_routes:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
              private stationService:Stations) {
  }

  ionViewDidLoad(){
    this.initArrays();
  }

  initArrays(){
    this.p1_stations=this.stationService.getStations();
    this.p2_stations=this.stationService.getStations();
  }
  findWay(){
    this.typeNotOccured="searchOccured";
    this.findBusRoutes().then(data=> {
      let p1 = this.p1;
      let p2 = this.p2;
      let p1_list:any=[];
      let p2_list:any=[];

      //console.log("length ",(<any>data).length);
      //console.log("data before ", data);
      let type= data[(<any>data).length-1].type;
      (<any>data).pop();  // have a look again
      //console.log("data ", data);
      //case 1 (direct route)
      if(type=='direct'){
        this.availableRoutes=data;
      }
      //case 2- connected  busses
      else{
        for(let route of <any>data){
          console.log("routes: ",route.path)
          if(route.path.includes(p1)){
            p1_list.push(route);
            console.log(p1," ",route.path);
          }else if(route.path.includes(p2)){
            p2_list.push(route);
            console.log(p2," ",route.path);
          }
        }



      }
      /*let a=[1,2,3];
      let b= [9,4,6];

      var c=a.filter(function(n) {
        return b.indexOf(n) !== -1;
      });
      console.log(c);*/

      let connected_routes:Object[]=[];
      p1_list.forEach(function(elem1){
        p2_list.forEach(function(elem2){
          // find intersection between two arrays
          var c=elem1.path.filter(function(n) {
            return elem2.path.indexOf(n) !== -1;
          });
          var connected_route={
            //p1:this.p1,
            //p2:this.p2,
            in:elem1.path,
            con:c,
            out:elem2.path
          }
          //this.makeData(connected_route,);
          connected_routes.push(connected_route);
        })
      });
      console.log("connected ",connected_routes);
      this.connected_routes=connected_routes;



      }
    )}

  makeData(connected_route:any){
    let r1= connected_route.in.path;
    let r2= connected_route.out.path;
    let con= connected_route.c;
    let p1=connected_route.p1;
    let p2=connected_route.p2;


    let p1_ =r1.getIndex(p1);
    let p2_=r2.getIndex(p2);
    let c_p1= r1.getIndex(con);
    let c_p2= r2.getIndex(con);

  }

  seekArrayLeft(array:string[],a:number,b:number){
    //[1,2,3,4,5]  <-- a<b
    for(let i=b; i<a ;i--){

    }
  }
  findBusRoutes(){
    let searchOptions = {
      p1:this.p1,
      p2:this.p2
    }

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:8080/api/bus_routes', JSON.stringify(searchOptions), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);

        });

    });
  }



  //clear search criterias
  clearp1(){
    this.p1="";
    this.searchQueryp1=null;
  }
  clearp2(){
    this.p2="";
    this.searchQueryp2=null;
  }
  p1_stations:any[];
  p2_stations:any[];
  searchQueryp1:string;
  searchQueryp2:string;



  typeNotOccured:any;
   getp1(ev: any){
    this.initArrays(); // init always?? need a solution here
     this.typeNotOccured=null;
    let val = ev.target.value;
    this.searchQueryp1=val;
    if (val && val.trim() != '') {
      this.p1_stations = this.p1_stations.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getp2(ev: any){
    //this.searchQuery=null;
    this.typeNotOccured=null;
    this.initArrays(); // init always?? need a solution here
    let val = ev.target.value;
    this.searchQueryp2=val;
    if (val && val.trim() != '') {
      this.p2_stations = this.p2_stations.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  setvalp1(name:string){
    this.p1=name;
    this.searchQueryp1=null;
  }
  setvalp2(name:string){
    this.p2=name;
    this.searchQueryp2=null;
  }
  printMe(){
     console.log("he")
  }

}
