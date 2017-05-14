import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {resolve} from "url";
import 'rxjs/add/operator/toPromise';
// Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';


/*
  Generated class for the Station provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Station {

  stations:any[]; //inside station objects:D
  constructor(public http: Http) {
    console.log('Hello Station Provider');
  }

  /*getStationDetails(id:string){
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
 }*/

  initStations(stations:any[]){
    this.stations=stations;
  }

  importStations():any[] {
    return this.stations;
  }

  loadStations(){
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:8080/api/stations')
        .map(res=>res.json())
        .subscribe(stations=>{resolve(stations)},err=>{
          this.handleError(err);
        });
    })
  }

  getStationDetails(id:string){
    return new Promise((resolve,reject)=>{
      this.http.get(`http://localhost:8080/api/stations/${id}`)
        .map(res=>res.json())
        .subscribe(station=>{
          resolve(station)
        },err=>{
          this.handleError(err);
        });
    });
  }
  /* getStationDetails(id:string):Promise<any>{
   const url= `http://localhost:8080/api/stations/${id}`;
   return this.http.get(url).toPromise().
   then(res=> Promise.resolve(res))
   .catch(this.handleError);
   }
   */
   testUrl='http://localhost:8080/api/stationtest';

   getTest(searchStr:string):Observable<Station[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


      return this.http.post(this.testUrl, {var: searchStr}, options)  // why JSON.stringify() not used here ?
        .map((res: Response) => res.json())
        .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



}
