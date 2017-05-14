import { Component } from '@angular/core';
import { NavController,LoadingController,ModalController} from 'ionic-angular';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {TestPage} from '../../pages/test/test';

import{BusRoutes} from '../../mockData/BusRoutes';
import {Routes} from '../../providers/routes';

@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html'
})
export class BusPage {

  searchQuery: string;
  items:any=[];

  constructor(public http:Http,public loadCtrl:LoadingController,public navCtrl:NavController,
  public modalCtrl:ModalController,  public routeService:Routes) {

    //this.initializeItems();
    }

  /*initializeItems() {
    this.items=this.routeService.getRoutes();
  }*/

//search function dropdown
  getItems(ev: any) {
  let val = ev.target.value;
  this.searchQuery= val;
  if(val && val.trim() != '') {
      this.routeService.getTest(this.searchQuery).subscribe(
        routes => this.items = routes
      );
    }else{
      this.items=[];
    }
  // Reset items back to all of the items
  //this.initializeItems();

  // set val to the value of the searchbar
  //let val = ev.target.value;
  //this.searchQuery= val;
  // if the value is an empty string don't filter the items
  /*if (val && val.trim() != '') {
    this.items = this.items.filter((item) => {
      return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }*/
}

  searchBus(item:any){  // passing type string ?? have a look here
    this.routeService. searchBusRoute(item).then(data=>{
      //console.log(data);
      /*let routeModal=this.modalCtrl.create(TestPage,{
        root:data
      });
      routeModal.present();*/

      this.navCtrl.push(TestPage,{
        root:data
      });

    });

  }


  /*searchBusRoute(item) {

 let searchResult = {
 name: item
 }
 return new Promise(resolve => {
 let headers = new Headers();
 headers.append('Content-Type', 'application/json');

 this.http.post('http://localhost:8080/api/routes', JSON.stringify(searchResult), {headers: headers})
 .map(res => res.json())
 .subscribe(data => {
 resolve(data);

 });

 });
 }*/

}
