import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the Location provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Location {

  constructor(public http: Http, private geolocation:Geolocation) {

  }

  getMyLocation(){
    /*this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude,resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });*/
    this.geolocation.getCurrentPosition();
  }

}
