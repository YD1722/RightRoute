import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import {Stations} from '../../providers/stations';
import {Routes} from '../../providers/routes';
@Component({
  selector: 'page-available-root',
  templateUrl: 'available-root.html'
})
export class AvailableRootPage {
  p1:any;
  p2:any;
  availableRoutes:any;
  connected_routes:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
              private stationService:Stations, private routeService:Routes) {
  }

  ionViewDidLoad(){
    this.initArrays();
  }

  initArrays(){
    this.p1_stations=this.stationService.getStations();
    this.p2_stations=this.stationService.getStations();
  }

  // main method to find available bus routes WRT to user inputs============================
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
      //case 1 (direct route)==========================================
      if(type=='direct'){
        this.availableRoutes=data;
      }
      //case 2- connected  busses=======================================
      else{
        for(let route of <any>data){
          console.log("routes: ",route.path);
          if(route.path.includes(p1)){
            p1_list.push(route);
            console.log(p1," ",route.path);
          }else if(route.path.includes(p2)){
            p2_list.push(route);
            console.log(p2," ",route.path);
          }
        }
      }

      let connected_routes:Object[]=[];
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
          console.log("ado",connected_route);
          //
          //connected_routes.push(connected_route);

          //let route_details  = this.makeData(connected_route);
          connected_routes.push(connected_route);
        })
      });

      for(let route of connected_routes){
        console.log("hey__",route);
        this.connected_routes.push(this.makeData(route));
      }
      }
    )}

  //database access==================================================
  findBusRoutes(){
    let p1=this.p1;
    let p2= this.p2;
    return this.routeService.findBusRoutes(p1,p2);
  }
  // ===============end of main method========================


  makeData(connected_route:any){  // return any ??

    console.log("hey there");

    let r1= connected_route.in_.path;
    let r2= connected_route.out_.path;
    let con= connected_route.con;
    let p1=connected_route.p1;
    let p2=connected_route.p2;

    let p1_ =r1.indexOf(p1);
    let p2_= r2.indexOf(p2);
    let c_p1= r1.indexOf(con);
    let c_p2= r2.indexOf(con);

    //expect(c_p1).toEqual(2);

    let r1_list:any=[];
    let r2_list:any=[];
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
    let route_details:any={
        r1_list:r1_list,
        con:con,
        r2_list:r2_list
    }
    return(route_details);
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


}
