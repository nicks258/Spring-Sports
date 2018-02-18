import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {FCM} from "@ionic-native/fcm";
import { SamplePage } from '../pages/sample/sample';

import {Push} from "@ionic-native/push";
import {LoginPage} from "../pages/login/login";
import { GlobalvarsProvider } from '../providers/globalvars/globalvars';
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import { DatabaseProvider } from '../providers/database/database';
import {SQLite} from "@ionic-native/sqlite";
import {IonicStorageModule} from "@ionic/storage";
import {NativeStorage} from "@ionic-native/native-storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SamplePage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    // IonicModule.forRoot(MyApp,{scrollAssist:false,
    //   autoFocusAssist:false}),
    IonicModule.forRoot(MyApp,{scrollAssist:false,
      autoFocusAssist:false}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SamplePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    FCM,
    HttpClientModule,
    Push,
    StatusBar,
    HttpModule,
    SQLite,
    NativeStorage,
    SplashScreen,
    SQLitePorter,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalvarsProvider,
    DatabaseProvider
  ]
})
export class AppModule {}
