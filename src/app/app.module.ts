import { Firebase } from '../providers/firebase';
import { Auth } from '../providers/auth';

import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyDRVqFKUxPYrLSHdc0kFYYEV8WxP9GVuKs",
  authDomain: "catalog-6588b.firebaseapp.com",
  databaseURL: "https://catalog-6588b.firebaseio.com",
  storageBucket: "catalog-6588b.appspot.com",
  messagingSenderId: "728959235914"
};

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    LoginPage,
    ListPage,

    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    ListPage,

    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    Firebase,
    Auth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
