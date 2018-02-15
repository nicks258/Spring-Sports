import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {FCM} from "@ionic-native/fcm";
import {Firebase} from "@ionic-native/firebase";
import {Push} from "@ionic-native/push";
import {LoginPage} from "../pages/login/login";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    // IonicModule.forRoot(MyApp,{scrollAssist:false,
    //   autoFocusAssist:false}),
    IonicModule.forRoot(MyApp,{scrollAssist:false,
      autoFocusAssist:false}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    FCM,
    Push,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
