import { Component } from '@angular/core';
import {NavController, LoadingController,ViewController} from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { AddReviewPage } from '../add-review/add-review';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  role: string ='normal';  //admin access is not available in application level
  email: string;
  password: string;
  username:string;
  loading:any;

  constructor(public navCtrl: NavController, public authService: Auth,
               public loadingCtrl: LoadingController,private viewCtrl:ViewController) {

  }

  register(){

    this.showLoader();

    let details = {
      email: this.email,
      username:this.username,
      password: this.password,
      role: this.role
    };

    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      //this.navCtrl.setRoot(AddReviewPage);
      this.viewCtrl.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
