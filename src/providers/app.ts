import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the App provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppService {

  chunkList(list: String[], size) {
    let stationChunks=[];
    for(let i=0;i<list.length;i+=size){
      stationChunks.push(list.slice(i,i+size));
    }
    return stationChunks;
  }
}
