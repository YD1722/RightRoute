import { Component } from '@angular/core';
import { ToastController,ViewController,NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { AddReviewPage } from '../add-review/add-review';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService: Auth,
   public loadingCtrl: LoadingController,private viewCtrl:ViewController,private toastCtrl:ToastController) {

  }


  ionViewDidLoad() {

    /*this.showLoader();

    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.navCtrl.setRoot(AddReviewPage);
    }, (err) => {
      console.log("Not already authorized");
      this.loading.dismiss();
    });*/

  }

  login(){

    this.showLoader();

    let credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'logged in successfully',
        duration: 1000
      });
      toast.present();
      this.viewCtrl.dismiss();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'invalid user credentials',
        duration: 1000
      });
      toast.present();
      this.loading.dismiss();
      console.log(err);
    });

  }

  launchSignup(){
    this.navCtrl.push(SignupPage);
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

  close(){
    this.viewCtrl.dismiss();
  }

}
