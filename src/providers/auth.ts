import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Storage} from '@ionic/storage';
import {AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class Auth {

  public token: any;

  constructor(public http: Http, public storage: Storage,private alertCtrl: AlertController) {}

  checkAuthentication(){
    return new Promise((resolve,reject)=>{
      this.storage.get('token').then((value)=>{
        this.token=value;

        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get('http://localhost:8080/api/auth/protected',{headers:headers})
          .subscribe(res=>{
            resolve(res);
          },err=>{
            reject(err);
          }); // check authentication?
      });
    });
  }

  //register process
  createAccount(details){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type','application/json');

      this.http.post('http://localhost:8080/api/auth/register', JSON.stringify(details), {headers: headers})
        .subscribe(res => {
          //regiter process send a token :D
          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          resolve(data);

        }, (err) => {
          console.log(err.status);
          if(err.status==500){
            let alert= this.alertCtrl.create({
              title: 'Error!',
              subTitle: 'User already exists!',
              message:'try a different user name or different email adress',
              buttons: ['ok'],
              enableBackdropDismiss:true
          });
          alert.present();
          }
          reject(err);

          

          /*console.log(err);
          reject(err);*/

        });

    });

  }


  login(credentials){
    return new Promise((resolve,reject)=>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');

      this.http.post('http://localhost:8080/api/auth/login',JSON.stringify(credentials),{headers:headers})
        .subscribe(res=>{
          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          resolve(data);
          //resolve(res.json()); // ????
        },(err)=>{
          reject(err);
        });
    });
  }

  logout(){
    this.storage.set('token', '');
  }
}
