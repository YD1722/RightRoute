import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {BusRoutes} from '../mockData/BusRoutes';

/*
  Generated class for the Routes provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Routes {

  constructor(private http:Http) {
    console.log('Hello Routes Provider');
  }

  getRoutes():any[]{
    return BusRoutes;
  }

  findBusRoutes(p1,p2){
    let searchOptions = {
      p1:p1,
      p2:p2
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

}
