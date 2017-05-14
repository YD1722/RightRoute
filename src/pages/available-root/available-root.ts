import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import {Station} from '../../providers/station';
import {Routes} from '../../providers/routes';
import {TestPage} from '../../pages/test/test';
import { AlertController,LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
@Component({
  selector: 'page-available-root',
  templateUrl: 'available-root.html'
})
export class AvailableRootPage {
  p1:any;
  p2:any;
  availableRoutes:any;
  connected_routes:any=[];
  stationArray:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
              private stationService:Station, private routeService:Routes,private alertCtrl: AlertController,
              private geolocation:Geolocation,private loadingCtrl:LoadingController) {
  }

  ionViewDidLoad(){
    this.initArrays();
  }

  initArrays(){
    this.p1_stations=this.stationService.importStations();
    this.p2_stations=this.stationService.importStations();
    //rather than save locally typeahead may be fine :D

    this.stationArray=this.stationService.importStations();
  }

  // main method to find available bus routes WRT to user inputs============================
  findWay(){
    this.connected_routes=[];
    this.availableRoutes=[];
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
      //case 1 (direct route)==========================================
      if(type=='direct'){
        this.availableRoutes=data;
        //let pathChunk= this.chunkList(data)
      }
      //case 2- connected  busses=======================================
      else{
        for(let route of <any>data){
          //console.log("routes: ",route.path);
          if(route.path.includes(p1)){
            p1_list.push(route);
            //console.log(p1," ",route.path);
          }else if(route.path.includes(p2)){
            p2_list.push(route);
            //console.log(p2," ",route.path);
          }
        }
      }

      let connected_routes_1:Object[]=[];
      p1_list.forEach(function(elem1){
        p2_list.forEach(function(elem2){
          // find intersection between two arrays
          let c:string[]=elem1.path.filter(function(n) {
            return elem2.path.indexOf(n) !== -1;
          });
          let connected_route:any={
            p1:p1, // start point
            p2:p2,  // end point
            in_:elem1,
            con:c[0],
            out_:elem2
          };
          //console.log("ado",connected_route);
          //
          //connected_routes.push(connected_route);

          //let route_details  = this.makeData(connected_route);
          connected_routes_1.push(connected_route);
        })
      });


      for(let route of connected_routes_1){
        //console.log("hey__",route);
        this.connected_routes.push(this.makeData(route));
      }

      });
    //console.log(this.connected_routes);
  }

  //database access==================================================
  findBusRoutes(){
    let p1=this.p1;
    let p2= this.p2;
    return this.routeService.findBusRoutes(p1,p2);
  }
  // ===============end of main method========================

// mae data method use to mmake data in a user friendly way to show connected bus routes
  makeData(connected_route:any){  // return any ??
    let r1= connected_route.in_.path;
    let r2= connected_route.out_.path;

    let n1= connected_route.in_.name;
    let n2=connected_route.out_.name;

    let con= connected_route.con;
    let p1=connected_route.p1;
    let p2=connected_route.p2;

    let p1_ =r1.indexOf(p1);
    let p2_= r2.indexOf(p2);
    let c_p1= r1.indexOf(con);
    let c_p2= r2.indexOf(con);

    //expect(c_p1).toEqual(2);

    let r1_list:any=[];  // consistes one half of the route
    let r2_list:any=[];  // consist another half of the route
    //let con_list:any=[con];

    //case 1
    if(p1_<c_p1){
      r1_list=this.seekArrayRight(r1,p1_,c_p1,);
      //expect(r1_list).toEqual(["b","c","d"]);
    }else if(p1_>c_p1) {
      r1_list = this.seekArrayLeft(r1,c_p1, p1_);
    }
    console.log(r1_list)
    // case 2
    if(p2_<c_p2){
      r2_list=this.seekArrayLeft(r2,p2_,c_p2);
    }else if(p2_>c_p2){
      r2_list=this.seekArrayRight(r2,c_p2,p2_);
    }
    

    let r1_grid_list:any=this.makeDataMoreReadable(r1_list);
    let r2_grid_list:any=this.makeDataMoreReadable(r2_list);

    let route_details:any={
        n1:n1, // n stands for number of the bus
        n2:n2,
        r1_list:r1_grid_list,
        con:con,
        r2_list:r2_grid_list
    }
   
   console.log(route_details);
   return(route_details);
 
  }


  makeDataMoreReadable(r1_list:any){
    let r1_grid_list:any=[]; // list of arrays

    let rowNum=0;
    for (let i = 0; i < r1_list.length; i+=3) { //iterate images

    r1_grid_list[rowNum] = Array(3); //declare two elements per row

    if (r1_list[i]) { //check file URI exists
      r1_grid_list[rowNum][0] = r1_list[i] //insert image
    }

    if (r1_list[i+1]) { //repeat for the second image
      r1_grid_list[rowNum][1] = r1_list[i+1]
    }
    if (r1_list[i+2]) { //repeat for the second image
      r1_grid_list[rowNum][2] = r1_list[i+2]
    }

      rowNum++; //go on to the next row
  }
  return r1_grid_list;
  }


  seekArrayLeft(array:any[],a:number,b:number){
  //[1,2,3,4,5]  <-- a<b [con<--p1 / p2<--con]
  let result:any=[];
  for(let i=b;a<=i;i--){
    result.push(array[i]);
  }
  return result;
};

