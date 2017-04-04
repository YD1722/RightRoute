import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';

@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage {
  routeNo: any;
  description: any;
  rating: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
              public user:User, public auth:Auth) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }
  save(): void {

    let review = {
      title: this.routeNo,
      description: this.description,
      rating: this.rating
    };

    this.viewCtrl.dismiss(review);

  }

  close(): void {
    this.viewCtrl.dismiss();
  }

}
