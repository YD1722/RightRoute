import { Component} from '@angular/core';
import {NavController,NavParams,ViewController,LoadingController} from 'ionic-angular';
import {Routes} from '../../providers/routes';
import {Auth} from '../../providers/auth';
import{Http} from'@angular/http';

@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})


export class ReviewPage  {
  
  review: string = "user_reviews";
  isAuthenticate: boolean = false;

  searchQuery: string=null ;
  items:any=[];
  reviews:any;

  constructor(public http:Http,public loadCtrl:LoadingController,public navCtrl:NavController,
              public routeService:Routes,public navParams:NavParams,private viewCtrl:ViewController,
              private authService:Auth) {}

  ionViewDidLoad(){
    this.reviews=this.navParams.get('reviews');
    for(let review of this.reviews){
         let date = new Date(review.createdAt);
         review.createdAt= date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
         console.log(review);
    }
    this.authService.checkAuthentication().then(res=>{
      this.isAuthenticate=true;
      console.log(res);
      
    },(err)=>{
      this.isAuthenticate=false;
    })
  }
  initializeItems() {
    this.items=this.routeService.getRoutes();
  }

  checkMyReviews(){

  }

  close(){
    this.viewCtrl.dismiss();
  }


  //search function dropdown
  getItems(ev: any) {

    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    this.searchQuery= val;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  doSomething(){
    console.log("amma gahai");
  }


}
