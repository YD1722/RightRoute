import { Component} from '@angular/core';
import {NavController,NavParams,ViewController,LoadingController,ModalController} from 'ionic-angular';
import {Routes} from '../../providers/routes';
import {Auth} from '../../providers/auth';
import{Http} from'@angular/http';
import {Review} from '../../providers/review';
import {AddReviewPage} from '../../pages/add-review/add-review';

@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})


export class ReviewPage  {
  
  review: string = "user_reviews";
  isAuthenticate: boolean = false;
  current_route :any; // review page is cobined to a special route page// cant search for reviews
  searchQuery: string=null ;
  items:any=[];
  reviews:any;
  my_reviews:any=[];

  constructor(public http:Http,public loadCtrl:LoadingController,public navCtrl:NavController,
              public routeService:Routes,public navParams:NavParams,private viewCtrl:ViewController,
              private authService:Auth,private revService:Review,public modalCtrl: ModalController) {}

  ionViewDidLoad(){
    this.reviews=this.navParams.get('reviews');
    this.current_route= this.navParams.get('route_no');
     // get reviews passed by
    console.log(this.reviews);
   /* for(let review of this.reviews){
         let date = new Date(review.createdAt+'');
         console.log(date);
         review.createdAt= date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
         //console.log(review);
    }
    */
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

  notify(){

    if(this.review =="user_reviews"){


    }else {
      // review = "my_reviews"
      this.authService.checkAuthentication().then((res:any)=>{
          let username=res.user.username;
          //console.log(res.user.username);
          this.getMyReviews(username);

          console.log(this.results," results");

          
      
      },(err)=>{
          console.log("not authenticated");
      });

    }
  }


  userName:String;
  results:any; // results hold my reviews :D

  //jil_tone methods
  getMyReviews(userName:String){
      this.results=[];
      //let searchField ="user";
      for (let i=0 ; i < this.reviews.length ; i++){
        if (this.reviews[i].user == userName) {
            this.results.push(this.reviews[i]);
        }
      }
    
  }

  delete_review(review:any){
    console.log(review);
    this.authService.checkAuthentication().then((res:any)=>{
      let current_user_name= res.user.username;
      console.log(current_user_name," ",review.user);
      if(review.user==current_user_name){
         console.log("user matched");
        // check if the current user delete his own review
          this.revService.deleteReview(this.current_route,review._id).subscribe(res=>{
            console.log("review_deleted");
          });

      }

    });
  } 


  update_review(review:any){
    console.log(review," ","to be updated");
    this.authService.checkAuthentication().then((res:any)=>{
      let current_user_name= res.user.username;
      console.log(current_user_name," ",review.user);
      if(review.user==current_user_name){
         console.log("user matched");
         let update_review_model = this.modalCtrl.create(AddReviewPage,
           {
             is_update_req:true,
             review_:review,
             route_name:this.current_route
           });
           update_review_model.present();
         /* this.revService.updateReview(this.current_route,review._id).subscribe(res=>{
            console.log("review_updated");
          });*/

      }

    });
  }
  
}
