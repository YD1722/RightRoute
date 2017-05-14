import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {StationDetails} from '../mockData/Stations'
/*
  Generated class for the Stations provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Stations {

  constructor() {
    console.log('Hello Stations Provider');
  }

  getStations():any[]{
    return StationDetails;
  }



  seekArrayLeft(array:any[],a:number,b:number){
    //[1,2,3,4,5]  <-- a<b
    let result:any[]
    for(let i=b;i<a;i--){
      result.push(array[i]);
    }
    return result;
  }
}
