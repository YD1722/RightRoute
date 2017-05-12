import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
//import { Auth, User } from '@ionic/cloud-angular';
import {Auth} from '../../providers/auth';
import {Review} from '../../providers/review';
import{HomePage} from '../../pages/home/home';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html'
})
export class AddReviewPage {
  routeNo: any;
  description: any;
  rating: any=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
              public auth:Auth,private reviewService:Review,private alertCtrl:AlertController) {}

  ionViewDidLoad() {
    //root information must be taken her
  }

  save(): void {
    let review = {
      description: this.description,
      rating: this.rating,
      routeNo:this.routeNo
    };
    console.log(review);
    this.reviewService.addReview(review);
    let alert = this.alertCtrl.create({
      title:'DONE!',
      subTitle: 'review added succefully',
      buttons:['OK']
    });
    alert.present();
    this.navCtrl.setRoot(HomePage);
    //this.viewCtrl.dismiss(review);



  }

  close(): void {
    this.navCtrl.setRoot(HomePage);
    //this.viewCtrl.dismiss();
  }

}
