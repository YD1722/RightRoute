import {NavController,ViewController, ModalController, LoadingController,AlertController,ToastController} from 'ionic-angular';
import { Component } from '@angular/core';
import {LoginPage} from '../../pages/login/login';
import {Auth} from '../../providers/auth';
@Component({
  templateUrl:'./popover.html'

})

export class PopoverPage {	
	loading:any;

    constructor(private navCtrl:NavController,private loadCtrl:LoadingController,
    	public viewCtrl: ViewController,private authService:Auth,private modalCtrl:ModalController,
    	private alertCtrl:AlertController,private toastCtrl:ToastController ) {}

  logIn(){
  	this.showLoader();
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
      	message: 'you have already logged in',
      	duration: 1000,
      	position:'middle'
    	});
      toast.present();
      this.viewCtrl.dismiss();
    }, (err) => {
    this.viewCtrl.dismiss();
    let modal=this.modalCtrl.create(LoginPage);
        modal.present();	
      this.loading.dismiss();
    });
  }

  logOut(){
  	let loader = this.loadCtrl.create({
      content: "Logging out..."
    });
    
    this.authService.checkAuthentication().then((res)=>{
    	loader.present();
    	this.authService.logout();
    	loader.dismissAll();
    	let toast = this.toastCtrl.create({
      	message: 'logged out succesfully',
      	duration: 1000,
      	position:'middle'
    	});
    	toast.present();
    	this.viewCtrl.dismiss();
    },(err)=>{
    	let toast = this.toastCtrl.create({
      	message: 'you have already logged out',
      	duration: 2000,
      	position:'middle'
    	});
    	toast.present();  // NEED MORE ATTENTION HERE
    	
    })
    
    
  }

  showLoader(){

    this.loading = this.loadCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
}