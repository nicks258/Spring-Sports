import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FCM} from "@ionic-native/fcm";
import {Firebase} from "@ionic-native/firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    // fcm.onNotification(function(data){
    //   if(data.wasTapped){
    //     //Notification was received on device tray and tapped by the user.
    //     alert( JSON.stringify(data) );
    //   }else{
    //     //Notification was received in foreground. Maybe the user needs to be notified.
    //     alert( JSON.stringify(data) );
    //   }
    // });

    // fcm.onNotification().subscribe(data=>{
    //   console.log("re->"+data);
    // })
  }

}
