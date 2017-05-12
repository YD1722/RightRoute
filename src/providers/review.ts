import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Auth} from '../providers/auth';

@Injectable()
export class Review {

  constructor(public http: Http,private authService:Auth) {
  }
/*
  addReview(id:string ,review:any){
    const url= `http://localhost:8080/api/reviews/${id}`;
    let body=JSON.stringify(review);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options)
      .map(res => res.json())
      .catch(this.handleError);
  }*/



  addReview(review:any): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authService.token);
    const url = 'http://localhost:8080/api/reviews';
    return this.http
      .post(url,JSON.stringify(review), {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  getReview(routeNo:any): Promise<any> {
    const url=`http://localhost:8080/api/reviews/${routeNo}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }



}
