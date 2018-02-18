import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {Http} from "@angular/http";
import {GlobalvarsProvider} from "../../providers/globalvars/globalvars";
import { NativeStorage } from '@ionic-native/native-storage';
import {HomePage} from "../home/home";
import {FCM} from "@ionic-native/fcm";
import {DatabaseProvider} from "../../providers/database/database";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email;
  nameFromServer;
  developers = [];
  developer = {};
  password;
  constructor(public platform:Platform, public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController,private fcm: FCM,public http:Http,public loadingCtrl:LoadingController,
              public globalVar:GlobalvarsProvider,public databaseprovider:DatabaseProvider
              ,private nativeStorage: NativeStorage) {
    // this.platform.ready().then(() => {
    //
    // });


    //

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  forgotPassword()
  {
    let alert = this.alertCtrl.create({
      title: 'Forgot Password',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset',
          handler: data => {
            console.log("Email->" + data.email);
            // let User;
            // if (User.isValid(data.email, data.password)) {
            //   console.log("Email->" + data.email);
            //   // logged in!
            // } else {
            //   // invalid login
            //   return false;
            // }
          }
        }
      ]
    }).setCssClass('forgot');

    alert.present();
  }
  login(){
    let tokenFirebase;
    let loadingPopup = this.loadingCtrl.create({
      content: "Authenticating...",
      spinner: 'circles'
    });
    console.log("Email->" + this.email +" password->" + this.password);
    this.fcm.subscribeToTopic('all');
    loadingPopup.present();
    this.fcm.getToken().then(token => {
      console.log("Token-> getToken()" + token);
      tokenFirebase = token;
      console.log("Token->" + tokenFirebase+ "->token" + token);
      let body = new FormData();
      body.append('username', this.email);
      body.append('password',this.password);
      body.append('device_id',token);
      let headers = new Headers();
      let options = { headers: headers };
      this.http.post('http://booking.springsportsacademy.com/rest_api/login/', body ).subscribe(data => {
        // console.log(JSON.stringify(data));
        // alert(JSON.stringify(data));
        loadingPopup.dismiss();
        let data_to_use = data.json();
        console.log("Name->"+ data.json().user_details.name);
        this.nameFromServer = data.json().user_details.name;
        this.nativeStorage.setItem('login_true',"true");
        this.nativeStorage.setItem('name',this.nameFromServer);
        this.nativeStorage.setItem('email',this.email);
        this.nativeStorage.setItem('token',token);
        this.nativeStorage.setItem('password',this.password);
        // this.storage.set('loggedInUser', 'true');
        // themail = data_to_use.user_details.email;
        // let password = this.password;
        this.addDeveloper(this.nameFromServer,this.email,this.password,token);
        console.log("Result-> "+JSON.stringify(data_to_use));
      },error2 => {
        //        loadingPopup.dismiss();
        console.log("error->" + error2);
      });
      // this.globalVar.setMyGlobalVar(token);
    });

  }
  saveUserDetails(){
  }
  addDeveloper(name,email,password,deviceid) {

    console.log("Button Clicked addDeveloper()");
    //TODO Code for inserting in sqlite
    this.databaseprovider.addDeveloper(name,email,password,deviceid)
      .then(data => {
        this.loadDeveloperData();
      });
    // this.sendToServer();
    this.developer = {};
    this.navCtrl.setRoot(HomePage,{},{animate: true, animation:'transition',duration:300, direction: 'forward'})

  }
  loadDeveloperData() {
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
      console.log(data);
    })
  }
}


