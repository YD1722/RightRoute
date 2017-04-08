import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import {Review} from '../../providers/review';

@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html'
})
export class AddReviewPage {
  routeNo: any;
  description: any;
  rating: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
              public user:User, public auth:Auth,private reviewService:Review,private alertCtrl:AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  save(): void {
    let review = {
      description: this.description,
      rating: this.rating,
      user:this.user.details.email,
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
    this.viewCtrl.dismiss(review);


  }

  close(): void {
    this.viewCtrl.dismiss();
  }

}