seekArrayRight(array:string[],a:number,b:number){
  //[1,2,3,4,5] ---->  a<b [p1-->con / con-->p2]
  let result:any=[];
  for(let i=a;b>=i;i++){
    result.push(array[i]);
  }
  return result;
};




  //clear search criterias===========================================
clearp1(){
    this.p1="";
    this.searchQueryp1=null;
  }
  clearp2(){
    this.p2="";
    this.searchQueryp2=null;
  }


  // dropdown list logic===============================================
  p1_stations:any[];
  p2_stations:any[];
  searchQueryp1:string;
  searchQueryp2:string
  typeNotOccured:any;
getp1(ev: any){
    this.initArrays(); // init always?? need a solution here
     this.typeNotOccured=null;
    let val = ev.target.value;
    this.searchQueryp1=val;
    this.searchQueryp2=null;
    if (val && val.trim() != '') {
      this.p1_stations = this.p1_stations.filter((item) => {
        return (item.station_name.indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getp2(ev: any){
    //this.searchQuery=null;
    this.typeNotOccured=null;
    this.searchQueryp1=null;
    this.initArrays(); // init always?? need a solution here
    let val = ev.target.value;
    this.searchQueryp2=val;
    if (val && val.trim() != '') {
      this.p2_stations = this.p2_stations.filter((item) => {
        return (item.station_name.indexOf(val.toLowerCase()) > -1);
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

  // show direct route details in Route page

  showDirectRoute(root:any){
     this.navCtrl.push(TestPage,{
       root:[root]
     });
  }

  getMyLocation(){
      let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
        <p>this may take sevral minutes</p>
      </div>`,
      });
      loading.present();
      this.geolocation.getCurrentPosition().then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
      let lat=resp.coords.latitude;
      let lang= resp.coords.longitude;
      let myLatLng = new google.maps.LatLng({lat:lat, lng: lang});
      //let location=[resp.coords.latitude,resp.coords.longitude];
      console.log(resp.coords.latitude,resp.coords.longitude);

      this.findNearbyStations(myLatLng);
      //this.useDirectionMatrix();
       this.stationArray.sort((a,b)=>Number(a.distance)-Number(b.distance));
       this.showRadio();
       loading.dismiss();

      console.log(this.stationArray)
     }).catch((error) => {
     console.log('Error getting location', error);
     });

  }
  useDirectionMatrix(){

  }

  findNearbyStations(LatLng:any){
    this.stationArray.map(station=>{this.computeDistance(station,LatLng);
    });
  }

    computeDistance(station:any,LatLng:any):any{
    let coordinates=station.coordinates;
    let stLatLng= new google.maps.LatLng({lat:coordinates[1], lng:coordinates[0]});
    let distance=(google.maps.geometry.spherical.computeDistanceBetween(LatLng,stLatLng)/1000).toFixed(2);
    station.distance=distance;
    return station;
  }

  showRadio() {
    let alert = this.alertCtrl.create({
      title:'Nearby Stations',
      inputs:[{
        type: 'radio',
        label: this.stationArray[0].station_name,
        value: this.stationArray[0].station_name
      },
        {
          type: 'radio',
          label: this.stationArray[1].station_name,
          value: this.stationArray[1].station_name
        }],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            if(this.searchQueryp1){
              this.p1=data;
              this.searchQueryp1=null;
            }
            if(this.searchQueryp2){
              this.p2=data;
              this.searchQueryp2=null;
            }
            //this.testRadioOpen = false;
            //this.testRadioResult = data;
          }
        }

      ]

    });
   /* alert.setTitle('Nearby Stations');

    alert.addInput([{
      type: 'radio',
      label: 'Blue',
      value: 'blue',
      checked: true
    },
      {
        type: 'radio',
        label: 'Red',
        value: 'red',
        checked: true
      }
    ]);

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        //this.testRadioOpen = false;
        //this.testRadioResult = data;
      }
    });*/
    alert.present();
  }
}
