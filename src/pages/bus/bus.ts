import { Component } from '@angular/core';
import { NavController,LoadingController,ModalController} from 'ionic-angular';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {TestPage} from '../../pages/test/test';

@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html'
})
export class BusPage {

  searchQuery: string = '';
  items:any=[];

  constructor(public http:Http,public loadCtrl:LoadingController,public navCtrl:NavController,
  public modalCtrl:ModalController) {

    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      "100","101","140"
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  };

  searchBus(item){
    this.searchBusRoute(item).then(data=>{
      let routeModal=this.modalCtrl.create(TestPage,{
        root:data
      });
      routeModal.present();

    });

  }

  searchBusRoute(item) {

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
  }
}
