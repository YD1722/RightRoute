import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class Review {

  constructor(public http: Http) {
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

  private headers = new Headers({'Content-Type': 'application/json'});
  addReview(review:any): Promise<any> {
    const url = 'http://localhost:8080/api/reviews';
    return this.http
      .post(url,JSON.stringify(review), {headers: this.headers})
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
