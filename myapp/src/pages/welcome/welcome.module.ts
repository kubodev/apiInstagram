import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
  ],
})
export class WelcomePageModule {}

import { Instagram } from "ng2-cordova-oauth/core"; 
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { UserService } from '../../providers/user-service/user-service';


import { LoginPage } from '../login/login';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    usuarios
  private oauth: OauthCordova = new OauthCordova();

    private instagramProvider: Instagram = new Instagram(
      {
        //Usuario: pruebafrontend  pass: prueba123
        clientId: "2389e5e66e2d45819ec03f64e05cd8c5",      // Register you client id from https://www.instagram.com/developer/
        redirectUri: 'http://localhost:8100',  // Let is be localhost for Mobile Apps
        responseType: 'token',   // Use token only 
        appScope: ['basic','public_content'] 

        /*
        appScope options are 

        basic - to read a user’s profile info and media
        public_content - to read any public profile info and media on a user’s behalf
        follower_list - to read the list of followers and followed-by users
        comments - to post and delete comments on a user’s behalf
        relationships - to follow and unfollow accounts on a user’s behalf
        likes - to like and unlike media on a user’s behalf

        */ 
    }

    );
  
    private apiResponse;

    constructor(public navCtrl: NavController, public UserService:UserService) {
        this.apiResponse = [];
    }

    login(){
        this.navCtrl.push(LoginPage);
       }
       
    ionViewDidLoad(){
        this.UserService.obtenerDatos().subscribe(
            (data)=>{this.usuarios = data;},
            (error)=>{console.log(error);}

        )
    }
  
    ngOnInit(){
        this.oauth.logInVia(this.instagramProvider).then((success) => {
  
            console.log(JSON.stringify(success));
  
            /* Returns User uploaded Photos */
            this.UserService.getInstagramUserInfo(success).subscribe(response => this.apiResponse=response.data);
  
        }, (error) => {
            console.log(JSON.stringify(error));
        });
    }
  
  }