import { Component } from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {FCM} from "@ionic-native/fcm";
import {LoginPage} from "../pages/login/login";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public alertCtrl:AlertController,public push: Push,private fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        // backend.registerToken(token);
      });
      this.fcm.onNotification().subscribe(data => {
        alert(JSON.stringify(data));
        if(data.wasTapped) {
          console.info("Received in background");
        } else {
          console.info("Received in foreground");
        };
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        // backend.registerToken(token);
      });
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
      this.pushsetup();
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

