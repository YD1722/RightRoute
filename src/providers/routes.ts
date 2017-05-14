import { Injectable } from '@angular/core';
import { Http,Response, Headers,RequestOptions} from '@angular/http';

import {BusRoutes} from '../mockData/BusRoutes';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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

  testUrl='http://localhost:8080/api/routeList';

  getTest(searchStr:string):Observable<any[]>{  // make this route type :D
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.testUrl,{name:searchStr},options)  
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  
  find_busses_from(station_name:String):Observable<any[]>{
    return this.http.get(`http://localhost:8080/api/route/${station_name}`)  
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
