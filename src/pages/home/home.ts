import { Component } from '@angular/core';
import {LoadingController, NavController, Platform} from 'ionic-angular';
import {FCM} from "@ionic-native/fcm";
import {Firebase} from "@ionic-native/firebase";
import {StatusBar} from "@ionic-native/status-bar";
import {DatabaseProvider} from "../../providers/database/database";
import {Http} from "@angular/http";
import {SQLiteObject} from "@ionic-native/sqlite";
import {LoginPage} from "../login/login";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notifications_array:any;
  developer = {};
  nameServer;
  database: SQLiteObject;
  emailServer;
  passwordServer;
  deviceId;
  loadingPopup;
  constructor(public http:Http,public navCtrl: NavController,public statusBar:StatusBar,public platform:Platform,public loadingCtrl:LoadingController,public databaseprovider:DatabaseProvider) {
    this.statusBar.hide();
   this.loadDeveloperData();
   this.loadingPopup = this.loadingCtrl.create({
      content: "Fetching Notification ...",
      spinner: 'circles'
    });

  }
  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.statusBar.hide();
    });
  }

  loadDeveloperData() {
    console.log("Loading Home Page");
    this.databaseprovider.getAllDevelopers().then(data => {
      let developers = [];
      developers = data;
      // console.log(data);
      let env = this;
      // developers.forEach();
      let responce = functionToIterate();
      function  functionToIterate(){
        for(let dev of developers)
        {
          env.nameServer = dev.name;
          env.emailServer = dev.email;
          env.passwordServer = dev.password;
          env.deviceId = dev.deviceid;
          env.fetchDashboard(dev.email,dev.password);
          console.log("DATA->>"+dev.name + "->" + dev.email + "->" + dev.password + "->" + dev.deviceid);
        }
      }
    })
  }
  fetchDashboard(email,password){

    let body = new FormData();
    body.append('username', email);
    body.append('password',password);
    let headers = new Headers();
    let options = { headers: headers };
    this.http.post('http://booking.springsportsacademy.com/rest_api/get_notifications/', body ).subscribe(data => {
      // console.log(JSON.stringify(data));
      // alert(JSON.stringify(data));
      // loadingPopup.dismiss();
      // console.log("Sent Body->" + JSON.stringify(body));
      let data_to_use = data.json();
      this.notifications_array =  (data_to_use.notifications);
      console.log(JSON.stringify(data_to_use.notifications));
      // this.nameFromServer = data.json().user_details.name;
      // themail = data_to_use.user_details.email;
      // let password = this.password;
      // this.addDeveloper(this.nameFromServer,this.email,this.password);
      // console.log("Result-> "+JSON.stringify(data_to_use));
    },error2 => {
      //        loadingPopup.dismiss();
      console.log("error->" + error2);
    });
  }
  logout(){
    this.loadingPopup = this.loadingCtrl.create({
      content: "Logging out ...",
      spinner: 'circles'
    });
    this.databaseprovider.logout().then(data=>{
      this.loadingPopup.present();

      let body = new FormData();
      body.append('username', this.emailServer);
      body.append('password',this.passwordServer);
      body.append('device_id',this.deviceId);
      let headers = new Headers();
      let options = { headers: headers };
      this.http.post('http://booking.springsportsacademy.com/rest_api/logout/', body ).subscribe(data => {
        alert("Logout Successfully");
        let data_to_use = JSON.stringify(data.json());

        console.log(data_to_use);
        this.loadingPopup.dismiss();
        this.navCtrl.setRoot(LoginPage,{},{animate: true, animation:'transition',duration:300, direction: 'forward'});
      },error2 => {
        //        loadingPopup.dismiss();
        console.log("error->" + error2);
      });

    }).catch(error=>{
      alert(error);
    })
  }
}
