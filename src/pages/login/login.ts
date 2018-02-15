import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {GlobalvarsProvider} from "../../providers/globalvars/globalvars";
import {NativeStorage} from "@ionic-native/native-storage";
import {HomePage} from "../home/home";
import {FCM} from "@ionic-native/fcm";
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
  password;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,private fcm: FCM,public http:Http,public loadingCtrl:LoadingController,public globalVar:GlobalvarsProvider,public native:NativeStorage) {
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
        this.native.setItem('name',data.json().user_details.name);
        this.navCtrl.push(HomePage);
        console.log("Result-> "+JSON.stringify(data_to_use));
      },error2 => {
        //        loadingPopup.dismiss();
        console.log("error->" + error2);
      });
      this.globalVar.setMyGlobalVar(token);
    });

  }
}


