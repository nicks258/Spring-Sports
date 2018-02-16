import {Component, ViewChild} from '@angular/core';
import {AlertController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {FCM} from "@ionic-native/fcm";
import {LoginPage} from "../pages/login/login";
import {GlobalvarsProvider} from "../providers/globalvars/globalvars";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public alertCtrl:AlertController,public push: Push,private fcm: FCM,public globalVar:GlobalvarsProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.fcm.onNotification().subscribe(data => {
        alert(JSON.stringify(data));
        if(data.wasTapped) {
          console.info("Received in background");
        } else {
          console.info("Received in foreground");
        }
      });
      // native.getItem("user_details").then(data=>{
      //   this.nav.setRoot(HomePage,{},{animate: true, animation:'transition',duration:300,direction: 'forward'})
      // }).catch(error=>{
      //   this.nav.setRoot(LoginPage,{},{animate: true, animation:'transition',duration:300,direction: 'forward'})
      // })
      // this.fcm.onTokenRefresh().subscribe(token => {
      //   console.log("Token->" + token);
      //   globalVar.setMyGlobalVar(token);
      //   // backend.registerToken(token);
      // });
      // fcm.getToken().then(token => {
      //   console.log(token);
      // });
      // fcm.onTokenRefresh().subscribe(token => {
      //   console.log(token);
      // });
      // fcm.onNotification().subscribe(data => {
      //   alert(data);
      //   if (data.wasTapped) {
      //     console.log("Received in background");
      //   } else {
      //     console.log("Received in foreground");
      //   }
      // });

      // FirebasePlugin.onNotificationOpen(notification => {
      //   // check notification contents and react accordingly
      //   console.log(JSON.stringify(notification));
      // }, function(error) {
      //   console.error(`Error: ${error}`);
      // });
      // this.pushsetup();
    });
  }
  pushsetup() {
    const options: PushOptions = {
      android: {
        senderID: '361674276690'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        console.log("PushNotification->"+notification);
        let youralert = this.alertCtrl.create({
          title: 'New Push notification',
          message: notification.message
        });
        youralert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      //do whatever you want with the registration ID
    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
}

